from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from Medassistapp.models import States
from Medassistapp.models import City
 
from  Medassistapp.models import Doctor
from  Medassistapp.serializers import DoctorSerializer
from  Medassistapp.serializers import DoctorGetSerializer

from Medassistapp.models import Questions
from Medassistapp.serializers import QuestionSerializer
from Medassistapp.serializers import QuestionGetSerializer

from Medassistapp.models import SubQuestions
from Medassistapp.serializers import SubQuestionsGetSerializer
from Medassistapp.serializers import SubQuestionsSerializer


from rest_framework.decorators import api_view



@api_view(['GET', 'POST', 'DELETE'])
def Doctors_List(request):
 if request.method=='GET':
    doctorlist=Doctor.objects.all()

    doctor_serializer = DoctorGetSerializer(doctorlist,many=True)
    return JsonResponse(doctor_serializer.data,safe=False)
 return JsonResponse({},safe=False)





@api_view(['GET', 'POST', 'DELETE'])
def Submit_Doctor(request):
  
 try:
   if request.method=='POST':
    
    doctor_serializer=DoctorSerializer(data=request.data)
    print(doctor_serializer)
    if(doctor_serializer.is_valid()):
    
      doctor_serializer.save()
      return JsonResponse({"message":'Doctor Submitted Successfully',"status":True},safe=False)
    else:
      return JsonResponse({"message":'Fail to  submit doctor',"status":False},safe=False) 
 except Exception as e:
    print("Error:",e)
    return JsonResponse({"message":'Fail to  submit doctor',"status":False},safe=False)
  
  
  
@api_view(['GET', 'POST', 'DELETE'])
def Edit_Doctor(request):
  
 try:
   if request.method=='POST':
   
      doctor=Doctor.objects.get(pk=request.data['id'])
      doctor.category_id=request.data['category']
      doctor.doctorname=request.data['doctorname']
      doctor.gender=request.data['gender']
      doctor.dob=request.data['dob']
      doctor.states_id=request.data['states']
      doctor.city_id=request.data['city']
      doctor.address=request.data['address']
      doctor.qualifications=request.data['qualifications']
      doctor.emailid=request.data['emailid']
      doctor.mobileno=request.data['mobileno']
      doctor.save()
      return JsonResponse({"message":'Doctor Edited Successfully',"status":True},safe=False)
   
 except Exception as e:
    print("Error:",e)
    return JsonResponse({"message":'Fail to  submit doctor',"status":False},safe=False) 
  
  
  
@api_view(['GET', 'POST', 'DELETE'])
def Delete_Doctor(request):
  
 try:
   if request.method=='POST':
      print(request.data)
   
      doctor=Doctor.objects.get(pk=request.data['id'])
      doctor.delete()
      return JsonResponse({"message":'Doctor Deleted Successfully',"status":True},safe=False)
   
 except Exception as e:
    print("Error:",e)
    return JsonResponse({"message":'Fail to  submit doctor',"status":False},safe=False) 




@api_view(['GET', 'POST', 'DELETE'])
def Edit_Picture(request):
  
 try:
   if request.method=='POST':
   
      doctor=Doctor.objects.get(pk=request.data['id'])
      doctor.photograph=request.data['photograph']
      doctor.save()
      return JsonResponse({"message":'Doctor Image Edited Successfully',"status":True},safe=False)
   
 except Exception as e:
    print("Error:",e)
    return JsonResponse({"message":'Fail to edit doctor image',"status":False},safe=False) 
 
@api_view(['GET', 'POST', 'DELETE'])
def Doctor_Login(request):
 if request.method=='POST':
    
    email=request.data['emailid']
    pwd=request.data['password']
    
    doctor=Doctor.objects.all().filter(emailid=email,password=pwd)
   
    doctor_serializer = DoctorSerializer(doctor,many=True)
    if(len(doctor_serializer.data)==1):
     return JsonResponse({"data":doctor_serializer.data,"status":True },safe=False)
    else:
     return JsonResponse({"data":[],"status":False },safe=False)
  
 return JsonResponse({"data":{},"status":False },safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def Doctor_Questions(request):
   if request.method=='POST':
     print('xxxxxxxxxxxxxxxxxx',request.data['doctorid'])
     doctorid=request.data['doctorid']
     questions=SubQuestions.objects.all().filter(doctor_id=doctorid)
     questions_serializer = SubQuestionsGetSerializer(questions,many=True)
     print(questions_serializer.data)
     return JsonResponse({"data":questions_serializer.data,"status":True },safe=False)
   else:
     return JsonResponse({"data":[],"status":False },safe=False)  
     