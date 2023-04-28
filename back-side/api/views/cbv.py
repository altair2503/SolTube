from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from api.models import Category
from api.serializers import CategorySerializer


class CategoryListAPIView(APIView):
    def get(self, request):
        serializer = CategorySerializer(Category.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailsAPIView(APIView):
    def get_category(self, category_id):
        category = Category.objects.get(id=category_id)
        return category

    def get(self, request, category_id):
        try:
            category = self.get_category(category_id)
        except Category.DoesNotExist as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, category_id):
        try:
            category = self.get_category(category_id)
        except Category.DoesNotExist as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CategorySerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id):
        try:
            category = self.get_category(category_id)
        except Category.DoesNotExist as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        category.delete()
        return Response({"Deleted": True})


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})