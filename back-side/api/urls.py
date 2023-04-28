from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from api.views import *

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('register/', register_user),
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:category_id>', CategoryDetailsAPIView.as_view()),
]
