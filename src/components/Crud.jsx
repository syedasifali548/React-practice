import React, { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';
import './crud.css'
const Crud = () => {
    const blankuser = {
        "name":"",
        "email":"",
        "address":""
      }
   const[open,setOpen] = useState(false)
   const [userdata, setUserdata] = useState([]);
   const [action,setAction] = useState("Add")
   const [user, setUser] = useState(blankuser);
   const [editIndex, setEditIndex] = useState(null);

   const onOpenModal=()=>setOpen(true)
   const onCloseModal=()=>setOpen(false)
// Add user
   const addUser = () => {
    setUserdata([...userdata,user]);
    setUser(blankuser);
    onCloseModal();
  }
//   Edit User
const handleEdit=(index)=>{
    console.log("index",index);
    setAction('Edit')
    const selectedUser = userdata.find((x,i)=>i == index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
}
// update user 
const updateuser=()=>{
    const newuser = userdata.map((x,i)=>{
        if(i === editIndex){
            x = user;
        }
        return x
    });
    setUserdata(newuser);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();

}

//   Delete User
const handleDelete=(index)=>{
    const newUsers = userdata?.filter((x,i)=>{return i !== index})
    setUserdata(newUsers)
}
  return (
    <div className='container'>
    <div className="crud_flex">
    <h1>Crud App</h1>

    </div>
    <div className="toolbar">
    <button className='btn btn-p' onClick={onOpenModal}><PlusCircle size={16}></PlusCircle><span>Add</span></button>
    </div>
    <hr /> 
    <table className='table'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {userdata.length > 0 && userdata.map((user,index)=>(
        <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>
              <button className='btn ml2' onClick={() => handleEdit(index)}><Edit size={16}></Edit><span>Edit</span></button>
              <button className='btn ml2' onClick={() => handleDelete(index)}><Trash2 size={16} ></Trash2><span>Delete</span></button>
            </td>
          </tr>

    ))}
    </tbody>
  </table>
  <div>
  <Modal center open={open} onClose={onCloseModal}>

  <h2>User</h2>
  <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={user.name} onChange={(e)=>setUser({...user,"name":e.target.value})} />
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} onChange={(e)=>setUser({...user,"email":e.target.value})}/>
          <label htmlFor="">Address</label>
          <textarea name="" id="" value={user.address} onChange={(e)=>setUser({...user,"address":e.target.value})}></textarea>
         {action == "Add" && <button className='btn'onClick={()=>addUser()}>Submit</button>}
        {action =="Edit" && <button className='btn' onClick={()=>updateuser()} >Update</button>}
        </div>
  </Modal>
</div>

    
    </div>
  )
}

export default Crud