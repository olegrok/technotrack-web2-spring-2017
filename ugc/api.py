from rest_framework import serializers, viewsets, permissions
from .models import Post
from application.api import router
from .permissions import IsOwnerOrReadOnly
from core.api import UserSerializer
from django.utils import timezone
from like.api import LikeSerializer
from django.db.models.aggregates import Count


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = ('pk', 'content', 'author', 'created', 'likes', 'likes_count')
        depth = 1


class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, created=timezone.now())

    def get_queryset(self):
        q = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            print self.request.query_params.get('username')
            q = q.filter(author__username=self.request.query_params.get('username'))
        return q


router.register('posts', PostViewSet)
