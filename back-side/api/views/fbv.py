import datetime

from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer, VideoSerializerModel, VideoSerializer
from django.contrib.auth.models import User
from api.models import Video


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


@api_view(['GET', 'POST'])
def video_list(request):
    if request.method == 'GET':
        videos = Video.objects.all()
        serializer = VideoSerializerModel(videos, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        request.data['owner_id'] = request.user.id
        request.data['upload_time'] = datetime.datetime.now()
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def video_details(request, video_id):
    video = Video.objects.get(pk=video_id)
    if request.method == 'GET':
        video.total_views += 1
        video.save()
        serializer = VideoSerializerModel(video)
        return Response(serializer.data)
    if request.method == 'DELETE':
        if video.owner_id == request.user.id:
            video.delete()
            return Response({"Deleted": True}, status=status.HTTP_200_OK)
        return Response({"Message": "You don't have permission to delete"}, status=status.HTTP_403_FORBIDDEN)


