from django.db import models

# Create your models here.

class Rating(models.Model):
    user_id = models.CharField(max_length=16)
    movie_id = models.CharField(max_length=8)
    rating = models.DecimalField(decimal_places=2, max_digits=4)
    type = models.CharField(max_length=8, default='explicit')

    def __str__(self):
        return "user_id: {}, movie_id: {}, rating: {}, type: {}"\
            .format(self.user_id, self.movie_id, self.rating, self.type)
