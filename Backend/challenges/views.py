from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Challenge
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Category
import datetime
from rest_framework.generics import ListAPIView
from .serializers import ChallengeSerializer

class CreateChallengeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]    

    def post(self,request):
        user = request.user
        title = request.data.get("title")
        description = request.data.get("description")
        difficulty = request.data.get("difficulty")
        points = request.data.get("points")
        category_id = request.data.get("category_id")

        if not all([title, description, difficulty, points, category_id]):
            return JsonResponse({"error": "Missing required fields"}, status=400)
        
        try:
            category = Category.objects.get(id=category_id)
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

class CreateChallengeListView(ListAPIView):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


class CreateIndividualView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self,request, *args, **kwargs):
        challenge_id = request.query_params.get('id')

        if not challenge_id :
            return JsonResponse({"error": "Not id present"}, status=400)
        
        try:
            challenge = Challenge.objects.get(id = challenge_id)
            serializer = ChallengeSerializer(challenge)
            return JsonResponse({
                "message": "Challenge details retrieved successfully",
                "data": serializer.data
            }, status=200)
        except  Challenge.DoesNotExist:
            return JsonResponse({"error": "Challenge not found"}, status=status.HTTP_404_NOT_FOUND)
    