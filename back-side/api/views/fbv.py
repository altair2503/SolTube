from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer
from django.contrib.auth.models import User


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_details(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user, fields=('username', 'first_name', 'last_name', 'avatar'))
        return Response(serializer.data)
    if request.method == 'PUT':
        user = User.objects.get(id=request.user.id)
        if 'username' not in request.data:
            request.data['username'] = user.username
        if 'password' not in request.data:
            request.data['password'] = user.password
        else:
            request.data['password'] = make_password(request.data['password'])
        print(request.data)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(data={"Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response({"Deleted": True}, status=status.HTTP_200_OK)





