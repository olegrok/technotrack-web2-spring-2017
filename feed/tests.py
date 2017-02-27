from django.test import TestCase
from core.models import User
from friendship.models import FriendshipRequest, Friendship
from feed.models import Event


class TestEvent(TestCase):

    def setUp(self):
        self.User1 = User.objects.create(username='User1', password='dsghfjhdsgfjadsgfjdasgfjdas')
        self.User2 = User.objects.create(username='User2', password='sghdfhsgdfjagjdgfsahgfajsgf')

    def testFriendShip(self):
        self.friendshipRequest = FriendshipRequest.objects.create(initiator=self.User1, recipient=self.User2)
        self.friendshipRequest.save()
        self.friendshipRequest.approved = True
        self.friendshipRequest.save()
        self.friendships = Friendship.objects.all()
        self.assertEqual(self.friendships[0].event.exists(), True)
        self.assertEqual(self.friendships[1].event.exists(), True)
        self.assertEqual(self.friendships[0].event.get(), Event.objects.first())

    def tearDown(self):
        pass