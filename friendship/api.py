from rest_framework import serializers, viewsets, permissions
from .models import FriendshipRequest, Friendship
from application.api import router
from django.db.models import Q
from core.api import UserSerializer


class FriendshipRequestSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    recipient = UserSerializer()

    class Meta:
        model = FriendshipRequest
        fields = ('initiator', 'recipient', 'approved',)


class FriendshipRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendshipRequest.objects.all()
    serializer_class = FriendshipRequestSerializer
    # permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, approved=False)

    def get_queryset(self):
        q = super(FriendshipRequestViewSet, self).get_queryset()
        if self.request.query_params.get('username', None):
            username = self.request.query_params.get('username')
            q = q.filter(Q(initiator__username=username) | Q(recipient__username=username))
        return q


class FriendshipSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    friend = UserSerializer()

    class Meta:
        model = Friendship
        fields = ['author', 'friend', 'created']
        depth = 2


class FriendshipViewSet(viewsets.ModelViewSet):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def perform_create(self, serializer):
    #     serializer.save()

    def get_queryset(self):
        q = super(FriendshipViewSet, self).get_queryset()
        print(self.request.query_params.get('username'))
        if self.request.query_params.get('username'):
            username = self.request.query_params.query_params.get('username')
            q = q.filter(author__username=username)
        return q


router.register('friendshiprequests', FriendshipRequestViewSet)
router.register('friendship', FriendshipViewSet)