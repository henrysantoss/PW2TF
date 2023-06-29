import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/resultados.css';

const Resultados = () => {
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscaResultados();
  }, []);

  const buscaResultados = async () => {
    try {
      const response = await fetch('http://localhost:3001/buscaresultados');
      const data = await response.json();
      setResultados(data.resultado);
    } catch (error) {
      console.log('Erro ao buscar resultados:', error);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="resultados">
      <button className="home-button" onClick={handleHome}>
        Home
      </button>
      <h1>Resultados</h1>
      <div className="grid-resultados">
        {resultados.map((resultado) => (
          <div className="cartao" key={resultado._id}>
            <h2>{resultado.teste}</h2>
            <p>Quantidade de perguntas: {resultado.qtd_perguntas}</p>
            <p>Quantidade de acertos: {resultado.qtd_acertos}</p>
            <p>
              Porcentagem de acerto:{' '}
              {((resultado.qtd_acertos / resultado.qtd_perguntas) * 100).toFixed(2)}%
            </p>
            <p>Hora de início: {resultado.hora_inicio}</p>
            <p>Hora de finalização: {resultado.hora_finalizada}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultados;