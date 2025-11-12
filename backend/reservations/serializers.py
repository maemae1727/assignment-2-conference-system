from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    room_name = serializers.ReadOnlyField(source='room.name')


    class Meta:
        model = Reservation
        fields = ['id', 'room', 'room_name', 'user', 'start_datetime', 'end_datetime', 'purpose', 'created_at']
        read_only_fields = ['user', 'created_at']


    def validate(self, data):
        start = data.get('start_datetime')
        end = data.get('end_datetime')
        room = data.get('room')
        if start >= end:
            raise serializers.ValidationError('End time must be after start time.')
        # Overlap rule: (start < existing_end) and (end > existing_start)
        qs = Reservation.objects.filter(room=room, start_datetime__lt=end, end_datetime__gt=start)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError('This room is already reserved for the selected time range.')
        return data