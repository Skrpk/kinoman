from django.contrib import admin
from .models import Director, Film, Genre

# Register your models here.

admin.site.register(Director)
admin.site.register(Film)
admin.site.register(Genre)
