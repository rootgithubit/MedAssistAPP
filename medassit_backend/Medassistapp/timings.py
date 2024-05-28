from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import Timings
from Medassistapp.serializers import TimingsSerializer
from Medassistapp.serializers import TimingsGetSerializer

from rest_framework.decorators import api_view

@api_view(['GET','POST','DELETE'])
def Submit_Timing(request):
    try:
        if request.method == 'POST':
            timing_serializer=TimingsSerializer(data=request.data)
            print(request.data)
            
            if(timing_serializer.is_valid()):

                timing_serializer.save()
                return JsonResponse({"message":'Timing Submitted Successfully',"status":True},)
            else:
                return JsonResponse({"message":'Fail to Submit Timing',"status":False},)
    except Exception as e:
        print('Error:',e)
        return JsonResponse({"message":'Fail to Submit Timing',"status":False},)
    

@api_view(['GET','POST','DELETE'])
def Timing_List(request):
    if request.method== 'GET':
        timinglist=Timings.objects.all()
        timing_serializer=TimingsGetSerializer(timinglist,many=True)
        return JsonResponse(timing_serializer.data,safe=False)
    return JsonResponse({},safe=False)

@api_view(['DELETE','POST','GET'])
def EditTimings(request):
    try:
        if(request.method=='POST'):
            timings=Timings.objects.get(pk=request.data['id'])
            timings.starttimings=request.data['starttimings']
            timings.endtimings=request.data['endtimings']
            timings.days=request.data['days']
            timings.status=request.data['status']
            timings.save()
            return JsonResponse({'message':'Doctor Timings Edit Successfully','status':True},safe=False)
    except Exception as error:
        print('XXXXXXXXXXXXXXXXXXXXXXX',error)
        return JsonResponse({'message':'Fail to Edit Doctor Timings','status':False},safe=False)
@api_view(['DELETE','POST','GET'])
def DeleteTimings(request):
    try:
        if(request.method=='POST'):
            timings=Timings.objects.get(pk=request.data['id'])
            timings.delete()
            return JsonResponse({'message':'Doctor Session Delete Successfully','status':True},safe=False)
    except Exception as error:
        print('xxxxxxxxxx',error)
        JsonResponse({'message':'Doctor Timings not Deleted','status':False},safe=False)