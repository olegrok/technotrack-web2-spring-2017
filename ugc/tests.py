from django.test import TestCase
from core.models import User

class TestEvent(TestCase):

    def SetUp(self):
        print(User.objects.all())

    def TestFriendShip(self):
        pass

    def tearDown(self):
        pass
