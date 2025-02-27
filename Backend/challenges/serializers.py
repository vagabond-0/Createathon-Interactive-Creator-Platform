from rest_framework import serializers
from .models import Challenge


class ChallengeSerializer(serializers.ModelSerializer):
    post_by = serializers.CharField(source='post_by.username')
    class Meta:
        model = Challenge
        fields = ['id', 'title', 'description', 'difficulty', 'points', 'category', 'post_by', 'created_at']
