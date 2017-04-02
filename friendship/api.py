from rest_framework import serializers, viewsets, permissions
from .models import FriendshipRequest, Friendship
from application.api import router
from django.db.models import Q
from core.api import UserSerializer


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = ('initiator', 'recipient', 'approved',)


class FriendshipRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendshipRequest.objects.all()
    serializer_class = FriendshipRequestSerializer
    # permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        print self.request
        serializer.save(initiator=self.request.user, approved=False)

    def get_queryset(self):
        q = super(FriendshipRequestViewSet, self).get_queryset()
        if self.request.query_params.get('username', None):
            username = self.request.query_params.get('username')
            q = q.filter(Q(initiator__username=username) | Q(recipient__username=username))
        return q


class FriendshipSerializer(serializers.ModelSerializer):
    friend = UserSerializer()

    class Meta:
        model = Friendship
        fields = ['friend', ]


class FriendshipViewSet(viewsets.ModelViewSet):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        q = self.queryset
        username = self.request.query_params.get('username')
        pk = None
        if 'pk' in self.kwargs:
            pk = self.kwargs['pk']
            q = q.filter(pk=pk)
        elif username:
            q = q.filter(username=username)
        else:
            q = q.filter(author=self.request.user)

        return q


router.register('friendshiprequests', FriendshipRequestViewSet)
router.register('friendship', FriendshipViewSet)