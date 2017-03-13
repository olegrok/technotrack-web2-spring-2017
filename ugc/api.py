from rest_framework import serializers, viewsets, permissions
from .models import Post
from application.api import router
from .permissions import IsOwnerOrReadOnly
from core.api import UserSerializer
from django.utils import timezone


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ('pk', 'content', 'author', 'created',)
        depth = 3


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
