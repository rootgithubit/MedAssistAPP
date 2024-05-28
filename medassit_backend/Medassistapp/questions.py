from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from Medassistapp.models import Questions
from Medassistapp.serializers import QuestionSerializer
from Medassistapp.serializers import QuestionGetSerializer
from rest_framework.decorators import api_view
@api_view(['Get','POST','DELETE'])
def Question_List(request):
    try:
        if(request.method=='POST'):
            id=request.data['id']
            questionlist=Questions.objects.all().filter(category_id=id)
            question_serializer=QuestionSerializer(questionlist,many=True)
            return JsonResponse(question_serializer.data,safe=False)
        return JsonResponse({},safe=False)
    except Exception as error:
        print("xxxxxxxxxx",error)
        return JsonResponse({},safe=False)
@api_view(['Get','POST','DELETE'])
def Question_Submit(request):
    try:
        if(request.method=="POST"):
            question_serializer=QuestionSerializer(data=request.data)
            if question_serializer.is_valid():
                question_serializer.save();
                return JsonResponse({'message':'Questions submitted sucessfully','status':True},safe=False)
            else:
                return JsonResponse({'message':'Fail to submit questions','status':False},safe=False) 
    except Exception as error:
        print("Error:",error)
        return JsonResponse({'message':'Fail to submit questions','status':False},safe=False)