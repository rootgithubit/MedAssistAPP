import { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import { Height } from "@mui/icons-material";
import doctorimage from "../assets/Doctor.jpeg";
import Swal from "sweetalert2";
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField,Button } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "82vw",
    height: "85vh",
    background: "#22a6b3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:5,
    borderRadius: 25
  },
  box: {
    width: "60%",
    minHeight: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",
  },
}));
export default function QueryQuestionInterface() {
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
  const [subQuestionsNumbers,setSubQuestionsNumbers]=useState(0)
  const [category, setCategory] = useState([]);
  const [question,setQuestion]=useState([]);

  // ----------- subquestions submit ---------------------------
  const [categoryId,setCategoryId]=useState('');
  const [doctorId,setDoctorId]=useState(doctor.id)
  const [numberOfQuestions,setNumberOfQuestions]=useState('')
  const [questionId,setQuestionId]=useState('')
  const [options,setoptions]=useState({})
  const [questionText,setQuestionText]=useState({})

  const handleTextChange=(event,index)=>{
    // setoptions((prev)=>({...prev,[index+1]:event.target.value}))
    setoptions({...options,[index+1]:event.target.value})
    // console.log(options)
  }
  const handleReset=()=>{
    setQuestionId('');
    setoptions({});
    setSubQuestionsNumbers(0)
  }
  const handleSubmit=async()=>{
    var body={
        category:categoryId,
        doctor:doctorId,
        subquestiontext:questionText,
        subquestionnumber:subQuestionsNumbers.toString(),
        question:questionId,
        subquestion:Object.values(options)+""
    }
    console.log(body)
    var result=await postData('subquestionslist',body)
    if (result.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
        handleReset();
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

  const fetchAllCategory = async () => {
    var data = await getData("categorylist");
    setCategory(data);
    // console.log('category',data)
  };
  const fetchAllQuestions=async(cid)=>{
    var body={id:cid};
    var data = await postData("questionlist",body);
    setQuestion(data)
  }
  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };
  const fillQuestions=()=>{
    return question.map((item)=>{
      return <MenuItem value={item.id}>{item.question}</MenuItem>
    })
  }
  const handleCategoryChange = (event) => {
    fetchAllQuestions(event.target.value);
    setCategoryId(event.target.value)
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);
  const showTextField=()=>{
    var x=new Array(subQuestionsNumbers)
    x.fill(1)
    return x.map((item,index)=>{
        return(
          <Grid item xs={6}>
            <TextField onChange={(event)=>handleTextChange(event,index)} label={"Question "+parseInt(index+1)} fullWidth/>
          </Grid>
        );
    })
  }
  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid item xs={12}>
          <Heading icon={doctorimage} text="Subquestions Interface" />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField value={doctorId} label="Doctor Id" onChange={(event)=>setDoctorId(event.target.value)} fullWidth></TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId} label="Category" onChange={handleCategoryChange}>
                <MenuItem>- Select Category-</MenuItem>
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Question Category</InputLabel>
              <Select value={questionId} label="Question Category" onChange={(event)=>setQuestionId(event.target.value)}>
                <MenuItem>- Select Question Type-</MenuItem>
                {fillQuestions()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Number of Questions</InputLabel>
              <Select onChange={(event)=>setSubQuestionsNumbers(event.target.value)} label="Number of Questions">
                <MenuItem value={0}>-Select Number of Questions</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <TextField label="Sub Question" onChange={(event)=>setQuestionText(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            {showTextField()}
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="success" onClick={()=>handleSubmit()} fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth onClick={()=>handleReset()}>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
