import { useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';

function Cars() {

  searchFields = useState({brand: null, type: null, owner: null, license_number: null});

  return (
    <div>
      <NavBar/>
      <div>
        <input onChange={(e) => searchFields.brand = e.target.value} id='brand' type='text' placeholder='Brand'></input>
        <input onChange={(e) => searchFields.type = e.target.value} id='type' type='text' placeholder='Type'></input>
        <input onChange={(e) => searchFields.owner = e.target.value} id='owner' type='text' placeholder='owner'></input>
        <input onChange={(e) => searchFields.license_number = e.target.value} id='license_number' type='text' placeholder='License number'></input>
      </div>
      <div>
        Cars
      </div>
    </div>
  );
}

export default Cars;