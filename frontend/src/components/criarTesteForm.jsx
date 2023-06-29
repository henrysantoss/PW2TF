import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/criarTesteForm.css';

const CriarTeste = () => {
  const [testes, setTestes] = useState([]);
  const [novoTeste, setNovoTeste] = useState('');
  const [testeSelecionado, setTesteSelecionado] = useState(null);
  const [novaPergunta, setNovaPergunta] = useState('');
  const [opcoesResposta, setOpcoesResposta] = useState({
    opcaoA: '',
    opcaoB: '',
    opcaoC: '',
    opcaoD: '',
    opcaoE: '',
  });
  const [respostaCorreta, setRespostaCorreta] = useState('');
  const [perguntas, setPerguntas] = useState([]);
  const navigate = useNavigate();

  const buscarTestes = async () => {
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

  const buscarPerguntas = async () => {
  if (testeSelecionado !== null && testeSelecionado !== undefined) {
    try {
      const teste = testes[testeSelecionado];
      const response = await fetch(`http://localhost:3001/buscarperguntas/${teste._id}`);
      const data = await response.json();
      if (response.ok) {
        const perguntasRecebidas = data.perguntas || []; // Verifica se o array de perguntas existe
        setPerguntas(perguntasRecebidas);
      }
    } catch (error) {
      console.log('Erro ao buscar perguntas:', error);
    }
  }
};
  

  const adicionarTeste = async () => {
    if (novoTeste.trim() === '') {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/adicionarteste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: novoTeste }),
      });
      if (response.ok) {
        setNovoTeste('');
        buscarTestes();
      }
    } catch (error) {
      console.log('Erro ao adicionar teste:', error);
    }
  };

  const deletarTeste = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/excluirteste/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        buscarTestes();
        return { message: 'Deletado com Sucesso' };
      } else {
        console.log(response);
        throw new Error('Erro ao deletar');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const selecionarTeste = (index) => {
    setTesteSelecionado(index);
    setPerguntas([]);
  };

  const adicionarPergunta = async () => {
    if (
      novaPergunta.trim() === '' ||
      Object.values(opcoesResposta).some((opcao) => opcao.trim() === '') ||
      respostaCorreta === ''
    ) {
      return; 
    }

    try {
      const teste = testes[testeSelecionado];
      const response = await fetch(`http://localhost:3001/adicionarpergunta/${teste._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pergunta: novaPergunta,
          opcoesResposta,
          resposta: respostaCorreta,
        }),
      });
      if (response.ok) {
        setNovaPergunta('');
        setOpcoesResposta({
          opcaoA: '',
          opcaoB: '',
          opcaoC: '',
          opcaoD: '',
          opcaoE: '',
        });
        setRespostaCorreta('');
        buscarPerguntas();
      }
    } catch (error) {
      console.log('Erro ao adicionar pergunta:', error);
    }
  };

  useEffect(() => {
    buscarTestes();
  }, []);

  useEffect(() => {
    buscarPerguntas();
  }, [testeSelecionado]);

  const handleHome = () => {
    navigate("/");
  } 

  return (
    <div className="container">
      <div className="left-section">
        <button className="home-button" onClick={handleHome}>Home</button>
        <h2>Adicionar Novo Teste</h2>
        <div className="input-container">
          <input
            type="text"
            value={novoTeste}
            onChange={(e) => setNovoTeste(e.target.value)}
          />
          <button onClick={adicionarTeste}>Adicionar</button>
        </div>

        <h2>Lista de Testes</h2>
        {testes.length > 0 ? (
          <ul>
            {testes.map((teste, index) => (
              <li
                key={index}
                className={index === testeSelecionado ? 'selected' : ''}
                onClick={() => selecionarTeste(index)}
              >
                <div className="teste-container">
                  <div className="teste-title">{teste.titulo}</div>
                  <div className="teste-buttons">
                    <button onClick={() => deletarTeste(teste._id)}>Excluir</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há nenhum teste cadastrado.</p>
        )}
      </div>
      <div className="right-section">
        {testeSelecionado !== null ? (
          <div>
            <h2>Adicionar Nova Pergunta</h2>
            <div className="input-container">
              <input
                type="text"
                value={novaPergunta}
                onChange={(e) => setNovaPergunta(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Opção A:</label>
              <input
                type="text"
                value={opcoesResposta.opcaoA}
                onChange={(e) =>
                  setOpcoesResposta({ ...opcoesResposta, opcaoA: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Opção B:</label>
              <input
                type="text"
                value={opcoesResposta.opcaoB}
                onChange={(e) =>
                  setOpcoesResposta({ ...opcoesResposta, opcaoB: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Opção C:</label>
              <input
                type="text"
                value={opcoesResposta.opcaoC}
                onChange={(e) =>
                  setOpcoesResposta({ ...opcoesResposta, opcaoC: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Opção D:</label>
              <input
                type="text"
                value={opcoesResposta.opcaoD}
                onChange={(e) =>
                  setOpcoesResposta({ ...opcoesResposta, opcaoD: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Opção E:</label>
              <input
                type="text"
                value={opcoesResposta.opcaoE}
                onChange={(e) =>
                  setOpcoesResposta({ ...opcoesResposta, opcaoE: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Resposta Correta:</label>
              <select
                value={respostaCorreta}
                onChange={(e) => setRespostaCorreta(e.target.value)}
              >
                <option value="">Selecione a resposta correta</option>
                <option value="opcaoA">Opção A</option>
                <option value="opcaoB">Opção B</option>
                <option value="opcaoC">Opção C</option>
                <option value="opcaoD">Opção D</option>
                <option value="opcaoE">Opção E</option>
              </select>
            </div>
            <button onClick={adicionarPergunta}>Adicionar Pergunta</button>

            <h2>Perguntas</h2>
            {perguntas.length > 0 ? (
              <ul>
                {perguntas.map((pergunta, index) => (
                  <li key={index}>
                    <div className="pergunta-container">
                      <div className="pergunta">{pergunta.pergunta}</div>
                      <div className="opcoes-resposta">
                        <p className={pergunta.resposta === "opcaoA" ? "correta" : ""}>A) {pergunta.opcaoA}</p>
                        <p className={pergunta.resposta === "opcaoB" ? "correta" : ""}>B) {pergunta.opcaoB}</p>
                        <p className={pergunta.resposta === "opcaoC" ? "correta" : ""}>C) {pergunta.opcaoC}</p>
                        <p className={pergunta.resposta === "opcaoD" ? "correta" : ""}>D) {pergunta.opcaoD}</p>
                        <p className={pergunta.resposta === "opcaoE" ? "correta" : ""}>E) {pergunta.opcaoE}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há perguntas cadastradas para este teste.</p>
            )}
          </div>
        ) : (
          <p>Selecione um teste para adicionar perguntas.</p>
        )}
      </div>
    </div>
  );
};

export default CriarTeste;