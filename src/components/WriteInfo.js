import React, { useState } from 'react'
import { Button } from '@mui/material'
import { getDatabase, ref, set, push } from "firebase/database";

const WriteInfo = (props) => {
const db = getDatabase();
const [ name,setName ] = useState('')
const [ details,setDetails ] = useState('')
const [ data,setData ] = useState(false)



const dataSubmitHandler = () =>{
  set(push(ref(db, 'users/')), {
    name:name,
    details:details
  });
  setData(true)
  props.dataShow(data)
}


  return (
    <> 
       <div className='boxUp'>
       <input className='nameBox' placeholder='Your Name:' onChange={(e)=> setName(e.target.value)}/>
        <input className='infoBox' placeholder='Personal Details here:' onChange={(e)=> setDetails(e.target.value)}/> 

        <Button onClick={dataSubmitHandler} className='btn' variant="contained" disableElevation>
            Submit
        </Button>

        </div> 
    </>
  )
}

export default WriteInfo