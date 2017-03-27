from rest_framework import serializers, viewsets, permissions
from .models import Event, Achieve
from application.api import router
from django.db.models import Q
from core.models import User
from core.api import UserSerializer
from friendship.models import Friendship
from generic_relations.relations import GenericRelatedField

from friendship.api import FriendshipSerializer
from ugc.models import Post
from ugc.api import PostSerializer


class ReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff


class AchieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achieve
        fields = ('title', )


class AchieveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achieve.objects.all()
    serializer_class = AchieveSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = self.queryset
        if 'pk' in self.kwargs:
            pk = self.kwargs['pk']
            return q.filter((Q(author__friendship__friend=self.request.user) | Q(author=self.request.user)) & Q(pk=pk))\
                .distinct()
        username = self.request.query_params.get('username')
        if username != self.request.user.username and username is not None:
            q = q.filter(Q(author__friendship__friend=self.request.user) & Q(author__username=username))
        else:
            q = q.filter(author=self.request.user)
        return q


class EventSerializer(serializers.HyperlinkedModelSerializer):
    content_object = GenericRelatedField({
        Achieve: serializers.HyperlinkedRelatedField(view_name='achieve-detail', read_only=True),
        Friendship: serializers.HyperlinkedRelatedField(view_name='friendship-detail', read_only=True),
        Post: serializers.HyperlinkedRelatedField(read_only=True, view_name='post-detail'),
    })
    created = serializers.DateTimeField(read_only=True, format='%X %d %b %Y')

    class Meta:
        model = Event
        fields = ('author', 'created', 'title', 'content_object', 'id')
        # exclude = ('content_object',)
        depth = 0


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = self.queryset
        q = q.filter(Q(author=self.request.user) | Q(author__friendship__friend=self.request.user))\
            .distinct().order_by('-created')
        return q

    # def create(self, request, *args, **kwargs):
    #     pass


class UserEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = self.queryset.order_by('-created')
        username = self.request.query_params.get('username')
        if username and username != self.request.user.username:
            q = q.filter(Q(author__username=username) & Q(author__friendship__friend=self.request.user))
            return q
        return q.filter(author=self.request.user)

router.register('events', EventViewSet)
router.register('achieve', AchieveViewSet)
# router.register('userevents', UserEventViewSet)
