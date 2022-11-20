from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    # department = models.CharField(max_length=5)
    # university = models.CharField(max_length=100)
    # reg_no = models.CharField(max_length=10, blank=True, null=True)
    prefer_genre = models.CharField(max_length=250, blank=True, null=True)
