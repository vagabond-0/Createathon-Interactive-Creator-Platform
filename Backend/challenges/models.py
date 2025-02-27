from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Challenge(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=20,
        choices=[('beginner', 'Beginner'),
                ('intermediate', 'Intermediate'),
                ('advanced', 'Advanced')]
    )
    points = models.IntegerField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    post_by = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def validate_submission(self, submission):
        pass

class Category(models.Model):
    name = models.CharField(max_length=200)

    