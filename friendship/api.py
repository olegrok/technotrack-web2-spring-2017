from rest_framework import serializers, viewsets, permissions, fields
from .models import FriendshipRequest, Friendship
from application.api import router
from django.db.models import Q
from core.api import UserSerializer


class FriendshipRequestSerializer(serializers.ModelSerializer):
    initiator = UserSerializer(read_only=True)
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
        print self.request
        serializer.save(initiator=self.request.user, approved=False)

    def get_queryset(self):
        q = self.queryset
        user = self.request.user
        status = self.request.query_params.get('status')
        if status == 'requested':
            q = q.filter(recipient=user, approved=False)
        elif status == 'waiting':
            q = q.filter(initiator=user, approved=False)
        else:
            q = q.filter(Q(initiator=user) | Q(recipient=user))




        # if 'waitings' in self.kwargs:

        # if self.request.query_params.get('username', None):
        #     username = self.request.query_params.get('username')
        #     q = q.filter(Q(initiator__username=username) | Q(recipient__username=username))
        return q


class FriendshipSerializer(serializers.ModelSerializer):
    friend = UserSerializer()
    content = fields.SerializerMethodField('__null__')

    class Meta:
        model = Friendship
        fields = ['friend', 'content']

    def __null__(self, obj):
        return None


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