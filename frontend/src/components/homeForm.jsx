import '../css/homeForm.css';
import homeImage from '../images/home.png';
import React from "react";
import { Link } from 'react-router-dom';


const Home = () => {

  React.useEffect(() => {
    fetch('http://localhost:3001/deletarLogado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }, []);

  return (
    <div className="container">
      <div className="background-image" style={{ backgroundImage: `url(${homeImage})` }}></div>
      <div className="header">
        <Link to="/login" className="login-button">Login</Link>
      </div>
      <div className="content">
        <Link to="/listatestes" className="custom-button">Testes</Link>
        <Link to="/resultados" className="custom-button">Resultados</Link>
      </div>
    </div>
  );
};

export default Home;