import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, redirect  } from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Cars from './Pages/Cars';
import PageNotFound from './Pages/PageNotFound';
import ProtectedRoute from './Utility/ProtectedRoute';
import { AuthContext } from './Utility/AuthContext';
import { ToastContainer } from 'react-toastify';
import Axios from './services/dataservice.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {

  const [token, setToken] = useState("")
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = (token) => {
    if (token) {
      return Axios.get('/user-data', { headers: { "Authorization": "Bearer " + token } })
        .then(resp => { 
            return setIsLoggedIn(true);
        })
        .catch(err => {
            return setIsLoggedIn(false);
        })
    }
    return;
}

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    getUserData(token);
  }, [token])

  useEffect(() => {
    if (!isLoggedIn) {
      setToken("");
      setName("");
      setRole(0);
      localStorage.removeItem('token');
    }
  }, [isLoggedIn])

  return (
      <div>
        <ToastContainer position='top-center' theme='colored'/>
        <BrowserRouter>
        
          <AuthContext.Provider value={{token, setToken, name, setName, role, setRole, isLoggedIn, setIsLoggedIn}}>
            <Routes>
              <Route path='' element={<Home/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/cars' element={
                <ProtectedRoute>
                  <Cars/>
                </ProtectedRoute>
              }/>
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>

  )
}

root.render(<App/>);
//https://levelup.gitconnected.com/implement-authentication-and-protect-routes-in-react-135a60b1e16f
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
