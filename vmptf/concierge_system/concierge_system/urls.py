from django.contrib import admin
from django.urls import path
from managment.views import visitor_list, emergency_alert

urlpatterns = [
    path('admin/', admin.site.urls),
    path('visitors/', visitor_list, name='visitor_list'),
    path('api/emergency/', emergency_alert, name='emergency_api'), # API Рівень 4
]