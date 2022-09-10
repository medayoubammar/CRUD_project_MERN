import React,{useState,useEffect} from 'react';
import axios from "axios";

export default function Admin() {
    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [age,setAge] = useState(null);
    const [allUsers,setAllUsers] = useState([]);

    const addUser = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:3002/add",
        {
            NAME : name,
            LASTNAME : lastName,
            AGE : age 
        })
        .then((resultas)=>{console.log(resultas)})
        .catch((error)=>{console.log(error)})
    }

    const getAllUsers = () => {
        axios.get("http://127.0.0.1:3002/getAllData")
        .then((resultas)=>{setAllUsers(resultas.data) })
        .catch((error)=>{console.log(error)})
    }

    const removeUser = (id) => {
        axios.delete(`http://127.0.0.1:3002/delete/${id}`)
        .then((resultas)=>{window.location.reload()})
        .catch((error)=>{console.log(error)})
    }

    useEffect(()=>{
        getAllUsers();
    },
    [allUsers])


  return (
    <div>
        <h1>WELCOME TO ADMIN SIDE </h1>
        <button className='btn btn-warning btn-sm'>Déconnexion</button>
        <div className='container d-flex justify-content-around'>

        <div className='border-end border-dark pe-3'>
        <h3 className='text-center' >Add new user</h3>
        <form onSubmit={(e)=>addUser(e)}>
            <label className='form-label'>Name : </label>
            <input onChange={(e)=>setName(e.target.value)} 
             className='form-control' type="text" />
            <label className='form-label'>LastName :</label>
            <input onChange={(e)=>setLastName(e.target.value)} 
             className='form-control' type="text" />
            <label className='form-label'>Age :</label>
            <input onChange={(e)=>setAge(e.target.value)} 
            className='form-control' type="number"/>
            <button className='btn btn-success mt-3'>
                Add new user</button>
        </form>
        </div>
        <div className='border-end border-dark pe-3'>
            <h3 className='text-center'>Delete user</h3>
            <ul>
                {allUsers && allUsers.map((item)=> (
                    <>
                    <li onClick={()=>removeUser(item._id)} className='btn btn-link' key={item._id}>
                        {item.NAME+" "+item.LASTNAME}</li>
                    <br ></br>
                    </>
                    
                ))}
            </ul>
        </div>
        <div>
            <h3 className='text-center'> Update user</h3>
            <ul>
                {allUsers && allUsers.map((item)=> (
                    <li key={item._id}>{item.NAME+" "+item.LASTNAME}</li>
                ))}
            </ul>
            </div>

        </div>
    </div>
  )
}
