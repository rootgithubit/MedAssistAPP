import {
    Grid,
    TextField,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
    InputLabel,
    FormHelperText,
  } from "@mui/material";
  import makeStyles from "@mui/styles/makeStyles";
  import Heading from "../Component/Heading";
  import { postData, serverURL } from "../Services/FetchDjangoServices";
  import Swal from "sweetalert2";
  import { useState } from "react";
  import { LocalizationProvider } from "@mui/x-date-pickers";
  import dayjs from "dayjs";
  import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
  import { TimePicker } from "@mui/x-date-pickers/TimePicker";
  import moment from "moment/moment";
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100vw",
      height: "100vh",
      background: "#22a6b3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      width: "50%",
      height: "auto",
      background: "#ffff",
      borderRadius: 10,
      padding: "1%",
    },
  }));
  export default function DoctorTimingInterface(props) {
    const [doctorId, setDoctorId] = useState("");
    const [startTime, setStartTime] = useState("2023-01-01T00:00");
    const [endTime, setEndTime] = useState("2023-01-01T00:00");
    const [days, setDays] = useState([]);
    const [status, setStatus] = useState("");
    const [formError, setFormError] = useState({});
    const handleEndTime = (event) => {
      var t = moment(new Date(event)).format("hh:mm A");
      setEndTime(t);
    };
    const handlestartTime = (event) => {
      var t = moment(new Date(event)).format("hh:mm A");
      
      setStartTime(t);
    };
    const handleError = (error, label) => {
      setFormError((prev) => ({ ...prev, [label]: error }));
    };
    const isError = () => {
      var error = false;
      if (doctorId.length == 0) {
        handleError("Doctor Id is not Written", "doctorid");
        error = true;
      }
      if (startTime.length == 0) {
        handleError("Enter Start Time of Session", "starttime");
        error = true;
      }
      if (endTime.length == 0) {
        handleError("Enter End Time of Session", "endttime");
        error = true;
      }
      if (status.length == 0) {
        handleError("Select Avalilability status", "status");
        error = true;
      }
      if (days.length == 0) {
        handleError("Select day/s", "days");
        error = true;
      }
      return error;
    };
    const handleReset = () => {
      setDays([]);
      setDoctorId("");
      setStartTime(new Date());
      setEndTime(new Date());
      setStatus("");
    };
    const handleDays = (event) => {
      const { value, checked } = event.target;
      // console.log(`${value} is ${checked}`)
      if (checked) {
        setDays([...days, value]);
      } else {
        setDays(days.filter((event) => event !== value));
      }
    };
    const handleSubmit = async () => {
      if (!isError()) {
        // var body={'doctorid':doctorId,'starttimings':startTime,'endtimings':endTime,'days':days,'status':status}
        var body = {
          doctor: doctorId,
          starttimings: startTime.toString(),
          endtimings: endTime.toString(),
          days: days.toString(),
          status: status,
        };
        alert(JSON.stringify(body));
  
        var result = await postData("timingsubmit", body);
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
    };
    var classes = useStyles();
    return (
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid item xs={12}>
            <Heading icon="Doctor.jpeg" text="Timing Registration" />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                error={formError.doctorid}
                value={doctorId}
                helperText={formError.doctorid}
                onFocus={() => handleError("", "doctorid")}
                onChange={(event) => setDoctorId(event.target.value)}
                fullWidth
                label="Doctor Id"
              ></TextField>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider
                value={dayjs(startTime)}
                dateAdapter={AdapterDayjs}
              >
                <MobileTimePicker
                  error={formError.starttime}
                  helperText={formError.starttime}
                  label="Start Time"
                  onFocus={() => handleError("", "starttime")}
                  onChange={handlestartTime}
                  defaultValue={dayjs(startTime)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider
                value={dayjs(endTime)}
                dateAdapter={AdapterDayjs}
              >
                <MobileTimePicker
                  error={formError.endtime}
                  helperText={formError.endtime}
                  label="End Time"
                  onFocus={() => handleError("", "endtime")}
                  onChange={handleEndTime}
                  defaultValue={dayjs(endTime)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel error={formError.status}>Status</FormLabel>
                <RadioGroup value={status} row>
                  <FormControlLabel
                    error={formError.status}
                    onFocus={() => handleError("", "status")}
                    onChange={(event) => setStatus(event.target.value)}
                    control={<Radio />}
                    value="Available"
                    label="Available"
                  />
                  <FormControlLabel
                    error={formError.status}
                    onFocus={() => handleError("", "status")}
                    onChange={(event) => setStatus(event.target.value)}
                    control={<Radio />}
                    value="Not Available"
                    label="Not Available"
                  />
                </RadioGroup>
                <FormHelperText error>{formError.status}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={formError.days}
                error={formError.days}
                fullWidth
                label="Available Days"
                value={days}
                onChange={(event) => setDays(event.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup value={days} row>
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Monday"
                  control={<Checkbox checked={days.includes("Monday")} />}
                  label="Monday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Tuesday"
                  control={<Checkbox checked={days.includes("Tuesday")} />}
                  label="Tuesday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Wednesday"
                  control={<Checkbox checked={days.includes("Wednesday")} />}
                  label="Wednesday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Thursday"
                  control={<Checkbox checked={days.includes("Thursday")} />}
                  label="Thursday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Friday"
                  control={<Checkbox checked={days.includes("Friday")} />}
                  label="Friday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Saturday"
                  control={<Checkbox checked={days.includes("Saturday")} />}
                  label="Saturday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Sunday"
                  control={<Checkbox checked={days.includes("Sunday")} />}
                  label="Sunday"
                />
              </FormGroup>
              <FormHelperText error>{formError.days}</FormHelperText>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleReset}
                variant="contained"
                fullWidth
                color="error"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }