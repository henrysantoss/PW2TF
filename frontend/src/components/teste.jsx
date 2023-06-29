import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/teste.css';

const Teste = () => {
  const { idTeste } = useParams();
  const [teste, setTeste] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [horaInicio, setHoraInicio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeste = async () => {
      try {
        const response = await fetch(`http://localhost:3001/buscartesteesp/${idTeste}`);
        const data = await response.json();
        console.log(data);
        setTeste(data);
        setHoraInicio(new Date());
      } catch (error) {
        console.error('Erro ao buscar o teste:', error);
      }
    };

    fetchTeste();
  }, [idTeste]);

  const handleResposta = (resposta) => {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaAtual] = resposta;
    setRespostas(novasRespostas);
  };

  const handleVoltar = () => {
    setPerguntaAtual(perguntaAtual - 1);
  };

  const handleProximaPergunta = () => {
    if (perguntaAtual < teste.perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    }
  };

  const handleFinalizarTeste = () => {
    let acertos = 0;
    respostas.forEach((resposta, index) => {
      const pergunta = teste.perguntas[index];
      if (resposta === pergunta.resposta) {
        acertos++;
      }
    });

    setAcertos(acertos);
    setMostrarResultado(true);

    salvarResultado(acertos);
  };

  const salvarResultado = (acertos) => {
    const resultado = {
      teste: teste.titulo,
      qtd_perguntas: respostas.length,
      qtd_acertos: acertos,
      hora_inicio: horaInicio && horaInicio.toLocaleString(),
      hora_finalizada: new Date().toLocaleString()
    };
  
    fetch('http://localhost:3001/salvarresultado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resultado)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Resultado salvo:', data);
      })
      .catch(error => {
        console.error('Erro ao salvar o resultado:', error);
      });
  };
  

  const handleHome = () => {
    navigate("/");
  }

  const handleResultados = () => {
    navigate("/resultados");
  }

  const handleTestes = () => {
    navigate("/listatestes");
  }

  if (!teste || !teste.perguntas || teste.perguntas.length === 0) {
    return (
      <div className="carregando">
        <div className="card">
          <p className="mensagem">Não há perguntas neste teste.</p>
          <div className="botoes">
            <button className="botao-home" onClick={handleHome}>Home</button>
            <button className="botao-home" onClick={handleTestes}>Testes</button>
            <button className="botao-resultados" onClick={handleResultados}>Resultados</button>
          </div>
        </div>
      </div>
    );
  }

  const pergunta = teste.perguntas[perguntaAtual];
  const totalPerguntas = teste.perguntas.length;

  if (mostrarResultado) {
    return (
      <div className="teste">
        <div className="resultado">
          <div className="card">
            <h2 className="titulo">{teste.titulo}</h2>
            <div className="pergunta">
              <p>Resultado:</p>
              <p>Quantidade de questões respondidas: {respostas.length}</p>
              <p>Quantidade de acertos: {acertos}</p>
              <p>Horário de início: {horaInicio && horaInicio.toLocaleString()}</p>
              <p>Horário de finalização: {new Date().toLocaleString()}</p>
              <div className="botoes">
                <button className="botao-home" onClick={handleHome}>Home</button>
                <button className="botao-home" onClick={handleTestes}>Testes</button>
                <button className="botao-resultados" onClick={handleResultados}>Resultados</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teste">
      <div className="pergunta">
        <div className="card">
          <h2 className="titulo">{teste.titulo}</h2>
          <p className="titulo_pergunta">{pergunta && pergunta.pergunta}</p>
          <ul className="opcoes">
            <li>
              <button
                className={`opcao ${respostas[perguntaAtual] === 'opcaoA' ? 'selecionada' : ''}`}
                onClick={() => handleResposta('opcaoA')}
              >
                {pergunta && pergunta.opcaoA}
              </button>
            </li>
            <li>
              <button
                className={`opcao ${respostas[perguntaAtual] === 'opcaoB' ? 'selecionada' : ''}`}
                onClick={() => handleResposta('opcaoB')}
              >
                {pergunta && pergunta.opcaoB}
              </button>
            </li>
            <li>
              <button
                className={`opcao ${respostas[perguntaAtual] === 'opcaoC' ? 'selecionada' : ''}`}
                onClick={() => handleResposta('opcaoC')}
              >
                {pergunta && pergunta.opcaoC}
              </button>
            </li>
            <li>
              <button
                className={`opcao ${respostas[perguntaAtual] === 'opcaoD' ? 'selecionada' : ''}`}
                onClick={() => handleResposta('opcaoD')}
              >
                {pergunta && pergunta.opcaoD}
              </button>
            </li>
            <li>
              <button
                className={`opcao ${respostas[perguntaAtual] === 'opcaoE' ? 'selecionada' : ''}`}
                onClick={() => handleResposta('opcaoE')}
              >
                {pergunta && pergunta.opcaoE}
              </button>
            </li>
          </ul>
          {perguntaAtual > 0 && (
            <button className="botao-voltar" onClick={handleVoltar}>
              Voltar
            </button>
          )}
          {perguntaAtual === totalPerguntas - 1 ? (
            <button className="botao-finalizar" onClick={handleFinalizarTeste}>
              Finalizar Teste
            </button>
          ) : (
            <button className="botao-proxima" onClick={handleProximaPergunta}>
              Próxima Pergunta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teste;