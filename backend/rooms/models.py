from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=120, blank=True)
    capacity = models.PositiveIntegerField(default=1)
    has_projector = models.BooleanField(default=False)


    def __str__(self):
        return self.name