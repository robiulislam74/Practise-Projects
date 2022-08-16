import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import DeleteIcon from '@mui/icons-material/Delete';
import { BiEditAlt } from 'react-icons/bi';
import { Modal,Typography,Box } from '@mui/material';
import { getDatabase, ref, onValue,update, remove} from "firebase/database";


const ShowInfo = (props) => {
    const db = getDatabase();
    const [ users,setUsers ] = useState([]);
    const [ deleteData,setDeleteData ] = useState(false)
    const [ rltUpdate,setRltUpdate ] = useState(false)
    const [ open,setOpen ] = useState(false)
    const [ updateData,setUpdateData ] = useState('')
    

  useEffect(()=>{
    const userArry = [];
    const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            snapshot.forEach((items)=>{ 
                userArry.push({
                    id:items.key,
                    name:items.val().name,
                    details:items.val().details
                })
            })
            setUsers(userArry)
        });

  },[props.data,deleteData,rltUpdate])

const deleteDataHandler= (info)=>{
    remove(ref(db, 'users/'+info.id))
    setDeleteData(!deleteData)
}

const updateDataHandler = (info)=>{
  update(ref(db, 'users/'+info.id),{
    details: updateData,  
  })
  setRltUpdate(!rltUpdate)
  setOpen(false)
}

const editBtnHandler = ()=>{
  setOpen(true)
}

const handleClose = ()=>{
  setOpen(false)
}

const cancelHandler = ()=>{
  setOpen(false)
}

  return (
    <div className='informationBox'>
        <h1>Your Informations</h1>

        {users.map((users)=>(
             <div className='card'>
             <CardContent>
                 <h3>{users.name}</h3>
                 <p> {users.details}</p>
                 <DeleteIcon onClick={()=>deleteDataHandler(users)}  className='deleteIcon'/>
                 <BiEditAlt onClick={editBtnHandler} className='editIcon' />
              </CardContent>

              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <Box className='modalStyle'>
                      <h3>Update Your Data</h3>
                      <p>Edit your details and hit the update Button:</p>
                      <input placeholder={users.details} onChange={(e)=> setUpdateData(e.target.value)}/>
                      <button onClick={()=> updateDataHandler(users)}>Update</button>
                      <button onClick={cancelHandler}>Cancel</button>
                  </Box>
              </Modal>
             </div>
    
        ))}


    </div>
    
  )
}

export default ShowInfo