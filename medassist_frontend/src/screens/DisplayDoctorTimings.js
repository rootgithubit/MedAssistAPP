import { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  FormLabel,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  Avatar,
  FormHelperText,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { getData, photoURL, postData } from "../Services/FetchDjangoServices";
import MaterialTable from "@material-table/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment/moment";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: "#74b9ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "70%",
    height: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",
  },
  // rootcontainer: {
  //   width: "auto",
  //   height: "auto",
  //   // background: "#74b9ff",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // rootbox: {
  //   width: 700,
  //   height: 550,
  //   background: "#ffff",
  //   borderRadius: 10,
  //   padding: "1%",
  // },
}));
export default function DisplayAllTimings() {
  const [timingList, setTimingList] = useState([]);
  const [open, setOpen] = useState(false);
  var classes = useStyles();
  /**************************** Timing Interface ************************************/
  const [doctorId, setDoctorId] = useState("");
  const [timingId, setTimingId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState({});
  const handleEndTime = (event) => {
    //var t =(moment(new Date(event)).format("hh:mm A"));
    setEndTime(event)
  };
  const handlestartTime = (event) => {
   // var t =(moment(new Date(event)).format("hh:mm A"));
    setStartTime(event)
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
    setStartTime("");
    setEndTime("");
    setStatus("");
  };
  const handleDays = (event) => {
    const { value, checked } = event.target;
     
    if (checked) {
      setDays([...days, value]);
    } else {
      setDays(days.filter((event) => event !== value));
    }
  };
  const handleSubmit = async () => {
    if (!isError()) {
      // var body={'doctorid':doctorId,'starttimings':startTime,'endtimings':endTime,'days':days,'status':status}
    
      var formData = new FormData();
      formData.append("id", timingId);
      formData.append("doctor", doctorId);
      formData.append("starttimings", moment(new Date(startTime)).format("hh:mm A"));
      formData.append("endtimings", moment(new Date(endTime)).format("hh:mm A"));
      formData.append("days", days);
      formData.append("status", status);

      var result = await postData("edittimings", formData);
      if (result.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        });
        fetchAllTiming();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };
  const fetchAllTiming = async () => {
    var result = await getData("dtiminglist");
     
    setTimingList(result);
  };
  useEffect(function () {
    fetchAllTiming();
  }, []);
  const handleEdit = (rowData) => {
    setTimingId(rowData.id);
    console.log("DATEEEEE",new Date('01-jan-2000 '+rowData.endtimings))

    setEndTime(new Date('01-jan-2000 '+rowData.endtimings));
    setStartTime(new Date('01-jan-2000 '+rowData.starttimings));
    setDoctorId(rowData.doctor.id);
    setDays(rowData.days.split(","));
    setStatus(rowData.status);
    setOpen(true);
  };
  const handleDelete = async (rowData) => {
    Swal.fire({
      title: `Do u Want to delete Dr.${rowData.doctor.doctorname}'s Session Timings`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData("deletetimings", { id: rowData.id });
        if (result.status) {
          Swal.fire(
            `${rowData.doctor.doctorname}'s session Deleted Successfully`,
            "",
            "success"
          );
          fetchAllTiming();
        } else {
          Swal.fire("Server Error", "", "error");
        }
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showTiming = () => {
    return (
      <div className={classes.rootcontainer}>
        <div className={classes.rootbox}>
          <Grid item xs={12}>
            <Heading icon="doctor.png" text="Timing Edit" />
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
                disabled
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
                value={dayjs(startTime)}
              />
            </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
            <LocalizationProvider
            value={dayjs(endTime)}
              dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                error={formError.endtime}
                helperText={formError.endtime}
                label="End Time"
                onFocus={() => handleError("", "endtime")}
                onChange={handleEndTime}
                value={dayjs(endTime)}
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
                    checked={status == "Available" ? true : false}
                  />
                  <FormControlLabel
                    error={formError.status}
                    onFocus={() => handleError("", "status")}
                    onChange={(event) => setStatus(event.target.value)}
                    control={<Radio />}
                    value="Not Available"
                    label="Not Available"
                    hecked={status == "Not Available" ? true : false}
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
                  control={<Checkbox checked={days.includes('Monday')} />}
                  label="Monday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Tuesday"
                  control={<Checkbox checked={days.includes('Tuesday')} />}
                  label="Tuesday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Wednesday"
                  control={<Checkbox  checked={days.includes('Wednesday')}/>}
                  label="Wednesday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Thrusday"
                  control={<Checkbox  checked={days.includes('Thrusday')}/>}
                  label="Thursday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Friday"
                  control={<Checkbox checked={days.includes('Friday')} />}
                  label="Friday"
                />
                
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Saturday"
                  control={<Checkbox checked={days.includes('Saturday')} />}
                  label="Saturday"
                />
                <FormControlLabel
                  onFocus={() => handleError("", "days")}
                  error={formError.days}
                  onChange={handleDays}
                  value="Sunday"
                  control={<Checkbox checked={days.includes('Sunday')}  />}
                  label="Sunday"
                />
              </FormGroup>
              <FormHelperText error>{formError.days}</FormHelperText>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  const showTimingDetails = () => {
    return (
      <div>
        <Dialog open={open} keepMounted onClose={handleClose} maxWidth={"md"}>
          <DialogContent>{showTiming()}</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            >
              Edit Data
            </Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  function ShowTimingList() {
    return (
      <MaterialTable
        title="Doctors Timings"
        columns={[
          {
            title: "Doctor",
            render: (rowData) => (
              <div>
                <div>
                  {rowData.id}/{rowData.doctor.doctorname}
                </div>
              </div>
            ),
          },
          { title: "Start Time", field: "starttimings" },
          { title: "End Time", field: "endtimings" },
          { title: "Available Days", field: "days" },
          { title: "Avalibility Status", field: "status" },
        ]}
        data={timingList}
        options={{
          paging: true,
          pageSize: 3,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [3, 5, 10],
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Timing",
            onClick: (event, rowData) => handleEdit(rowData),
          },
          (rowData) => ({
            icon: "delete",
            tooltip: "Delete Timing",
            onClick: (event, rowData) => handleDelete(rowData),
          }),
        ]}
      />
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.box}>{ShowTimingList()}</div>
      {showTimingDetails()}
    </div>
  );
}