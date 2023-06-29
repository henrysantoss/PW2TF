import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/listaTestesForm.css';

const ListaTestes = () => {
  const [testes, setTestes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscaTestes();
  }, []);

  const buscaTestes = async () => {
    try {
      const response = await fetch('http://localhost:3001/buscateste');
      const data = await response.json();
      const testesFormatados = data.resultado.map((teste) => ({
        _id: teste._id.toString(),
        titulo: teste.titulo || '',
      }));
      setTestes(testesFormatados);
    } catch (error) {
      console.log('Erro ao buscar testes:', error);
    }
  };

  const handleHome = () => {
    navigate("/");
  } 

  return (
    <div className="lista-testes">
      <button className="home-button" onClick={handleHome}>Home</button>
      <h1>Lista de Testes</h1>
      <div className="grid-testes">
        {testes.map((teste) => (
          <div className="bloco-teste" key={teste._id}>
            <h2>{teste.titulo}</h2>
            <Link to={`/teste/${teste._id}`}>
              <button>Entrar</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTestes;