from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import WatchItem
from .serializers import WatchItemSerializer

class WatchItemList(APIView):
    def get(self, request):
        items = WatchItem.objects.all()
        serializer = WatchItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WatchItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WatchItemUpdate(APIView):
    def patch(self, request, pk):
        try:
            item = WatchItem.objects.get(pk=pk)
        except WatchItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = WatchItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
