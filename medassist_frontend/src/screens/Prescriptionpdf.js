import makeStyles from "@mui/styles/makeStyles";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Paper,
  Tab,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getData, postData, imageURL } from "../Services/FetchDjangoServices";
import { useEffect } from "react";
import MaterialTable from "@material-table/core";
import IconButton from '@mui/material/IconButton';
import Download from '@mui/icons-material/Download';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    // background:'#fff',
    background: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position:'relative'
  },
  box: {
    width: "50vw",
    height: "auto",
    background: "#fff",
    padding: 10,

    // borderRadius: 200,
    // padding: '15%',
  },
  infophoto: {
    margin: "20px 0px 0px 70px",
  },
  Leftfont: {
    fontSize: 18,
    fontWeight: "bold",
    margin: "10px 0px 0px 25px",
  },
  Leftcategoryfont: {
    fontSize: 15,

    margin: "5px 0px 0px 40px",
  },
  LeftSubfont: {
    fontSize: 13,
    margin: "5px 0px 0px 30px",
  },

  Rightfont: {
    fontSize: 18,
    fontWeight: "bold",
    margin: "89px 0px 0px 60%",
  },
  Rightcategoryfont: {
    fontSize: 15,

    margin: "5px 0px 0px 61%",
  },
  RightSubfont: {
    fontSize: 13,
    margin: "5px 0px 0px 61%",
  },
  Testfont: {
    fontSize: 22,
    fontWeight: "bold",
    margin: "0px 0px 95% 25px",
  },
  TestSubfont: {
    fontSize: 17,
    margin: "7px 0px 0px 30%",
  },
  Medfont: {
    fontSize: 22,
    fontWeight: "bold",
    margin: "-90% 0px 0px 25px",
  },
}));

export default function PdfPrescription() {
  var classes = useStyles();
  var location = useLocation();
  var patientData = JSON.parse(location.state.patient);
  console.log("PPPP", patientData);
  var doctor = JSON.parse(localStorage.getItem("DOCTOR"));
  const [prescriptionlist, setPrescriptionList] = useState([]);
  const fetchAllPrescription = async () => {
    var result = await postData("showprescription", {
      answerid: patientData.id,
    });
    console.log("QQQQ", result);
    setPrescriptionList(result[0]);
    console.log("result", JSON.parse(result[0].medicine));
    // alert(JSON.stringify(result[0].currentdate))
  };

  useEffect(function () {
    fetchAllPrescription();
  }, []);

  const showMedList = (data) => {
    if (data != undefined) {
      //   console.log("Data1", data);
      return JSON.parse(data)?.map((item, index) => {
        return (
          <tr>
            <th>{index + 1}</th>
            <th>{item.medicine}</th>
            <th>{item.dose}</th>
            <th>{item.days}</th>
          </tr>
        );
      });
    } else {
      return <></>;
    }
  };
const handlePrint=()=>{
  var printContents = document.getElementById('printableArea').innerHTML
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;

}


  return (
    <div className={classes.container}>
      
      <IconButton  style={{position:'absolute',zIndex:2,top:60,right:170}} onClick={handlePrint}>
        <Download />
      </IconButton>
      
      <Paper className={classes.box} elevation={24}  id="printableArea">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                margin: 15,
                padding: 5,
                display: "flex",
                justifyContent: "left",
                width: 130,
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <Avatar
                  alt="Remy Sharp"
                  src={`${imageURL}${doctor?.photograph}`}
                  sx={{ width: 80, height: 80 }}
                />
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 18,
                }}
              >
                Dr. {doctor?.doctorname}
              </div>
              <div
                style={{ fontWeight: 400, fontFamily: "kanit", fontSize: 12 }}
              >
                {doctor?.emailid}
              </div>
              <div
                style={{ fontWeight: 400, fontFamily: "kanit", fontSize: 12 }}
              >
                +91{doctor?.mobileno}{" "}
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                margin: 15,
                padding: 5,
                display: "flex",
                alignItems: "flex-end",
                width: 230,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 20,
                  color: "crimson",
                }}
              >
                Patient Details
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 18,
                }}
              >
                {prescriptionlist?.patient?.username}
              </div>
              <div
                style={{ fontWeight: 400, fontFamily: "kanit", fontSize: 16 }}
              >
                {new Date().getFullYear() -
                  new Date(prescriptionlist?.patient?.dob).getFullYear()}{" "}
                Year, Male
              </div>
              <div
                style={{ fontWeight: 400, fontFamily: "kanit", fontSize: 12 }}
              >
                +91{prescriptionlist?.patient?.mobileno}{" "}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                margin: "0px 15px 15px 15px",
                padding: 5,
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 20,
                  color: "crimson",
                }}
              >
                Tests
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 18,
                }}
              >
                {prescriptionlist?.tests}
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                margin: "0px 15px 15px 15px",
                padding: 5,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  fontSize: 20,
                  color: "crimson",
                  alignSelf: "flex-start",
                  marginLeft: "9%",
                }}
              >
                Medicine
              </div>
              <table
                style={{
                  fontFamily: "kanit",
                  width: 500,
                  color: "#212121",
                  borderColor: "#b2bec3",
                  borderWidth: 0.5,
                }}
                cellPadding="5"
                border="1"
                cellSpacing="0"
              >
                <tr style={{ color: "#22a6b3" }}>
                  <th>Sn</th>
                  <th>Medicine</th>
                  <th>Dose</th>
                  <th>Days</th>
                </tr>
                {showMedList(prescriptionlist?.medicine)}
              </table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "kanit",
                fontSize: 20,
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
                width: "57%",
                
              }}
            >
              Note : Consult after 7 Days
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
