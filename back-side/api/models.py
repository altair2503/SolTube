from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.id} - {self.name}'

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = "Categories"


class Video(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    video_url = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500)
    total_views = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.owner} - {self.name}'

