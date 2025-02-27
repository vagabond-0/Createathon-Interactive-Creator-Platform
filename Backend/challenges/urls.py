
from django.contrib import admin
from django.urls import path,include
from .views import CreateChallengeView
from .views import CreateChallengeListView,CreateIndividualView
urlpatterns = [
   path('create_challenge/',CreateChallengeView.as_view(),name="create challenge"),
   path('getallchallenge/',CreateChallengeListView.as_view(),name="get all challenge"),
   path('individualchallenge/',CreateIndividualView.as_view(),name="get individual challenge")
]
