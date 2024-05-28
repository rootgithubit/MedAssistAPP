
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
export default function AdminDashboard()
{
var navigate=useNavigate()
  function menuList() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/doctorinterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
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
        <div style={{fontWeight:'bold',fontSize:26}}>Medassist</div>
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
        <img src={adminimage} style={{width:80,height:80,borderRadius:40}}/>
      </div>
      <div style={{fontWeight:14,fontWeight:'bold'}}>Varun</div>
      <div style={{fontWeight:10,fontWeight:300}}>+918305747276</div>
      <div style={{fontWeight:10,fontWeight:300}}>varun23@gmail.com</div>
      <div>
        {menuList()}
      </div>

    </Paper>
    </Grid>
    <Grid item xs={10}>
      <Routes>
      <Route element={<DoctorInterface/>} path="/doctorinterface"/>
      <Route element={<DisplayAllDoctors/>} path="/displayalldoctors"/>
      </Routes>

    </Grid>
    </Grid>)
   }
    return(<div>
      {appBar()}
      {sideBar()}

    </div>)
}