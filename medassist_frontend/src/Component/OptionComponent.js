import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";

const useStyles=makeStyles((theme)=>({
    container:
    {
        height:'100px',
        width:'900px',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        fontFamily: "kanit",
        
    },
    box:
    {
        height:'65px',
        width:'90px',
        
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        fontFamily: "kanit",
        borderRadius:10,
        background:'#D4E6F1'
       
    }
}))

export default function OptionComponent(props)

{  console.log("qqqqqqq",props?.options)
    var options=(props?.options).split(",")
  
    const [selectedDiv, setSelectedDiv] = useState(null);
    var classes=useStyles()
    const handleDivClick = (item,index) => {
        setSelectedDiv(index);
        props.setSelectedOption({index:index,value:item})
      };
   
      return (
        <div className={classes.container}>
          
          {options.map((item,index) => (
            <div
              key={index}
              className={classes.box}
              onClick={() => handleDivClick(item,index)}
              style={{
                backgroundColor: selectedDiv === index ? "#22a6b3" : "white",
              }}
            >
              <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',padding:2}}> 
              <div>{item}</div>
              <div>{index}</div>
              </div>
            </div>
        ))}
       </div>
      );
}