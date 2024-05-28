import { useEffect ,useState} from "react";
import {Grid,TextField,Button} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Swal from "sweetalert2";//using for show alert message
import { serverURL,getData,postData } from "../Services/FetchDjangoServices";
import icon from '../assets/patient.png'


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#22a6b3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box: {
        height: 'auto',
        width: '700px',
        backgroundColor: '#ecf0f1',
        borderRadius: '10px',
        padding: '10px'

    }
}));

export default function UserRegistration(props) {
    const [name,setName]=useState('')
    const [city,setCity]=useState('')
    const [emailid,setEmailId]=useState('')
    const [mobileno,setMobileNo]=useState('')
    const [dob,setDob]=useState('1/1/1')
    const [password,setPassword]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [formError,setFormError]=useState({})
    
   const handleError=(error,label)=>{
        setFormError((prev)=>({...prev,[label]:error}))
    }
    const isError=()=>{
       var error=false
        if(name.length==0)
        {
            handleError('Name is compulsury','name')
            error=true

        }
        if(city.length==0)
        {
            handleError('Enter City','city')
            error=true

        }
        if(emailid.length==0)
        {
            handleError('Enter EmailId','emailid')
            error=true

        }
        if(mobileno.length==0)
        {
            handleError('Plg Enter Mobileno','mobileno')
            error=true

        }
        if(dob.length==0)
        {
            handleError('Plg enter DOB','dob')
            error=true

        }
        if(password.length==0 || (/^[0-7]{8}$/).test(password))

        {
            handleError('Please Enter Password','password')
            error=true
           

        }
        
        return error
    }
        

    const handleReset=()=>{
        setName('')
        setCity('')
        setDob('1/1/1')
        setEmailId('')
        setMobileNo('')
        setPassword('')
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    function isPasswordValid(password) {
        return password.length >= 8;
      }

const handleSubmit=async()=>{
    if(!isError())
    {
        var body={
            
        'username':name,
        'city':city,
        'emailid':emailid,
        'dob':dob,
        'mobileno':mobileno,
        'password':password
     }

    var result = await postData('usersubmit',body);
    if (result.status)
    {
        Swal.fire({
            
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 5000
          })
    }
    else
    {
        Swal.fire({
            
            icon: 'error',
            title: result.message,
            showConfirmButton: false,
            timer: 5000
          })

    }
}
}

    var classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <div style={{display:'flex',padding:5,fontFamily:'Barlow Condensed',fontSize:24,fontWeight:'bold',color:'#000'}}>
        <img src={icon} width='40'/>
        <div style={{marginLeft:5}}>Patient Registration</div>
        

    </div>
                        
                    </Grid>
                    <Grid item xs={6} >
                    <TextField
                            fullWidth
                            value={name}
                            error={formError.name}
                            onFocus={()=>handleError('','name')}
                            onChange={(event)=>setName(event.target.value)}
                            label="Name"
                            helperText={formError.name}
                            
                    />
                    
                   </Grid>
                   <Grid item xs={6} >
                    <TextField
                            fullWidth
                            value={city}
                            error={formError.city}
                            onFocus={()=>handleError('','city')}
                            onChange={(event)=>setCity(event.target.value)}
                            label="City"
                            helperText={formError.city}
                    />
                   </Grid> 
                   <Grid item xs={6} >
                    <TextField
                            fullWidth
                            value={dob}
                            error={formError.dob}
                            onFocus={()=>handleError('','dob')}
                            onChange={(event)=>setDob(event.target.value)}
                            label="Date Of Birth"
                            type="Date"
                            helperText={formError.dob}
                    />
                   </Grid>
                   <Grid item xs={6} >
                    <TextField
                            fullWidth
                            value={emailid}
                            error={formError.emailid}
                            onFocus={()=>handleError('','emailid')}
                            onChange={(event)=>setEmailId(event.target.value)}
                            label="Email Id"
                            autoComplete="email"
                            autoFocus
                            helperText={formError.emailid}
                            
                    />
                   </Grid> 
                   <Grid item xs={6} >
                    <TextField
                            fullWidth
                            value={mobileno}
                            error={formError.mobileno}
                            onFocus={()=>handleError('','mobileno')}
                            onChange={(event)=>setMobileNo(event.target.value)}
                            label="Mobileno"
                            helperText={formError.mobileno}
                            
                    />
                   </Grid>
                   <Grid item xs={6}>
                   <TextField
                            fullWidth
                            value={password}
                            error={formError.password}
                            onFocus={()=>handleError('','password')}
                            onChange={handlePasswordChange}
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            helperText={formError.password}
                        />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                        style={{backgroundColor:'skyblue'}}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                       
                     </button>
                        {password.length > 0 && !isPasswordValid(password) && (
                        <p>Password must be at least 8 characters long.</p>
                    )}
                   </Grid>
                   <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={handleSubmit} style={{background:'green'}} >Submit</Button>
                        

                    </Grid>
                    
                </Grid>
            </div>
        </div>

    )
}



https://github.com/rootgithubit/MedAssist_APP.git