from django.contrib import admin
from .models import Post

# admin.site.register([Post, ])

@admin.register(Post)
class PostAdmin(admin.modelAdmin):
  pass
