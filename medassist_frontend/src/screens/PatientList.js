import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import { Grid,Button } from "@mui/material";
import React from 'react'
import { useState } from "react";
import { postData } from "../Services/FetchDjangoServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const useStyles = makeStyles((theme) => ({
   
   container: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

},
box: {
    height: 'auto',
    width: '1200px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:'2%'

}
}));
export default function PatientList(props) {
  var navigate=useNavigate()
    var classes=useStyles()
    var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
    const[patientlist,setPatientList]=useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedPatient,setSelectedPatient]=useState({})

    const FetchAllPatient=async()=>{
      var result=await postData('answerlist',{'doctorid':doctor.id})
      setPatientList(result)
      
  
  }
  
  useEffect(function(){
      FetchAllPatient()
  },[])

  const handlePatient=()=>{
    setOpen(false)
    navigate('/doctordashboard/ps',{state:{patient:JSON.stringify(selectedPatient)}})
  }
  const handlePrescriptionOpen=(rowData)=>{
    
    navigate('/doctordashboard/ppdc',{state:{patient:JSON.stringify(rowData)}})
  }
  const handleClickOpen = (rowData) => {
    setSelectedPatient(rowData)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


 function showQuestion() {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePatient}>Add Prescription</Button>
         
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}




  function showPatientList() {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
        <MaterialTable
          title='PatientList'
          
          columns={[
            { title: 'EmailId',render:(rowData)=><div>{rowData.patient.emailid}</div>},
            { title: 'PhoneNumber',render:(rowData)=><div>{rowData.patient.mobileno}</div>},
            { title: 'Name', render:(rowData)=><div>{rowData.patient.username}</div>},
            { title: 'CurrentDate',render:(rowData)=><div>{rowData.currentdate}</div>},
            { title: 'CurrentTime',render:(rowData)=><div>{rowData.currenttime}</div>},
          ]}
       
          data={patientlist}
          options={{
            paging:true,
            pageSize:3,
            emptyRowsWhenPaging:false,
            pageSizeOptions:[3,5,10]
          }}
          
          actions={[
            {
              icon: 'medication',
              tooltip: 'Add Prescription',
              onClick: (event, rowData) =>handleClickOpen(rowData)
            },
            {
              icon: 'assignment',
              tooltip: 'Show Prescription',
              onClick: (event, rowData) =>handlePrescriptionOpen(rowData)
            }
            
          ]}
         
        />
        </Grid>
        </Grid>
      )
  }
  return(<div className={classes.container}>
      <div className={classes.box}>
          {showPatientList()}
      </div>
     {showQuestion()} 
  </div>
  )
  }  