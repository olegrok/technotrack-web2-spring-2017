from django.test import TestCase
from core.models import User
from friendship.models import FriendshipRequest, Friendship
from feed.models import Event
from ugc.models import Post
from like.models import Like


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
        self.friendshipRequest.delete()
        self.assertEqual(Event.objects.all().count(), 0)

    def testPostCreate(self):
        self.userPost = Post.objects.create(author=self.User1, content='aadsjhfadsjfhas')
        self.assertEqual(self.userPost.event.exists(), True)
        self.userPost.delete()
        self.assertEqual(Event.objects.all().count(), 0)

    def testLikesAchieveEvent(self):
        self.userPost = Post.objects.create(author=self.User1, content='aadsjhfadsjfhas')
        Like.objects.create(content_object=self.userPost, author=self.User1)
        self.assertEqual(Event.objects.all().count(), 1)
        Like.objects.create(content_object=self.userPost, author=self.User2)
        self.assertEqual(Event.objects.all().count(), 2)
        Like.objects.first().delete()
        self.assertEqual(Event.objects.all().count(), 1)

    def tearDown(self):
        self.User1.delete()
        self.User2.delete()