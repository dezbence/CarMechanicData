import { useContext, useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';
import { AuthContext } from '../Utility/AuthContext';

function Home() {

  return (
    <div>
      <NavBar/>
      Home
    </div>
  );
}

export default Home;