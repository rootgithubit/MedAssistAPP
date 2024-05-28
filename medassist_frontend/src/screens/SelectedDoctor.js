import { Button,Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import doctorimage from "../assets/Doctor.jpeg"
import { useSelector } from "react-redux";
import { imageURL } from "../Services/FetchDjangoServices";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100v%",
    fontFamily: "Gabarito",
    overflowY:'hidden',
    fontWeight:'bold'

  },
  header: {
    marginLeft:10,
    width:"100%",
    height: "10%",
    background: "#22a6b3",
    color: "#ffff",
    borderRadius: "0px 0px 25px 25px",
    display: "flex",
    alignItems: "center",
    fontSize: 30,
    marginTop:2
  },
  text1: {
    marginLeft:20
  },
  
  bigbox: {
    height: "auto",
    background: "#D4E6F1",
    width:'95%',
    margin: 20,
    display: "flex",
    flexDirection: "column",
    padding: "1%",
  },
  question: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#154360",
  },
  text2: {
    fontSize: 20,
    display: "flex",
    margin: "20px 20px 0px 20px",
  },
  box2:{
    background: "#D4E6F1",
    width:'95%',
    margin:20,
    padding:10
   
  },
  text3:{
    color:'#154360',
    marginLeft: 20,
    fontSize: 20,
    display:'flex'
  }
}));
export default function SelectedDoctor() {
  var classes = useStyles();
  var navigate=useNavigate()
  var doctorData=useSelector(state=>state.doctor)
  const handleQuestion=()=>{
    navigate('/patientdashboard/patientquestioner')

  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.text1}>Medassist {doctorData.category.categoryname} Index</div>
      </div>
      <div className={classes.divider}>
        <div className={classes.bigbox}>
          <div className={classes.question}>Instructions</div>
          <div className={classes.text2}>
            In section A,B and c, questions will be asked about your hip or knee
            pain. Please mark each response with an X
          </div>
          <div className={classes.text2}>
            if you are unsure about how to answer a question, please give the
            best answer you can
          </div>
          <div
            style={{display: "flex",marginTop: 10,marginLeft: 20,marginRight: 20,marginBottom: 10,padding: 20,justifyContent: "center",}}>
            <Button style={{variant: "contained",background: "#22a6b3",borderRadius: 100,height: 40,color: "#ffff",fontSize: 20,paddingLeft: 50,paddingRight: 50, }} onClick={handleQuestion} >  Start Medassist Survey </Button>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',marginTop:''}}>
          <div className={classes.text3}>Your Doctor</div>
          <div className={classes.box2}>
            <Grid container>
                <Grid item xs={1}>
                    <Avatar alt="Remy Sharp"  src={`${imageURL}${doctorData.photograph}`}  sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item xs={11}>
                    <div style={{display:'flex',marginBottom:10,marginLeft:10,color:'#154360',fontWeight:'bold',fontSize:25}}>
                        Dr. {doctorData.doctorname}
                    </div>
                    <div>
                    <Button style={{variant: "contained",background: "#22a6b3",borderRadius: 100,height: 40,color: "#ffff",marginLeft:10,fontSize: 15,paddingLeft: 30,paddingRight: 30, }}>Change Doctor</Button>
                    </div>
                </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}