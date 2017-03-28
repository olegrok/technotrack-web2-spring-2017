from rest_framework import serializers, viewsets, permissions, exceptions
from .models import Like
from ugc.models import Post
from application.api import router
from django.db.models import Q
from django.contrib.contenttypes.models import ContentType
from core.api import UserSerializer


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('author', 'object_id', 'content_type')


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    # permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, approved=False)

    def get_queryset(self):
        q = super(LikeViewSet, self).get_queryset()
        post_id = self.request.query_params.get('post')
        if post_id:
            q = q.filter(Q(object_id=post_id) & Q(content_type=ContentType.objects.get_for_model(Post)))
            return q


router.register('likes', LikeViewSet)
