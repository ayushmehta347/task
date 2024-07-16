
import {Route,Routes, BrowserRouter as Router} from "react-router-dom";
import { Context } from "./main";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Todo from "./pages/Todo";
import { useContext, useEffect } from "react";
import { server } from "./main";
import axios from "axios";

function App() {
 const {setuser,setauthenticated}=useContext(Context);
// useEffect(()=>{
// axios.get(`${server}/me`,
//  {withCredentials: true}).then(res=>{
//     setuser(res.data.user);
//     setauthenticated(true)
//  }).catch((error)=>{
//   setuser({});
//   setauthenticated(false)
//  }
//  )
 
// },[])

  return (
  <Router>
    <Header/>
        <Routes>
           <Route path="/" element={<Signup/>} /> 
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/todo" element={<Todo/>} />
        </Routes>
        <Toaster/>

  </Router>
  );
}

export default App
