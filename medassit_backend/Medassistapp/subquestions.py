from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from Medassistapp.models import SubQuestions
from Medassistapp.serializers import SubQuestionsGetSerializer
from Medassistapp.serializers import SubQuestionsSerializer
from rest_framework.decorators import api_view
@api_view(['GET','POST','DELTE'])
def SubQuestions_Submit(request):
    try:
        if request.method=="POST":
            subquestions_serializer=SubQuestionsSerializer(data=request.data)
            print("request.data",request.data)
            if subquestions_serializer.is_valid():
                subquestions_serializer.save()
                return JsonResponse({'message':'Subquestions Submitted Successfully','status':True},safe=False)
            else:
                return JsonResponse({'message':'Fail to Submit Subquestions','status':False},safe=False)
    except Exception as error:
        print('Error',error)
        return JsonResponse({'messgae':'Fail to submit Subquestions','status':False},safe=False)