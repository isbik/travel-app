from .views import PlaceList
from django.urls import include, path


urlpatterns = [
  path('', PlaceList.as_view())
]