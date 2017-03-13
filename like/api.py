from rest_framework import serializers, viewsets, permissions
from .models import Like
from application.api import router
from django.db.models import Q
from core.api import UserSerializer


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ('author',)


# class LikeViewSet(viewsets.ModelViewSet):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer
#     # permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user, approved=False)
#
#     def get_queryset(self):
#         q = super(LikeViewSet, self).get_queryset()
#         if self.request.query_params.get('username', None):
#             username = self.request.query_params.get('username')
#             q = q.filter(Q(initiator__username=username) | Q(recipient__username=username))
#         return q
#
# router.register('likes', 'likes')
