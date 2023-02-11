from django.contrib.auth.models import User
from .serializers import PlaceSerializer
from .models import Place
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

class PlaceList(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer