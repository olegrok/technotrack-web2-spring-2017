from rest_framework import serializers, viewsets, permissions
from .models import Event, Achieve
from application.api import router
from django.db.models import Q
from core.models import User
from core.api import UserSerializer
from friendship.models import Friendship


class ReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff


class EventSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Event
        fields = ('author', 'created', 'title',)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = super(EventViewSet, self).get_queryset()
        if self.request.query_params.get('username', None):
            username = self.request.query_params.get('username')
            friends = User.objects.all().filter(friends__author__username=username)
            q = q.filter(Q(author__username=username) | Q(author__in=friends))
            print q
        return q


class AchieveSerializer(viewsets.ModelViewSet):
    class Meta:
        model = Achieve
        fields = ('title', )


router.register('events', EventViewSet)
