from django.db import models

class Place(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    
    PLACE_TYPE_CHOICES = [
        ('MOUNTAIN', 'MOUNTAIN'),
    ]
    place_type = models.CharField(max_length=9, choices=PLACE_TYPE_CHOICES)
    
    image_url = models.URLField(max_length=255)
    source_url = models.URLField(max_length=255)
    lon = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    lat = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
