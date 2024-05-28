
import {IconButton, AppBar,Box,Toolbar,Paper,Grid  } from "@mui/material";
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DoctorInterface from "./DoctorInterface";
import DisplayAllDoctors from "./DisplayAllDoctors";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Routes,Route,useNavigate } from "react-router-dom";
import adminimage from "../assets/Admin.jpeg"
import QuestionInterface from "./QuestionInterface";
import QueryQuestionInterface from "./QueryQuestionsInterface";
import { imageURL } from "../Services/FetchDjangoServices";
import PatientList from "./PatientList";
import PrescriptionInterface from "./PrescriptionInterface"
import Prescriptionpdf from "./Prescriptionpdf"
export default function DoctorDashboard()
{
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
var navigate=useNavigate()
  function menuList() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/questioninterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Questions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/queryquestioninterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Options" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/patientlist')}>
                <ListItemIcon>
                  <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText primary="Patient" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    );
  }

 const appBar=()=>{
  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#22a6b3'}} position="static">
       <Toolbar>
        <div style={{fontWeight:'bold',fontSize:26,}}>Medassist</div>
        <IconButton  style={{color:'#fff',marginLeft:'auto'}}>
  <LogoutRounded />
</IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    )
   }
   const sideBar=()=>{
    return(
      <Grid container spacing={3}>
        <Grid item xs={2}>
    <Paper elevation={3} style={{width:200,margin:10,display:'flex',flexDirection:'column',borderRadius:20,alignItems:'center'}} >
      <div>
        <img src={`${imageURL}${doctor.photograph}`} style={{width:80,height:80,borderRadius:40}}/>
      </div>
      <div style={{fontWeight:14,fontWeight:'bold'}}>{doctor.doctorname}</div>
      <div style={{fontWeight:10,fontWeight:300}}>+91{doctor.mobileno}</div>
      <div style={{fontWeight:10,fontWeight:300}}>{doctor.emailid}</div>
      <div>
        {menuList()}
      </div>

    </Paper>
    </Grid>
    <Grid item xs={9}>
      <Routes>
      <Route element={<QuestionInterface/>} path="/questioninterface"/>
      <Route element={<QueryQuestionInterface/>} path="/queryquestioninterface"/>
      <Route element={<PatientList/>} path="/patientlist"/>
      <Route element={<PrescriptionInterface/>} path="/ps"/>
      <Route element={<Prescriptionpdf/>} path="/ppdc"/>
      </Routes>
    </Grid>
    </Grid>)
   }
    return(<div>
      {appBar()}
      {sideBar()}

    </div>)
}