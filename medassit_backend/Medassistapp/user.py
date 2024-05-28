from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import Patient
from Medassistapp.serializers import PatientSerializer


from rest_framework.decorators import api_view

@api_view(['GET','POST','DELETE'])
def Submit_User(request):
    try:
        if request.method == 'POST':
            
            user_serializer=PatientSerializer(data=request.data)
            
            print(request.data)
            if(user_serializer.is_valid()):
                print("Data is valid")
                user_serializer.save()
                return JsonResponse({"message":'User Details Submitted Successfully',"status":True},)
            else:
                return JsonResponse({"message":'Fail to Submit User Details',"status":False},)
    except Exception as e:
        print('Error:',e)
        return JsonResponse({"message":'Fail to Submit User Details',"status":False},)
    
@api_view(['GET', 'POST', 'DELETE'])
def User_search(request):
 if request.method=='POST':
    
    email=request.data['emailid']
    pwd=request.data['password']
    
    patient=Patient.objects.all().filter(emailid=email,password=pwd)
   
    patient_serializer = PatientSerializer(patient,many=True)
    if(len(patient_serializer.data)==1):
     return JsonResponse({"data":patient_serializer.data,"status":True },safe=False)
    else:
     return JsonResponse({"data":[],"status":False },safe=False)
 return JsonResponse({"data":{},"status":False },safe=False)
     