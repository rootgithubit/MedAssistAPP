import { Button,Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from 'react';
import TopBox from "../Component/TopBox";
import { imageURL } from "../Services/FetchDjangoServices";

const useStyles = makeStyles((theme) => ({
    container: {
      height: '100vh',
      width: '100vw',
      background: 'f2f2f2',
      display: 'flex',
      flexDirection: 'column', // Column direction for vertical arrangement
      alignItems: 'center',
      justifyContent: 'flex-start', // Start from the top
      position: 'relative',
    },
    box: {
      height: '250px',
      width: '1200px',
      background: '#d2dae2',
      marginTop: '40px',
      marginBottom: 'auto', // Push box1 to the bottom
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      position: 'relative',
      borderRadius:'5px',
      borderTopLeftRadius:'20px'
    },
    box1: {
      height: '100px',
      width: '1200px',
      background: '#d2dae2',
      borderTopLeftRadius:'20px'
      
    },
  }));
  
  export default function PatientSurvey(props) {
    
    var classes = useStyles();
    return (
      <div className={classes.container}>
        <TopBox/>
        <div className={classes.box}>
            <div  style={{fontFamily:'roboto',fontSize:'25px',margin:'20px'}}>Instructions</div>
            <div style={{fontFamily:'roboto',fontSize:'15px',marginLeft:'20px'}}>    
            <p> In Sections A,B and C questions will be asked about your hip or knee pain.
              Please mark each response with an x.</p>
            <p>but the pictures will have to be pasted in later.
            You need to demonstrate to the examiners that you have more than a literal understanding of the text.</p>
            The students are reading "Lord of the Flies" as one of their set texts this year.
            At this point in the speech, the minister departed from his prepared text.</div>
            <button style={{width:'200px',padding:'10px',marginLeft:'430px',marginTop:'20px',background:'#34e7e4',borderRadius:'30px'}}>Start Womac Survey</button>
        </div>
        
        <div className={classes.box1}>
        <div  style={{fontFamily:'roboto',fontSize:'20px',margin:'10px'}}>Your Doctor</div>
        <div style={{height:'50px',width:'50px',marginLeft:'20px'}}>
        <img src={imageURL} style={{width:40,height:40,borderRadius:50}}/>
        </div>
        </div>
      </div>
    );
  }