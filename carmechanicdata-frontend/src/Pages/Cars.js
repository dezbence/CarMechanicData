import { useContext, useEffect, useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';
import Axios from '../services/dataservice.js';
import { toast } from 'react-toastify';
import { AuthContext, UserModeContext } from '../Utility/Contexts.js';
import {ReactComponent as Editsvg} from '../assets/edit.svg';
import {ReactComponent as Deletesvg} from '../assets/delete.svg';
import {ReactComponent as Cancelsvg} from '../assets/cancel.svg';
import {ReactComponent as Savesvg} from '../assets/save.svg';

function Cars() {

  const [searchFields, setSearchFields] = useState({brand: null, type: null, owner: null, license_number: null});
  const [cars, setCars] = useState();
  const auth = useContext(AuthContext);
  const userMode = useContext(UserModeContext);

  const searchCars = () => {
    return Axios.post('/search-cars', searchFields, { headers: { "Authorization": "Bearer " + auth.token } })
        .then(resp => {
          setCars(resp.data.data);
        })
        .catch(err => {
            return toast.error(err.response.data.data.error);
        })
  }

  useEffect(() => {
    searchCars();
  }, [])

  return (
    <div className='cars-background'>
      <NavBar/>
      <div>
        <input onChange={(e) => searchFields.brand = e.target.value} id='brand' type='text' placeholder='Brand'></input>
        <input onChange={(e) => searchFields.type = e.target.value} id='type' type='text' placeholder='Type'></input>
        <input onChange={(e) => searchFields.owner = e.target.value} id='owner' type='text' placeholder='owner'></input>
        <input onChange={(e) => searchFields.license_number = e.target.value} id='license_number' type='text' placeholder='License number'></input>
        <button onClick={(e) => searchCars()} className='auth-button'>search</button>
      </div>
      <div className="data-container">
        <div className="data-card">
          <div className='data-card-data'>
            <p>Brand</p>
            <p>Type</p>
            <p>Owner</p>
            <p>License Number</p>
          </div>
          <div className='data-card-bg'></div>
        </div>    
      </div>

      {cars && cars.map((item, index) => (
        <div className="data-container">
        <div className="data-card">
          <div className='data-card-data' isEdited={true} >
            <input className='display' disabled type='text' defaultValue={item.brand}/>
            <input className='display' disabled type='text' defaultValue={item.type}/>
            <input className='display' disabled type='text' defaultValue={item.owner}/>
            <input className='display' disabled type='text' defaultValue={item.license_number}/>
            {userMode.editMode && <div className='edit'>
              <Editsvg onClick={this.isEdited=false}/>
              <Deletesvg/>
            </div>}
            {<div className='edit'>
              <Savesvg/>
              <Cancelsvg/>
            </div>}
          </div>
          <div className='data-card-bg'></div>
          </div>
        </div>
      ))}

      

    </div>
  );
}

export default Cars;