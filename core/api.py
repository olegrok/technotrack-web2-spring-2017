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

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name', 'avatar')
        depth = 3

    def get_first_name_to_friend(self, obj):
        print(self.context['request'].user)
        print(self.context['request'].user.friends)
        return obj.first_name


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        q = self.queryset
        if 'pk' in self.kwargs:
            pk = self.kwargs['pk']
            return q.filter((Q(friendship__friend=self.request.user) | Q(pk=self.request.user.pk)) & Q(pk=pk)).distinct()
        username = self.request.query_params.get('username')
        if username:
            return q.filter(username=username)
        return q.filter(pk=self.request.user.pk)


router.register('users', UserViewSet)