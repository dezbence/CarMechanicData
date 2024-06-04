import '../App.css';
import NavBar from '../Components/NavBar';
import {ReactComponent as Mailsvg} from '../assets/mail.svg';
import {ReactComponent as Locksvg} from '../assets/lock.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../Utility/Contexts.js';
import Axios from '../services/dataservice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({email: "", password: ""});

  const login = async (data) => {
    return Axios.post('/login', data)
        .then(resp => {
            localStorage.setItem("token", resp.data.data.token);
            auth.setToken(resp.data.data.token);
            auth.setName(resp.data.data.name);
            auth.setRole(resp.data.data.role);
            navigate('/')
            return toast.success('Successful login!');
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
            <Mailsvg className='svg'/>
            <input onChange={(e) => loginData.email = e.target.value} className='auth-input' type='text' placeholder='Email'></input>
          </div>
          <div className='input-container'>
            <Locksvg className='svg'/>
            <input onChange={(e) => loginData.password = e.target.value} className='auth-input' type='text' placeholder='Password'></input>
          </div>
          
          <button onClick={(e) => login(loginData)} className='auth-button'>Login</button>
        
      </div>
    </div>
  );
}

export default Login;