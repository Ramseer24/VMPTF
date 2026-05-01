from django.shortcuts import render
from django.http import JsonResponse
from .models import Visitor, EmergencyStatus, Room

# Рівень 1: Список відвідувачів
def visitor_list(request):
    visitors = Visitor.objects.all().order_by('-entry_time')
    return render(request, 'managment/visitor_list.html', {
        'visitors': visitors,
    })

# Рівень 4: API Оповіщення
def emergency_alert(request):
    latest = EmergencyStatus.objects.filter(is_active=True).last()

    if latest:
        data = {
            "status": latest.status_text,
            "is_active": True,
            "timestamp": latest.updated_at.strftime('%H:%M:%S (%d.%m.%Y)')
        }
    else:
        data = {
            "status": "Небезпеки немає",
            "is_active": False,
            "timestamp": ""
        }
    return JsonResponse(data)