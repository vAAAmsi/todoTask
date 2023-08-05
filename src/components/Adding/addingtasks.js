import { Button, TextField, Tooltip } from "@mui/material";
import { useState,React, useEffect } from "react";
import './addingtasks.css'
import db from '../../Firebse/firebase'
import { collection, doc, setDoc,addDoc,docRef } from "firebase/firestore";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';  

function Tasks(){
      useEffect(() => {

      },[])
    var[w,setW]=useState()
    var[x, setX] = useState(dayjs());
    var[y,setY]= useState(dayjs());
    var[z,setZ]=useState()
    const navigate=useNavigate();
   
    const name=(e)=>{
        setW(e.target.value)
    }
    const time=(e)=>{
        
        const d=new Date(e.$d)
        const t=d.getHours()+':'+d.getMinutes()
        setX(e.$d)
    }
    const date=(e)=>{
        const d=new Date(e.$d)
        setY(e.$d)
    }
    const desc=(e)=>{
       setZ(e.target.value)
    }
    

   const handleClick=async()=>{     
    const doct=await doc(collection(db, "class"))
    
    try{
        await setDoc(doct,{
            name:w,
                time:new Date(x).getHours()+`:${new Date(x).getMinutes()<10?'0':''}`+new Date(x).getMinutes(),
                date:new Date(y).getDate()+`/${new Date(y).getMonth()<9?'0':''}${new Date(y).getMonth()+1}/`+new Date(y).getFullYear(),
                desc:z,
                id:doct.id
        })
        await  Swal.fire(
            {
                icon: 'success',
                title: 'Success',
                text: 'Successsfully added the Task',
                
            }
          )
         navigate('/')
    }catch(error){
        await  Swal.fire(
            {
                icon: 'error',
                title: 'Oops...',       
                text: 'Please fill all the fields',
                
            })
    }
      console.log("added")
    
    };
    
    
   
    return(
        <div> 
            <div className="addpage_nav">
            <Tooltip title='Go back to dashboard' >
            <div>< KeyboardBackspaceIcon style={{fontSize:'35px',cursor:'pointer',color:'white'}} onClick={()=>navigate('/')}/></div>
            </Tooltip>
            <div className="addpage_center">ADD A TASK</div>
            <div></div>
           </div>
           <div className="Addmaincontainer">
            <div className="AddContainer">
                <div className="text">FILL THE DETAILS OF THE TASK</div>
               <div className="textfileds">
                <div className="innertextfield">
                <div className="text1"><TextField onChange={name} className="name" label='NAME OF THE TASK'></TextField></div>


                <div className="text1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="DD/MM/YYYY"
          value={y}
          onChange={date}
          renderInput={(params) => <TextField {...params} />}
        /> </Stack>
        </LocalizationProvider>
                </div>
                <div className="text1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
                <TimePicker
          label="Time"
          value={x}
          onChange={time}
          renderInput={(params) => <TextField {...params} />}
        /> </Stack>
        </LocalizationProvider>
                </div>



                <div className="text1"><TextField onChange={desc} className="desc" label='DESCRIPTION'></TextField></div>
                
               </div>
                </div>
              

            </div>
           </div>
           <div className="addbutton"> <div><Button style={{backgroundColor:'red',color:'white'}} onClick={handleClick}  >ADD</Button></div></div>
           <div></div>
           

        </div>
    )
}
export default Tasks;