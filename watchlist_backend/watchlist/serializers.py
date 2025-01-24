from rest_framework import serializers
from .models import WatchItem

class WatchItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchItem
        fields = '__all__'
