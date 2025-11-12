from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Reservation
from .serializers import ReservationSerializer


class IsOwnerOrStaff(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.user == request.user


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.select_related('room', 'user')
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return self.queryset
        return self.queryset.filter(user=self.request.user)


    def perform_create(self, serializer):
        # Staff can create for others via `user` field; normal users create for themselves
        if self.request.user.is_staff and 'user' in self.request.data:
            user_id = self.request.data.get('user')
            try:
                u = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                u = self.request.user
            serializer.save(user=u)
        else:
            serializer.save(user=self.request.user)


    @action(detail=False, methods=['get'], url_path='mine')
    def mine(self, request):
        qs = self.get_queryset().filter(user=request.user)
        ser = self.get_serializer(qs, many=True)
        return Response(ser.data)
