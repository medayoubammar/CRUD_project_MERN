import React, {useState} from 'react';
import axios from "axios";
import Admin from './Admin';

export default function Login() {
    const [login,setLogin] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useState(0);

    const checkLogin = (e) => {
        e.preventDefault();
        console.log(login,password);
        axios.get(`http://127.0.0.1:3002/login/${login}/${password}`)
        .then((resultas)=>{
            console.log(resultas);
         if(resultas.data !== false) setAuth(1)
         else setAuth(0)
        })
        .catch((error)=>{
            console.log(error);
            setAuth(0)
        })


    }
  return (
   
    auth !== 0 ? <>
    <form onSubmit={(e)=>checkLogin(e)} className="m-5">
    <div>
<div className="mb-3 row">
<label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
<div className="col-sm-10">
  <input type="text"  className="form-control" id="staticEmail" 
  onChange={(e)=>setLogin(e.target.value)}
   />
</div>
</div>
<div className="mb-3 row">
<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
<div className="col-sm-10">
  <input type="password" className="form-control" id="inputPassword"
  onChange={(e)=>setPassword(e.target.value)} />
</div>
</div>
<div className="mb-3 row">
<button className='btn btn-primary'>Connexion</button>
</div>
</div>


</form>
    </> : <Admin />
   
  )
}
