from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import States
from Medassistapp.models import City
from Medassistapp.serializers import StateSerializer
from Medassistapp.serializers import CitySerializer


from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def State_List(request):
 if request.method=='GET':
    statelist=States.objects.all()

    state_serializer = StateSerializer(statelist,many=True)
    return JsonResponse(state_serializer.data,safe=False)
 return JsonResponse({},safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def City_List(request):
 if request.method=='POST':
    id=request.data['id']
    citylist=City.objects.all().filter(states_id=id)
   
    city_serializer = CitySerializer(citylist,many=True)
    return JsonResponse(city_serializer.data,safe=False)
 return JsonResponse({},safe=False)
     
