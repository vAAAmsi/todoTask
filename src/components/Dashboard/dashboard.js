import React from "react";
// import './stylings.css'
import './dashboard.css'
import TextField from '@mui/material/TextField';
import { Button, Tooltip } from "@mui/material";
import { useNavigate,route } from "react-router-dom";
import db from'../../Firebse/firebase'
import { collection,deleteDoc,getDocs,doc ,query,orderBy} from "firebase/firestore";
import { useState,useEffect } from "react";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { InputAdornment } from "@mui/material";
function Page(){
    const router=useNavigate();
    const[data,setdata]=useState([])
    const [initsearch,setInitsearch] = useState('')
    const[search,setSearch]=useState("")

    const option=(e)=>{
      setInitsearch(e.target.value)
      
    }
    useEffect(()=>{ 
        getdata()
    },[])
    
    async function getdata(){
    var d=[]
  const querySnapshot = await getDocs(collection(db, "class"));
  
  querySnapshot.forEach((doc) => {
    d=d.concat(doc.data());
  });
  setdata(d)

    }
    
   function handle(){
    router('/addingtasks')
   }
   const viewbutton=(l)=>{
    router('/view',{state:l})
    
  }
  
  
    return(
        <div className="main">
           <div className="navbar">
           <Tooltip title="Show Completed Tasks">
           <div>
              <AssignmentTurnedInIcon style={{fontSize:"35px",color:'white',marginLeft:'10px',paddingTop:'10px',cursor:'pointer'}}
              onClick={()=>router('/completedtasks')}
              />
            </div>
           </Tooltip>
            <div className="navbarcenter">TODO TASKS</div>
            <div></div>
           </div>
           <div className="SearchSection">
            <div className="Sub">
               
                <TextField className="Serach" onChange={option} value={initsearch}   label="Search" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                       <Button style={{color:'white',backgroundColor:'red'}} onClick={() => setSearch(initsearch)} >search</Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <div >
                  <Button style={{backgroundColor:'red',color:'white'}}  onClick={handle}>ADD A TASK</Button>
                </div>
            </div>
           
                
           </div>
           <div className="front_endmain">
           {
            data.length !==0&&
          data.filter((l) =>{
            if(l.name!==undefined){
              return (
           
                l.name.toLowerCase().includes(search.toLowerCase())
              )
            }
            
          }).map((l,index)=>{
            
            return(
              
            <div key={index} className="front_end">
                   
           
                   
                <div  className="front_end1">

                <div className="fname">NAME OF THE TASK: {l.name}</div>

                <div className="ftime">TIME:{l.time} </div>

                <div className="fdate">DATE: {l.date}</div>

                <div className="fdesc">DESCRIPTION: {l.desc}</div> </div>

                <div className="fbutton"> 
                   <Button style={{backgroundColor:'red',color:'white'}} onClick={()=>viewbutton(l)} >View</Button>
                </div>  

            </div> )
          })
        }
           </div>
           

        </div>
    )
}
export default Page;