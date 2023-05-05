from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, jwt_response_payload_handler

from api.views import *

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('authorized/', jwt_response_payload_handler),
    path('register/', user_details),
    path('user/', user_details),
    path('search/<str:username>', UserSearchAPIView.as_view()),
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:category_id>', CategoryDetailsAPIView.as_view()),
    path('videos/', video_list),
    path('videos/<int:video_id>', video_details),
    path('videos/user/<int:user_id>', user_videos)
]
