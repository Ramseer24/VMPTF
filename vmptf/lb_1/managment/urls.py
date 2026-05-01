from django.urls import path
from .views import visitor_list_view, EmergencyAlertAPI

urlpatterns = [
    # Звичайна сторінка
    path('', visitor_list_view, name='visitor_list'),

    # Маршрут для API (використовує клас із бібліотеки) [cite: 129, 138]
    path('api/alert/', EmergencyAlertAPI.as_view(), name='api_alert'),
]