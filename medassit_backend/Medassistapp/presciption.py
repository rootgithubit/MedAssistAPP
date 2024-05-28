from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from Medassistapp.models import Prescription
from Medassistapp.serializers import PrescriptionSerializer
from Medassistapp.serializers import PrescriptionGetSerializer 


from rest_framework.decorators import api_view


@api_view(['GET','POST','DELETE'])
def Prescription_Submit(request):
    print("1")
    try:
        if request.method=='POST':
            print("2")
            prescription_serializer = PrescriptionSerializer(data=request.data)
            print(prescription_serializer)
            if(prescription_serializer.is_valid()):
                print(4)
                prescription_serializer.save()
                return JsonResponse({"message":'Prescription Submitted Successfully',"status":True},safe=False)
            else:
                return JsonResponse({"message":'Fail to submit Prescription',"status":False},safe=False)
    except Exception as e:
        print("Error",e)
        return JsonResponse({"message":'Failure in record submit ',"status":False},safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def Prescription_List(request):
 if request.method=='POST':
    answerid=request.data['answerid']
    print("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",answerid)
    prescriptionlist=Prescription.objects.all().filter(answer_id=answerid)
    prescription_serializer = PrescriptionGetSerializer(prescriptionlist,many=True)
    print("LIST",prescription_serializer.data)
    return JsonResponse(prescription_serializer.data,safe=False)
 return JsonResponse({},safe=False)     