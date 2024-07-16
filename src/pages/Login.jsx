import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { server } from '../main';
import { Context } from "../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);
   const {authenticated,setAuthenticated}=useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/signin`, {
        email, password
      });

      const { token, message } = response.data;
        localStorage.setItem('token', token);
        
        setSuccessMessage(message);
       setErrorMessage('');
      setSuccess(true);
      navigate('/todo'); 
      setAuthenticated(true);

    } catch (error) {
      if (error.response.data.message === 'User not found') {
        setErrorMessage('User not found');
        setSuccessMessage('');
        setAuthenticated(false);
      } else if (error.response.data.message === 'Invalid Email or password') {
        setErrorMessage('Invalid Email or password');
        setSuccessMessage('');
        setAuthenticated(false);
      }
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <section>
        <form onSubmit={submitHandler}>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" className='input'
            placeholder="Email" required />

          <input value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" className='input'
            placeholder="password" required />
          <button type="submit">Login</button>

          {errorMessage && <p>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
          <h3>OR</h3>
          <Link to="/signup"><h3>SignUp</h3></Link>
        </form>
      </section>
    </div>
  )
}

export default Login;
