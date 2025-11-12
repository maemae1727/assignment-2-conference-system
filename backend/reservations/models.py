from django.db import models
from django.contrib.auth.models import User
from rooms.models import Room


class Reservation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reservations')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservations')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    purpose = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['start_datetime']


    def __str__(self):
        return f"{self.room.name} @ {self.start_datetime} by {self.user.username}"