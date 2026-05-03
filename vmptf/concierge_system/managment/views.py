from django.shortcuts import render
from django.http import JsonResponse
from .models import Visitor, EmergencyStatus, Room


def visitor_list(request):
    visitors = Visitor.objects.all().order_by('-entry_time')
    return render(request, 'managment/visitor_list.html', {
        'visitors': visitors,
    })


def emergency_alert(request):

    active_alerts = EmergencyStatus.objects.filter(is_active=True)

    alerts_data = [{
        "status": a.status_text,
        "timestamp": a.updated_at.strftime('%H:%M:%S (%d.%m.%Y)')
    } for a in active_alerts]

    return JsonResponse({
        "is_active": active_alerts.exists(),
        "alerts": alerts_data
    })