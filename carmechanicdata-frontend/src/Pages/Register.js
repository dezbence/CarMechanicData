import '../App.css';
import NavBar from '../Components/NavBar';
import {ReactComponent as Mailsvg} from '../assets/mail.svg';
import {ReactComponent as Locksvg} from '../assets/lock.svg';
import {ReactComponent as Personsvg} from '../assets/person.svg';
import Axios from '../services/dataservice.js';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

  const [registerData, setRegisterData] = useState({name: "", email: "", password: "", confirm_password: "", role: 0});

  const register = (data) => {
    return Axios.post('/register', data)
        .then(resp => {
          console.log(registerData);
          console.log(resp.data); 
          return toast.success("Successful register!")
           
        })
        .catch(err => {
            return toast.error(err.response.data.data);
        })
}

  return (
    
    <div>
      <NavBar/>
      <div className="auth-container">
          <div className='input-container'>
            <Personsvg className='svg person'/>
            <input onChange={(e) => registerData.name = e.target.value} className='auth-input' type='text' placeholder='Name'></input>
          </div>
          <div className='input-container'>
            <Mailsvg className='svg'/>
            <input onChange={(e) => registerData.email = e.target.value} className='auth-input' type='text' placeholder='Email'></input>
          </div>
          <div className='input-container'>
            <Locksvg className='svg'/>
            <input onChange={(e) => registerData.password = e.target.value} className='auth-input' type='text' placeholder='Password'></input>
          </div>
          <div className='input-container'>
            <Locksvg className='svg'/>
            <input onChange={(e) => registerData.confirm_password = e.target.value} className='auth-input' type='text' placeholder='Confirm password'></input>
          </div>
          <button onClick={(e) => register(registerData)} className='auth-button'>Register</button>
      </div>
    </div>
  );
}

export default Register;