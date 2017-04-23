from core.models import User
from core.utils import send_mail_to_user

user = User.objects.all().last()
send_mail_to_user('random_mail', user)
