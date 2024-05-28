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
    width: "50%",
    minHeight: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",
  },
}));
export default function QuestionInterface() {
  const [category, setCategory] = useState([]);
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))

  // ------------------ Question Submit-------------------------
  const [categoryId, setCategoryId] = useState("");
  const [doctorId,setDoctorId]=useState(doctor.id);
  const [question,setQuestion]=useState("");
 function handleReset(){
  
    setDoctorId("");
    setCategoryId("");
    setQuestion("");
  }
  const handleSubmit=async()=>{
    var formdata= new FormData();
    formdata.append("doctor",doctorId);
    formdata.append('category',categoryId);
    formdata.append('question',question);
    var result = await postData("questionssubmit",formdata)
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
  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);
  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid item xs={12}>
          <Heading icon={doctorimage} text="Questions Interface" />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField value={doctorId} label="Doctor Id" fullWidth onChange={(event)=>setDoctorId(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId} label="Category" onChange={(event) => setCategoryId(event.target.value)}>
                <MenuItem>- Select Category-</MenuItem>
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField value={question} label="Question Type" fullWidth onChange={(event)=>setQuestion(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="error" fullWidth onClick={handleReset}>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
