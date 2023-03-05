import { Navigate, useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button, Tooltip } from "@mui/material";
import db from "./firebase";
import { addDoc, collection, deleteDoc,doc, setDoc, updateDoc } from "firebase/firestore";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import Swal from "sweetalert2";
function Data(){
    let location=useLocation();
    var[data,setdata]=useState(location.state)
    const navigate=useNavigate()


    const handledelete=async(v)=>{
          try{
            console.log("delete id",v)
           await deleteDoc(doc(db,"class",v))
        //    await Swal.fire(
        //     {
        //         icon: 'success',
        //         title: 'Success',
        //         text: 'Successsfully deleted the Task',
        //     }
        //    );
           navigate('/')
          }catch(error){
            //   await Swal.fire({
            //     icon:"error",
            //     title:"Something went wrong",
            //   })
          }
    }
    // const updatehandle=async(v)=>{
    //      console.log("id",v)
    //      await updateDoc(doc(db,"class",v))


    // }
     const completeHandle=async(i,id)=>{
        //  console.log(i,id)
        const doct=await doc(collection(db,"completedtasks"))
        
        i.id=doct.id;
        
            try{
               i.id=doct.id
               console.log(i)
               await setDoc(doct,i)
                handledelete(id);
                await Swal.fire(
                {
                    icon:"success",
                    title:"success",
                    text:"completed"
                }
               );navigate('/')
            }catch(error){
                await Swal.fire(
                    {
                        icon:'error',
                        title:'error',
                        text:"something went wrong"
                    }
                )

            }
            }
    
    return(
        <div className="temp_container">
            <div className="detailsPrarentContainer">
                <div className="detailschildcontainer">
                <div className="view_details"> DETAILS OF THE TASK ARE BELOW:</div>
                <div className="smalldiv">
                <div className="viewname">NAME : {data.name}</div>
                <div className="viewtime"><  AccessTimeFilledIcon style={{fontSize:"40px"}}/>  {data.time}</div>
                <div className="viewdate"><CalendarTodayIcon style={{fontSize:"40px"}}/> {data.date}</div>
                <div className="viewdesc">DESCRIPTION: {data.desc}</div>
                
                 </div>
                  <div className="viewbutton">
                  <div className="mine"><Button style={{backgroundColor:'red',color:'white'}} onClick={()=>{navigate('/')}}>Back</Button></div>  
                  <Tooltip title='back'>
                  <div className="backicon" onClick={()=>navigate('/')}> <ArrowBackSharpIcon style={{fontSize:'40px',cursor:'pointer'}}/></div>
                  </Tooltip>
                  <div className="mine"><Button className="deletemui" onClick={()=>handledelete(data.id)} style={{backgroundColor:'red',color:'white'}}> delete The Task</Button></div>
                  <Tooltip title='Delete'>
                  <div className="deleteicon"><DeleteSharpIcon style={{fontSize:'40px',cursor:'pointer'}}
                        onClick={()=>handledelete(data.id)}
                  /></div>
                  </Tooltip>
                  <div className="mine"><Button style={{backgroundColor:'red',color:'white'}} onClick={()=>completeHandle(data,data.id)} >completed</Button></div>
                 <Tooltip title='completed'>
                 <div className="checkicon"><CheckSharpIcon style={{fontSize:'40px',cursor:'pointer'}}/></div> 
                 </Tooltip>
                  
                  
                  </div>
                </div>
            
            </div>
       
            

        </div>
    )
}
export default Data;
