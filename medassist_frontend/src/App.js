import DoctorInterface from "./screens/DoctorInterface";
import DisplayAllDoctors from "./screens/DisplayAllDoctors";
import Timinginterface from "./screens/TimingInterface";
import DisplayDoctorTimings from "./screens/DisplayDoctorTimings";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import QuestionInterface from "./screens/QuestionInterface";
import UserRegistration from "./screens/UserRegistration";
import QueryQuestions from "./screens/QueryQuestionsInterface";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import DoctorLogin from "./screens/DoctorLogin";
import PatientLogin from "./screens/PatientLogin";
import DoctorDashboard from "./screens/DoctorDashboard";
import PatientDashboard from "./screens/PatientDashboard";
import ListofDoctors from "./screens/ListofDoctors";

function App() {
  return (
    <div>
      <Router>
        <Routes>
         
          <Route element={<DisplayDoctorTimings/>} path="/displayalltimings"/>\
          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>
          <Route element={<DoctorLogin/>} path="/doctorlogin/"/>
          <Route element={<UserRegistration/>} path="/userregistration/"/>
          <Route element={<PatientLogin/>} path="/patientlogin/"/>
          <Route element={<PatientDashboard/>} path="/patientdashboard/*"/>
          <Route element={<DoctorDashboard/>} path="/doctordashboard/*"/>
          <Route element={<ListofDoctors/>} path="/listofdoctors/*"/>

          </Routes>
      </Router>
    </div>
    
  );
}

export default App;
