from rest_framework import serializers, viewsets, permissions, fields
from .models import User
from application.api import router
# from .permissions import IsOwnerOrReadOnly


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or request.user.is_staff


class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = fields.ReadOnlyField()

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name', )
        depth = 3


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


router.register('users', UserViewSet)