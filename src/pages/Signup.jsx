import React, { useState,useContext } from 'react'
import{Link} from "react-router-dom"
import axios from "axios";
import {server} from '../main';
import { Context } from "../main";


const Signup=()=> {

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setconfirmPassword]=useState("")
    const {authenticated,setauthenticated}=useContext(Context);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitHandler=async(e)=>{
        e.preventDefault();
    try {
        const response = await axios.post(`${server}/signup`, {
            name,
            email,
            password,
            confirmPassword
        });
        
        const { token, message } = response.data;
        localStorage.setItem('token', token);
        setSuccessMessage(message);
        setErrorMessage('');
        setauthenticated(true)
        
    }
    catch(error){
       
        if ( error.response.data.message === 'Email already in use') {
        setErrorMessage('Email already exists');
        setSuccessMessage('');
       setauthenticated(false);
      } 
      else if( error.response.data.message === 'Passwords do not match') {
        setErrorMessage('Passwords do not match')
        setSuccessMessage('');
         setauthenticated(false);
      }
    }
   
    }

  return (
    <div className='container'>
      <h1>Create Account</h1>
        <section>
         
      <form onSubmit={submitHandler}>
                <input value={name}
                onChange={(e)=>setName(e.target.value)}
                 type="text" className='input'
                  placeholder="Name" required/>

                <input value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email" className='input' 
                placeholder="Email" required/>


                <input value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                type="password"  className='input'
                 placeholder="password" required/>

                <input value={confirmPassword}
                onChange={(e)=>setconfirmPassword(e.target.value)} 
                type="password"  className='input' 
                placeholder=" Confirm password" required/>
                {errorMessage && <p >{errorMessage}</p>}
                 {successMessage && <p >{successMessage}</p>}
                <button type="submit" >Sign Up</button>

                <h3>OR</h3>
                <Link to="/login"><h3>LogIn</h3></Link>

            </form>
            </section>
    </div>
  )
}

export default Signup
