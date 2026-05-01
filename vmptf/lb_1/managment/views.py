from django.shortcuts import render
# Імпорт із бібліотеки REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Visitor

# Рівень 4: Використання бібліотеки для API [cite: 111, 138]
class EmergencyAlertAPI(APIView):
    def get(self, request):
        # Дані, які бібліотека автоматично перетворить на JSON [cite: 49, 111]
        alert_data = {
            "status": "danger",
            "message": "Ракетна небезпека! Прямуйте в укриття.",
            "source": "API Оповіщення"
        }
        return Response(alert_data)

def visitor_list_view(request):
    visitors = Visitor.objects.all()
    return render(request, 'management/visitor_list.html', {'visitors': visitors})