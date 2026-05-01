from django.db import models
from django.contrib.auth.models import User

class Visitor(models.Model):
    full_name = models.CharField(max_length=255)
    entry_time = models.DateTimeField(auto_now_add=True)
    exit_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.full_name

class Room(models.Model):
    number = models.CharField(max_length=10)
    description = models.TextField()

    def __str__(self):
        return f"Кімната {self.number}"

class Booking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=255)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()

    def __str__(self):
        return f"{self.guest_name} - {self.room.number}"