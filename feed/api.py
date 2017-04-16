from rest_framework import serializers, viewsets, permissions, fields
from .models import Event, Achieve
from application.api import router
from django.db.models import Q
from core.models import User
from core.api import UserSerializer
from friendship.models import Friendship
from generic_relations.relations import GenericRelatedField
from django.contrib.contenttypes.models import ContentTypeManager

from friendship.api import FriendshipSerializer
from ugc.models import Post
from ugc.api import PostSerializer


class ReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff


class AchieveSerializer(serializers.ModelSerializer):
    content = fields.SerializerMethodField('__null__')

    class Meta:
        model = Achieve
        fields = ('title', 'content')

    def __null__(self, obj):
        return None


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
        Achieve: AchieveSerializer(read_only=True, allow_null=True),
        Friendship: FriendshipSerializer(read_only=True, allow_null=True),
        Post: PostSerializer(read_only=True),
    })
    # content_type = fields.CharField(read_only=True)
    content_type = fields.SerializerMethodField('get_event_type')

    created = serializers.DateTimeField(read_only=True, format='%X %d %b %Y')
    author = UserSerializer()

    class Meta:
        model = Event
        fields = ('id', 'author', 'created', 'title', 'content_object', 'content_type')
        # exclude = ('content_object',)
        depth = 0

    def get_event_type(self, obj):
        # print(ContentTypeManager().get_for_model(obj), dir(ContentTypeManager().get_for_model(obj)))
        content_object_name = str(type(obj.content_object)).replace('\'>','').split('.')
        return content_object_name[len(content_object_name) - 1]


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, ReadOnly)

    def get_queryset(self):
        q = self.queryset
        q = q.filter(Q(author=self.request.user) | Q(author__friendship__friend=self.request.user))\
            .distinct().order_by('-created')
        return q.prefetch_related('author', 'content_object')

    # def create(self, request, *args, **kwargs):
    #     pass


router.register('events', EventViewSet)
router.register('achieve', AchieveViewSet)
