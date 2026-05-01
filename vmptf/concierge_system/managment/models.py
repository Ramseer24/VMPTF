from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db.models.signals import post_delete
from django.dispatch import receiver

class User(AbstractUser):
    is_concierge = models.BooleanField(default=True)

class Room(models.Model):
    number = models.CharField(max_length=10, unique=True, verbose_name="Номер приміщення")
    is_occupied = models.BooleanField(default=False, verbose_name="Технічний статус")

    @property
    def is_currently_occupied(self):
        now = timezone.now()
        active_visitor = self.visitor_set.filter(
            models.Q(exit_time__isnull=True) | models.Q(exit_time__gt=now)
        ).exists()
        active_booking = self.booking_set.filter(
            check_in__lte=now, check_out__gte=now
        ).exists()
        return active_visitor or active_booking

    def update_status(self):
        self.is_occupied = self.is_currently_occupied
        self.save(update_fields=['is_occupied'])

    def __str__(self):
        status = "Зайнята" if self.is_currently_occupied else "Вільна"
        return f"{self.number} ({status})"

class Visitor(models.Model):
    full_name = models.CharField(max_length=255, verbose_name="ПІБ")
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Кімната")
    entry_time = models.DateTimeField(auto_now_add=True, verbose_name="Час заходу")
    exit_time = models.DateTimeField(null=True, blank=True, verbose_name="Час виходу")

    def clean(self):
        if self.room and self.room.is_currently_occupied and not self.pk:
            # Дозволяємо збереження, якщо це той самий візитор оновлює дані
            raise ValidationError(f"Кімната {self.room.number} вже зайнята!")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        if self.room:
            self.room.update_status()

    def __str__(self):
        return self.full_name

class Booking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name="Кімната")
    guest_name = models.CharField(max_length=255, verbose_name="Ім'я гостя")
    check_in = models.DateTimeField(verbose_name="Заїзд")
    check_out = models.DateTimeField(verbose_name="Виїзд")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.room.update_status()
        now = timezone.now()
        if self.check_in <= now <= self.check_out:
            Visitor.objects.get_or_create(
                full_name=self.guest_name,
                room=self.room,
                defaults={'entry_time': self.check_in, 'exit_time': self.check_out}
            )

class EmergencyStatus(models.Model):
    status_text = models.CharField(max_length=255, verbose_name="Текст оповіщення")
    is_active = models.BooleanField(default=False, verbose_name="Активність")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Статус небезпеки"
        verbose_name_plural = "Статуси небезпеки"

    def __str__(self):
        return f"{'[АКТИВНА] ' if self.is_active else ''}{self.status_text}"

# СИГНАЛИ ДЛЯ ЗВІЛЬНЕННЯ КІМНАТИ ПРИ ВИДАЛЕННІ
@receiver(post_delete, sender=Visitor)
@receiver(post_delete, sender=Booking)
def release_room_on_delete(sender, instance, **kwargs):
    if instance.room:
        instance.room.update_status()