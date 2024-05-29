import { useContext, useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';
import Axios from '../services/dataservice.js';
import { toast } from 'react-toastify';
import { AuthContext } from '../Utility/AuthContext';

function Cars() {

  const [searchFields, setSearchFields] = useState({brand: null, type: null, owner: null, license_number: null});
  const [cars, setCars] = useState();
  const auth = useContext(AuthContext);

  const searchCars = (data) => {
    return Axios.post('/search-cars', data, { headers: { "Authorization": "Bearer " + auth.token } })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
            return toast.error(err.response.data.data);
        })
  }

  return (
    <div className='cars-background'>
      <NavBar/>
      <div>
        <input onChange={(e) => searchFields.brand = e.target.value} id='brand' type='text' placeholder='Brand'></input>
        <input onChange={(e) => searchFields.type = e.target.value} id='type' type='text' placeholder='Type'></input>
        <input onChange={(e) => searchFields.owner = e.target.value} id='owner' type='text' placeholder='owner'></input>
        <input onChange={(e) => searchFields.license_number = e.target.value} id='license_number' type='text' placeholder='License number'></input>
        <button onClick={(e) => searchCars(searchFields)} className='auth-button'>search</button>
      </div>
      <div className="data-container">
        <div className="data-card">
          <div className='data-card-data'>
            <input type='text' value='asd' disabled></input>
            <p>Type</p>
            <p>Owner</p>
            <p>License Number</p>
          </div>
          <div className='data-card-bg'></div>
        </div>
      </div>
    </div>
  );
}

export default Cars;