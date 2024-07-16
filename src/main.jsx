import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './styles/app.css';
import { createContext } from 'react';


export const server = "http://localhost:4000/api/todos";
export const Context = createContext({ authenticated: false });
const Wrap = () => {
 const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ authenticated,setAuthenticated,user, setUser }}>
      <App />
    </Context.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Wrap />
  </React.StrictMode>,
  document.getElementById('root')
);
