from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Visitor, Room, Booking, EmergencyStatus


class VisitorAdminForm(forms.ModelForm):
    class Meta:
        model = Visitor
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # У випадаючому списку при створенні показуємо лише вільні кімнати
        if not self.instance.pk:
            all_rooms = Room.objects.all()
            free_rooms_ids = [r.id for r in all_rooms if not r.is_currently_occupied]
            self.fields['room'].queryset = Room.objects.filter(id__in=free_rooms_ids)


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    form = VisitorAdminForm
    list_display = ('full_name', 'room', 'entry_time', 'exit_time')
    list_editable = ('exit_time', 'room')


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('number', 'display_status')

    def display_status(self, obj):
        return obj.is_currently_occupied

    display_status.boolean = True
    display_status.short_description = "Зайнята зараз"


admin.site.register(User, UserAdmin)
admin.site.register(Booking)
admin.site.register(EmergencyStatus)