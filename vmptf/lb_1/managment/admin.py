from django.contrib import admin
from .models import Visitor, Room, Booking

admin.site.register(Visitor)
admin.site.register(Room)
admin.site.register(Booking)