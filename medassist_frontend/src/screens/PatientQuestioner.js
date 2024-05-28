import React,{ useEffect,useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import OptionComponent from '../Component/OptionComponent';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { postData } from '../Services/FetchDjangoServices';
import { useDispatch,useSelector } from 'react-redux';
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import { imageURL } from '../Services/FetchDjangoServices';

import Swal from 'sweetalert2';
const useStyles=makeStyles((theme)=>({
   
  container:
  {
   height:'91vh',
   width:'auto',
   display:'flex',
   justifyContent:'flex-start',
   alignItems:'center',
   flexDirection:'column',
   position: 'relative',
   fontFamily: "kanit",
   
  },
  topbox:
  {
   height:'100px',
   width: '900px',
   background:'#22a6b3',
   borderBottomLeftRadius:'40px',
   WebkitBorderBottomRightRadius:'40px',
   display:'flex',
   alignItems:'center',
   marginTop:'3px',

  },

  box:
  {
   height:'500px',
   width: '900px',
   background:'#D4E6F1',
   marginTop:'8px',
   display:'flex',
   flexDirection:'column'

  },

       

}));

export default function PatientQuestioner()
{   var dispatch=useDispatch()
    var classes=useStyles()
    const [Razorpay] = useRazorpay();
    const [questions,setQuestions]=useState([])
    const [index,setIndex]=useState(0)
    const [selectedOption,setSelectedOption]=useState({})
    
    //var doctor=JSON.parse(localStorage.getItem('DOCTOR'))  
    var doctor=useSelector((state)=>state.doctor)
    console.log('zzzzzzzzzzzzzzzzzzzzzz',doctor)
    var user=useSelector((state)=>state.user)
    var userData=Object.values(user)[0] 
    var answers=useSelector((state)=>state.answers)     
    const [doctorId,setDoctorId]=useState(doctor.id)
    const [patientId,setPatientId]=useState(userData.emailid)
    const [ansData,setAnsData]=useState({})

   ////////////////////Payment API/////////////////////
  
  const handlePayment = useCallback(async(na) => {
     
      
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: 20000,
      currency: "INR",
      name: 'MedAssist',
      description: "Online Payments",
      image: `${imageURL}/static/logo.jpg`,
     
      handler: (res) => {
        console.log("Payment Details",res);
        submitRecord()  
      },
      prefill: {
        name: userData.username,
        email: userData.emailid,
        contact: userData.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);





  ////////////////////////////////////////////////////////



  
  
    const fetchAllDoctorQuestions=async()=>{
    
      var body={doctorid:doctor.id}
       var result=await postData('doctorquestions',body)
       console.log(result.data[0])
       setQuestions(result.data)
       
     }  
    useEffect(function(){

    fetchAllDoctorQuestions()
   
    },[])
    
    const handleSubmit=async()=>{
      Swal.fire({
        title: "Make Payment of Rs 200/- Only?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Make Payment",
        denyButtonText: `Deny Payment?`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handlePayment()
        } else if (result.isDenied) {
          Swal.fire("Pls Make Payment", "", "info");
        }
      });


    }

    const submitRecord =async()=>{

      var body={"doctor":doctorId,'patient':patientId,'currentdate':`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,'currenttime':`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,'ansdata':JSON.stringify(answers)};
      console.log("FORM DATA",body)
      var result = await postData("answersubmit",body)
      if (result.status) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 5000,
          });
          
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: result.message,
            showConfirmButton: false,
            timer: 5000,
          });
        }

    }
    const handleNext=(i,mq,sq)=>{
       var i=index+1
       if(questions.length>0 && i<questions.length)   
    {  var   body={"Q":mq,"SQ":sq,"ans":selectedOption}
       dispatch({"type":"ADD_ANSWERS","payload":["Q"+i,body]})
      
    setIndex(i)}
    else
    {alert('end')
    var   body={"Q":mq,"SQ":sq,"ans":selectedOption}
    dispatch({"type":"ADD_ANSWERS","payload":["Q"+i,body]})
   
    

handleSubmit()
  }
    
  }
    const handlePrev=(i,mq,sq)=>{
      i=index
       if(i>0)   
    { var i=index-1
      var body={"Q":mq,"SQ":sq,"ans":selectedOption}
       dispatch({"type":"ADD_ANSWERS","payload":[("Q"+i),body]})
    setIndex(i)}
    else
    alert('Press Next')

    }


   const showQuestion=()=>{ 
    return(
        <div className={classes.container}>
        <div className={classes.topbox}>
        
        <div style={{fontSize:'30px',fontWeight:'600',color:'#fff',marginLeft:'30px',marginTop:'15px'}}>PatientQuestioner Index {index+1}/{questions?.length}</div>
        </div>
        <div style={{width:'900px',height:'50px',marginTop:'15px',fontSize:30}}>Que.[{index+1}]:{questions[index]?.question?.question}</div>
        <div className={classes.box}>
        <div style={{width:'150px',height:'40px',fontSize:20,fontWeight:'bolder', marginTop:'5px',marginLeft:'10px'}}>{questions[index]?.subquestiontext}</div>
        {questions[index]?.subquestion?<OptionComponent  options={questions[index]?.subquestion} setSelectedOption={setSelectedOption}/>:<></>}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:1100}}>
        <button onClick={()=>handlePrev(index+1,questions[index]?.question?.question,questions[index]?.subquestiontext)} style={{padding:'10px',borderWidth:0,width:'200px',background:'#22a6b3',borderColor:'#22a6b3', borderRadius:'50px',marginTop:'20px',display:'flex',alignItems: 'center',justifyContent:'center',color:'white',fontSize:26,fontFamily:'kanit',fontWeight:'bolder'}} ><NavigateBefore />Previous</button>
              <button onClick={()=>handleNext(index+1,questions[index]?.question?.question,questions[index]?.subquestiontext)} style={{padding:'10px', borderWidth:0,width:'200px',background:'#22a6b3',borderColor:'#22a6b3',borderRadius:'50px',marginTop:'20px',display:'flex',alignItems: 'center',justifyContent:'center',color:'white',fontSize:26,fontFamily:'kanit',fontWeight:'bolder'}} >Next<NavigateNextIcon /></button>
              
              </div>
        </div>
    )}
  return(<div>

        {showQuestion()}
       </div>)

}
