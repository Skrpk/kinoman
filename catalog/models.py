from django.db import models
from django.urls import reverse #Used to generate URLs by reversing the URL patterns

# Create your models here.

class Genre(models.Model):
    """
    Model representing a film genre (e.g. Science Fiction, Non Fiction).
    """
    name = models.CharField(max_length=200, help_text="Enter a film genre (e.g. Science Fiction, Drama etc.)")
    
    def __str__(self):
        """
        String for representing the Model object (in Admin site etc.)
        """
        return self.name

class Film(models.Model):
    """
    Model representing a film.
    """
    title = models.CharField(max_length=200)
    movie_id = models.CharField(max_length=8, unique=True, primary_key=True)
    director = models.ForeignKey('Director', on_delete=models.SET_NULL, null=True)
    # Foreign Key used because film can only have one director, but directors can have multiple films
    # Director as a string rather than object because it hasn't been declared yet in the file.
    summary = models.TextField(max_length=1000, help_text='Enter a brief description of the film')
    genres = models.ManyToManyField(Genre, help_text='Select a genre for this film')
    # ManyToManyField used because genre can contain many films. Films can cover many genres.
    # Genre class has already been defined so we can specify the object above.
    
    def __str__(self):
        """
        String for representing the Model object.
        """
        return self.title
    
    
    def get_absolute_url(self):
        """
        Returns the url to access a detail record for this book.
        """
        return reverse('book-detail', args=[str(self.movie_id)])

class Director(models.Model):
    """
    Model representing an director.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_death = models.DateField('Died', null=True, blank=True)

    class Meta:
        ordering = ["last_name","first_name"]
    
    def get_absolute_url(self):
        """
        Returns the url to access a particular director instance.
        """
        return reverse('director-detail', args=[str(self.id)])
    

    def __str__(self):
        """
        String for representing the Model object.
        """
        return '{0}, {1}'.format(self.last_name,self.first_name)