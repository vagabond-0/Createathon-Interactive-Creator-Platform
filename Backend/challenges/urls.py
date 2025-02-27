
from django.contrib import admin
from django.urls import path,include
from .views import CreateChallengeView
urlpatterns = [
   path('create_challenge/',CreateChallengeView.as_view(),name="create challenge")
]
