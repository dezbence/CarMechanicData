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
import { AuthContext, UserModeContext } from './Utility/Contexts.js';
import { ToastContainer } from 'react-toastify';
import Axios from './services/dataservice.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {

  const [token, setToken] = useState("")
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const logout = () => {
    setToken("");
    setName("");
    setRole(0);
    localStorage.removeItem('token');
  };

  const getUserData = (t) => {
    if (t) {
      return Axios.get('/user-data', { headers: { "Authorization": "Bearer " + t } })
        .then(resp => {
          console.log("seta data");
          console.log(resp.data.data);
            setToken(localStorage.getItem('token'));
            setName(resp.data.data.name);
            setRole(resp.data.data.role);
            return;
        })
        .catch(err => {
            return logout();
        })
    }
    return;
}

  useEffect(() => {
    getUserData(localStorage.getItem('token'));
  }, [])


      // setToken("");
      // setName("");
      // setRole(0);
      // localStorage.removeItem('token');


  return (
      <div>
        <ToastContainer position='top-center' theme='colored'/>
        <BrowserRouter>
        
          <AuthContext.Provider value={{token, setToken, name, setName, role, setRole, logout}}>
            <UserModeContext.Provider value={{editMode, setEditMode}}>
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
            </UserModeContext.Provider>
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
