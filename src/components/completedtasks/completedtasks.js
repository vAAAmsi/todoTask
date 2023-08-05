import { useState,useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { TextField,Button, Tooltip ,InputAdornment} from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import './completedtasks.css'
import { collection, deleteDoc,doc, getDocs } from "firebase/firestore";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import db from "../../Firebse/firebase";
import Swal from "sweetalert2";
function Completed(){
   const navigate=useNavigate()
   const [data,setdata]=useState([])
   const [initsearch,setInitsearch] = useState('')
   const [search,setSearch]=useState('')
   
   useEffect(()=>{ 
    getdata()

},[])
   async function getdata(){
    var d=[]
  const querySnapshot = await getDocs(collection(db, "completedtasks"));
  querySnapshot.forEach((doc) => {
    d=d.concat(doc.data());
  });
  setdata(d)
    }
const DeleteCo=async(i)=>{
        await deleteDoc(doc(db,"completedtasks",i));
        getdata();
    
    await Swal.fire({
        icon:"success",
        title:'success',
        text:'Successfully Deleted'
    })

}
  
    return(
        <div>
            
           <div className="completednavbar">
                <Tooltip title="Go back to dashboard">
                <div><KeyboardBackspaceIcon style={{fontSize:'35px',cursor:'pointer',color:'white'}} onClick={()=>navigate('/')}/></div>
                </Tooltip>
                <div className="completednavbarcenter">COMPLETED TASKS</div>
                <div></div>
           </div>
           <div className="completedsearch">
            <TextField className="completedsearchbar" label="search" value={initsearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                 <Button style={{color:'white',backgroundColor:'red'}} onClick={() => setSearch(initsearch)} >search</Button>
                </InputAdornment>
              ),
            }}
            onChange={(e)=>setInitsearch(e.target.value)}
            />
           </div>
            <div className="completedfrontendmain">
              {
                data.length!=0&&data.filter((i)=>{
                    if(i.name!==undefined){
                        return (
                     
                          i.name.toLowerCase().includes(search.toLowerCase())
                        )
                      }
                })
                
                .map((i,index)=>{
                    return(
                        <div key={index} className="completedfrontend">
                    
                        <div  className="front_end1">
        
                        <div className="completedname">NAME OF THE TASK:{i.name} </div>
                        <div className="completedtime"><AccessTimeFilledIcon style={{fontSize:'30px'}}/> {i.time} </div>
                        <div className="completeddate"><CalendarTodayIcon style={{fontSize:'30px'}}/> {i.date} </div>
                        <div className="completeddesc">DESCRIPTION:{i.desc} </div>
                        <div className="completeddate">Status: Completed <VerifiedIcon /></div>
                        <div className="completedButton">
                        <Button style={{backgroundColor:'red',color:'white'}}
                           onClick={()=>DeleteCo(i.id)}
                         >Delete</Button>
                        </div>
                        </div>
                        </div>
                    )
                })
              }
            </div>

           
        </div>
    )
}
export default Completed;