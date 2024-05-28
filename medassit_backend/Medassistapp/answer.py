from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from Medassistapp.models import Answers
from Medassistapp.serializers import AnswerSerializer
from Medassistapp.serializers import AnswerGetSerializer
 
from rest_framework.decorators import api_view
 
@api_view(['Get','POST','DELETE'])
def AnswerSubmit(request):
    try:
        if(request.method=="POST"):
            answer_serializer=AnswerSerializer(data=request.data)
            print("aaaa",request.data)
            if answer_serializer.is_valid():
                answer_serializer.save();
                return JsonResponse({'message':'Answer submitted sucessfully','status':True},safe=False)
            else:
                return JsonResponse({'message':'Fail to submit Answer','status':False},safe=False) 
    except Exception as error:
        print("Error:",error)
        return JsonResponse({'message':'Fail to submit Answer','status':False},safe=False)
    
@api_view(['GET', 'POST', 'DELETE'])
def Answer_List(request):
 if request.method=='POST':
    doctorid=request.data['doctorid']
    print("DOCCC",doctorid)
    answerslist=Answers.objects.all().filter(doctor_id=doctorid)
    answers_serializer=AnswerGetSerializer(answerslist,many=True)
    print("LIST",answers_serializer.data)
    return JsonResponse(answers_serializer.data,safe=False)
 return JsonResponse({},safe=False) 
   
    