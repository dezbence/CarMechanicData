import { Link } from 'react-router-dom';
import '../App.css';
import { useContext } from 'react';
import { AuthContext } from '../Utility/AuthContext';
import Axios from '../services/dataservice.js';
import { toast } from 'react-toastify';

function NavBar() {

  const auth = useContext(AuthContext);

  const logout = (token) => {
    return Axios.post('/logout', '', { headers: { "Authorization": "Bearer " + token } })
        .then(resp => {
            localStorage.removeItem("token");
            auth.logout();
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
        return toast.success('Successful logout on all device!');
      })
      .catch(err => {
        return toast.error(err.response.data.data);
      })
  }

  return (
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/cars">Cars</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <h6>Name: {auth.name}, token: {auth.token} role: {auth.role}</h6>
      <h5 onClick={(e) => logout(auth.token)}>logout</h5>
      <h5 onClick={(e) => logOutAllDevice(auth.token)}>logout on all device</h5>

    </div>
  );
}

export default NavBar;