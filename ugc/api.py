from rest_framework import serializers, viewsets, permissions
from .models import Post
from application.api import router
from .permissions import IsOwnerOrReadOnly
from core.api import UserSerializer
from django.utils import timezone
from like.api import LikeSerializer
from friendship.models import Friendship
from django.db.models.aggregates import Count
from django.db.models import Q


class PostSerializer(serializers.HyperlinkedModelSerializer):
    # likes = LikeSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    created = serializers.DateTimeField(read_only=True, format='%X %d %b %Y')
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ('id', 'content', 'author', 'created', 'likes_count')


class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, created=timezone.now())

    def get_queryset(self):
        q = self.queryset
        author = self.request.query_params.get('author')
        if 'pk' in self.kwargs:
            pk = self.kwargs['pk']
            return q.filter((Q(author__friendship__friend=self.request.user) | Q(author=self.request.user)) & Q(pk=pk))\
                .distinct()

        if author and not author.isnumeric():
            return Post.objects.none()

        if author and int(author) != self.request.user.pk:
            q = q.filter(Q(author__friendship__friend=self.request.user) & Q(author__pk=author))
        else:
            q = q.filter(author=self.request.user)
        return q


router.register('posts', PostViewSet)
