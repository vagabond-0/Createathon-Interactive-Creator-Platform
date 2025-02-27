from django.http import JsonResponse
from django.views import View
from .models import Challenge
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Category
import datetime



class CreateChallengeView(View):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]    

    def post(self,request):
        title = request.POST.get("title")
        description = request.POST.get("description")
        difficulty = request.POST.get("difficulty")
        points = request.POST.get("points")
        category_id = request.POST.get("category_id")

        if not all([title, description, difficulty, points, category_id]):
            return JsonResponse({"error": "Missing required fields"}, status=400)
        
        try:
            Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return JsonResponse({"error": "Category not found"}, status=404)
        challenge = Challenge.objects.create(
            title=title,
            description=description,
            difficulty=difficulty,
            points=int(points), 
            category=category,
            post_by=user,
            created_at = datetime.datetime
        )

        return JsonResponse({
            "message": "Challenge created successfully",
            "challenge_id": challenge.id,
            "created_by": user.username
        }, status=201)