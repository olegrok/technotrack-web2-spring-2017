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


class EventSerializer(serializers.HyperlinkedModelSerializer):
    content_object = serializers.HyperlinkedRelatedField(view_name='event-detail', read_only=True)

    class Meta:
        model = Event
        fields = ('author', 'created', 'title', 'content_object')


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = super(EventViewSet, self).get_queryset()
        q = q.filter(Q(author=self.request.user) | Q(author__friendship__friend=self.request.user)).distinct()
        return q

    # def create(self, request, *args, **kwargs):
    #     pass


class UserEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = super(UserEventViewSet, self).get_queryset()
        username = self.request.query_params.get('username')
        if username and username != self.request.user.username:
            q = q.filter(Q(author__username=username) & Q(author__friendship__friend=self.request.user))
            return q
        return q.filter(author=self.request.user)


class AchieveSerializer(viewsets.ModelViewSet):
    class Meta:
        model = Achieve
        fields = ('title', )


router.register('events', EventViewSet)
router.register('userevents', UserEventViewSet)
