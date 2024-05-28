import { useEffect, useState } from "react";
import {
  FormHelperText,
  Avatar,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import listdoctor from "../assets/listofdoctors.png";
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import Swal from "sweetalert2";
import doctorimage from "../assets/Doctor.jpeg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    background: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 800,
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
}));

const Medicine = ({
  data,
  handleChange,
  index,
  isDelete,
  handleRemove,
  handleNew,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5} style={{ marginBottom: 3 }}>
        <TextField
          value={data.medicine}
          onChange={(event) =>
            handleChange(event.target.value, index, "medicine")
          }
          label="Medicine"
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Dose</InputLabel>
          <Select
            onChange={(event) =>
              handleChange(event.target.value, index, "dose")
            }
            label="Dose"
            value={data.dose}
          >
            <MenuItem>-Select Dose-</MenuItem>
            <MenuItem value={"OD"}>OD</MenuItem>
            <MenuItem value={"PD"}>PD</MenuItem>
            <MenuItem value={"DP"}>DP</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField
          value={data.days}
          onChange={(event) => handleChange(event.target.value, index, "days")}
          label="Days"
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        {isDelete ? (
          <RemoveCircleOutline onClick={() => handleRemove(index)} />
        ) : (
          <AddCircleOutlineIcon onClick={handleNew} />
        )}
      </Grid>
    </Grid>
  );
};

export default function PrescriptionInterface(props) {
  var location = useLocation();
  var patientData = JSON.parse(location.state.patient);
  console.log("PPPP", patientData);
  var doctor = JSON.parse(localStorage.getItem("DOCTOR"));
  const [doctorId, setDoctorId] = useState(doctor.doctorname);
  const [patientName, setPatientName] = useState(patientData.patient.username);
  const [answerId, setAnswerId] = useState(patientData.id);
  const [currentDate, setCurrentDate] = useState("1/1/1");
  const [currentTime, setCurrentTime] = useState("");
  const [diet, setDiet] = useState("");
  const [tests, setTests] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [days, setDays] = useState("");
  const [formError, setFormError] = useState({});
  const [med, setMed] = useState([{ medicine: "", dose: "", days: "" }]);

  const handleNew = () => {
    setMed((prev) => [...prev, { medicine: "", dose: "", days: "" }]);
  };

  

  const handleChange = (val, index, key) => {
    const data = [...med];
    data[index][key] = val;
    setMed([...data]);
  };

  const handleRemove = (index) => {
    const data = [...med];
    data.splice(index, 1);
    setMed([...data]);
  };

  const showMed = () => {
    return med.map((item, index) => {
      return (
        <Medicine
          data={item}
          isDelete={!(index + 1 == med.length)}
          index={index}
          handleChange={handleChange}
          handleRemove={handleRemove}
          handleNew={handleNew}
        />
      );
    });
  };

  const handleReset = () => {
    setDoctorId("");
    setPatientName("");
    setCurrentDate("1/1/1");
    setCurrentTime("");
    setMedicine("");
    setDose("");
    setDays("");
    setTests("");
    setDiet("");
  };

  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }));
    console.log("Error", formError);
  };

  const isError = () => {
    var error = false;

    if (patientName.length == 0) {
      handleError("Please Enter  Patient", "patientname");
      error = true;
    }

    if (currentDate.length == 0) {
      handleError("Date of birth should not be blank", "currentdate");
      error = true;
    }
    if (currentTime.length == 0) {
      handleError("Currenttime", "currenttime");
      error = true;
    }

    if (doctorId.length == 0) {
      handleError("Doctor Should not be Blank", "doctor");
      error = true;
    }

    if (medicine.length == 0) {
      handleError("Medicine Should not be Blank", "medicine");
      error = true;
    }

    if (days.length == 0) {
      handleError("Days Should not be Blank", "days");
      error = true;
    }
    if (dose.length == 0) {
      handleError("Dose Should not be Blank", "dose");
      error = true;
    }

    if (tests.length == 0) {
      handleError("Tests Should not be Blank", "tests");
      error = true;
    }

    if (diet.length == 0) {
      handleError("Medicine Should not be Blank", "diet");
      error = true;
    }

    return error;
  };

  const handleSubmit = async () => {
   
      var body={"answer":answerId,"patient":patientData.patient.emailid,"doctor":doctor.id,

      "currentdate":`${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,"currenttime":
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
       "tests":tests,"diet":diet,"medicine":JSON.stringify(med)};
     
      
      var result = await postData("prescriptionsubmit", body);
      // alert(JSON.stringify(formData))
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
  
  };
  var classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading
              color="#000"
              icon={doctorimage}
              text="Prescription Interface"
              linkimage={listdoctor}
              link={"/admindashboard/displayalldoctors"}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formError.patientname}
              value={patientName}
              onFocus={() => handleError("", "patientname")}
              onChange={(event) => setPatientName(event.target.value)}
              fullWidth
              label="Patient Name"
              helperText={formError.patientname}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formError.doctor}
              onFocus={() => handleError("", "doctor")}
              value={doctorId}
              onChange={(event) => setDoctorId(event.target.value)}
              label="Doctor Id"
              fullWidth
              helperText={formError.doctor}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={formError.tests}
              onFocus={() => handleError("", "tests")}
              value={tests}
              onChange={(event) => setTests(event.target.value)}
              label="Tests"
              fullWidth
              helperText={formError.tests}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={formError.diet}
              onFocus={() => handleError("", "diet")}
              value={diet}
              onChange={(event) => setDiet(event.target.value)}
              label="Diet"
              fullWidth
              helperText={formError.tests}
            />
          </Grid>

          <Grid item xs={12}>
            {showMed()}
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#000" }}
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleReset()}
              style={{ backgroundColor: "#000" }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
