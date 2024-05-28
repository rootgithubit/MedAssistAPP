import { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from "react-redux";
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import { IconButton } from "@mui/material";
import DoctorCard from "../Component/DoctorCard";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "91vh",

    display: "flex",
    justifyContent: "center",

  },
  box: {
    width: "auto",
    minHeight: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",

  },
}));
export default function ListofDoctors(props) {
  var classes = useStyles()
  const [doctor, setDoctor] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [temp, setTemp] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(-1)
  var dispatch = useDispatch()
  var navigate = useNavigate()
  
  const fetchAllDoctors = async () => {
    var result = await getData('doctorlist')
    setDoctors(result)
    setTemp(result)
  }
  useEffect(function () {
    fetchAllDoctors()

  }, [])

  const searchDoctor = () => {
    if (props.pattern.length != 0) {
      const data = doctors.filter((item) => {
        return item.doctorname.includes(props.pattern)
      })
      setDoctors(data)
    }
    else { setDoctors(temp) }
  }
  useEffect(function () {
    searchDoctor()
  }, [props])

  const showDoctors = () => {
    return doctors.map((item, i) => {
      return <DoctorCard setDoctor={setDoctor} data={item} i={i} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />

    })

  }
  const handleDoctor = () => {
    if (selectedDoctor == -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pls Select Doctor...',
        toast: true

      })
    }
    else {
      props.setStatus(false)
      console.log("DOCTORRR", doctor)
      dispatch({ type: 'ADD_DOCTOR', payload: [doctor] })
      navigate('/patientdashboard/selecteddoctor')
    }
  }
  return (<div className={classes.container}>
    <div className={classes.box}>
      <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleDoctor} style={{ marginLeft: 'auto', background: "#22a6b3", width: 75, height: 75 }} >
          <ArrowForwardIos style={{ color: '#FFF', fontSize: 36, fontWeight: 'bold' }} />
        </IconButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
        {showDoctors()}
      </div>
    </div>
  </div>)

}