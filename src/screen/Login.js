import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
export default function Login() { 




  const [credentials, setcredentials] = useState({
    
    password: "",
    email: ""
  }); 
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        
        password: credentials.password,
        email: credentials.email
      })
    });
    const json = await response.json();
    console.log(json);
    if(!json.success){
        alert('enter valid credentials')
    }
    if(json.success){
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  }




  return (<> 
    <div className='container'>
       <form onSubmit={handleSubmit}>
 
  
  <div className="col-md-4">
    <label htmlFor="validationCustomUsername" className="form-label">Email</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input type="Email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" name='email' value={credentials.email} onChange={onChange} required/>
      <div className="invalid-feedback">
        Please choose a Email.
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Password</label>
    <input type="password" className="form-control" id="validationCustom03" name='password' value={credentials.password} onChange={onChange} required/>
    <div className="invalid-feedback">
      Please provide a valid Password.
    </div>
  </div>
  
  <div className="col-12">
    <button className="btn btn-success" type="submit">Login</button>
    <Link to="/signup" className="m-3 btn btn-danger">
            New User
          </Link>
  </div>
  
 
  
</form>
    </div> </>
  )
}
