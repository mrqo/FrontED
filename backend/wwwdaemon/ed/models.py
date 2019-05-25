from django.db import models
from django.contrib.auth.models import AbstractUser


class Project(models.Model):
    name = models.CharField(max_length=128, null=False)
    source = models.TextField(null=False)

    owner = models.ForeignKey('ed.User', on_delete=models.CASCADE,
                              related_name="projects", null=False)


class User(AbstractUser):
    pass
