from rest_framework import serializers, viewsets, permissions, fields
from .models import User
from application.api import router
from django.db.models import Q
# from .permissions import IsOwnerOrReadOnly


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or request.user.is_staff


class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = fields.ReadOnlyField()
    first_name = fields.SerializerMethodField('get_first_name_to_friend')
    last_name = fields.SerializerMethodField('get_last_name_to_friend')

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name', 'avatar')
        depth = 3

    def get_first_name_to_friend(self, obj):
        request = self.context['request']
        if obj.friends.filter(friend__id=request.user.id).exists() or request.user.is_staff or obj == request.user:
            return obj.first_name
        return None

    def get_last_name_to_friend(self, obj):
        request = self.context['request']
        if obj.friends.filter(friend__id=request.user.id).exists() or request.user.is_staff or obj == request.user:
            return obj.first_name
        return None


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        q = self.queryset
        pk = None
        if 'pk' in self.kwargs:
            pk = self.kwargs['pk']
            q = q.filter(pk=pk)
        username = self.request.query_params.get('username')
        if username:
            q = q.filter(username=username)
        if not (pk or username):
            q = q.filter(pk=self.request.user.pk)
        return q
        #     return q.filter(username=username)
        # return q.filter(pk=self.request.user.pk)


router.register('users', UserViewSet)