import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UserModeContext } from '../Utility/Contexts.js';
import Axios from '../services/dataservice.js';
import { toast } from 'react-toastify';
import {ReactComponent as Personsvg} from '../assets/person.svg';

function NavBar() {

  const auth = useContext(AuthContext);
  const userMode = useContext(UserModeContext);
  const [smallMenu, setSmallMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSmallMenu = () => {
    setSmallMenu(!smallMenu);
  }

  const logout = (token) => {
    return Axios.post('/logout', '', { headers: { "Authorization": "Bearer " + token } })
        .then(resp => {
            localStorage.removeItem("token");
            auth.logout();
            navigate('/');
            return toast.success('Successful logout!');
        })
        .catch(err => {
            return toast.error(err.response.data.data);
        })
  }

  const logOutAllDevice = (token) => {
    return Axios.post('/logout-all-device', '', { headers: { "Authorization": "Bearer " + token } })
      .then(resp => {
        auth.logout();
        navigate('/');
        return toast.success('Successful logout on all device!');
      })
      .catch(err => {
        return toast.error(err.response.data.data);
      })
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/cars">Cars</Link>
        <h6>Name: {auth.name}, token: {auth.token} role: {auth.role}</h6>
      </div>
      <div className="navbar-right">
        {auth.token ? <div onMouseLeave={(e) => setSmallMenu(false)} className="person-icon">
          <Personsvg onClick={toggleSmallMenu}/>
            {smallMenu && 
              <div className='small-menu'>
                  <div onClick={(e) => userMode.setEditMode(!userMode.editMode)} className='small-menu-item'>Mode: {userMode.editMode ? 'Edit' : 'Readonly'}</div>
                  <div className='small-menu-item' onClick={(e) => logout(auth.token)}>logout</div>
                  <div className='small-menu-item small-menu-item-last' onClick={(e) => logOutAllDevice(auth.token)}>logout on all device</div>         
              </div>}
          </div> : <div className='navbar-right'>
            <Link className='link link-auth' to="/register">Register</Link>
            <div className='slash'>/</div>
            <Link className='link link-auth' to="/login">Login</Link>
          </div>}
      </div>
    </div>
    
  );
}

export default NavBar;