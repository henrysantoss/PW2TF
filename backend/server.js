const express = require('express');
const app = express();
var cors = require('cors')
const path = require('path');
const router = express.Router();
const { verificarCredenciais } = require('./database/login');
const { manterLogado, verificarLogado, deletarLogado } = require('./database/manterLogin');
const { buscaTeste, adicionarteste, deletarTeste, buscarTesteEsp } = require('./database/teste');
const { buscarPerguntasDoTeste, inserirPerguntasDoTeste } = require('./database/perguntas');
const { salvarResultado, buscaResultados } = require('./database/resultado')

app.use(cors())

app.use(express.static(path.join(__dirname, 'client/build')));

require("dotenv").config()

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor Ligado: ${PORT}`);
});

app.post("/login", async (req, res) => {
    const { login, senha } = req.body;

    try {
      const resultado = await verificarCredenciais(login, senha);
      console.log(resultado)
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.post("/manterlogado", async (req, res) => {
    try {
      const resultado = await manterLogado();
      console.log(resultado)
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.get("/verificarlogado", async (req, res) => {
    try {
      const resultado = await verificarLogado();
      console.log(resultado)
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.post("/deletarlogado", async (req, res) => {
    try {
      const resultado = await deletarLogado();
      console.log(resultado)
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.get("/buscateste", async (req, res) => {
    try {
      const resultado = await buscaTeste();
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.post("/adicionarteste", async (req, res) => {
    try {
      const { titulo } = req.body;
      const resultado = await adicionarteste(titulo);  
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });

  app.delete("/excluirteste/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await deletarTeste(id);
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error.message });
    }
  });  

  app.get('/buscarperguntas/:idTeste', async (req, res) => {
    const idTeste = req.params.idTeste;
    
    try {
      const perguntas = await buscarPerguntasDoTeste(idTeste);
      res.json({ perguntas });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar perguntas.' });
    }
  });

  app.get('/buscartesteesp/:idTeste', async (req, res) => {
    const idTeste = req.params.idTeste;
    
    try {
      const teste = await buscarTesteEsp(idTeste);
      res.json(teste);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar teste especifico.' });
    }
  });

  app.put('/inserirperguntas/:idTeste', async (req, res) => {
    const idTeste = req.params.idTeste;
    const body = req.body;
    
    try {
      const doc = JSON.stringify(body);
      const perguntas = await inserirPerguntasDoTeste(idTeste, doc);
      res.json({ perguntas });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar perguntas.' });
    }
  });
  

  app.post('/adicionarpergunta/:testeId', async (req, res) => {
    const { testeId } = req.params;
    const { pergunta, opcoesResposta, resposta } = req.body;
  
    if (
      pergunta.trim() === '' ||
      !opcoesResposta ||
      opcoesResposta.opcaoA.trim() === '' ||
      opcoesResposta.opcaoB.trim() === '' ||
      opcoesResposta.opcaoC.trim() === '' ||
      opcoesResposta.opcaoD.trim() === '' ||
      opcoesResposta.opcaoE.trim() === '' ||
      resposta.trim() === ''
    ) {
      console.log({ message: 'Campos inválidos' });
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  
    try {
      const response = await fetch(`http://localhost:3001/buscartesteesp/${testeId}`);
      if (!response.ok) {
        console.log({ message: 'Teste não encontrado' });
        return res.status(404).json({ message: 'Teste não encontrado' });
      }
  
      let testData = await response.json();
  
      if (!Array.isArray(testData.perguntas)) {
        testData.perguntas = [];
      }
  
      const perguntaObj = {
        pergunta,
        ...opcoesResposta,
        resposta
      };

      delete perguntaObj._id;
  
      testData.perguntas.push(perguntaObj);
  
      const updateResponse = await fetch(`http://localhost:3001/inserirperguntas/${testeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
  
      console.log("Pergunta adicionada");
  
      if (!updateResponse.ok) {
        return res.status(500).json({ message: 'Erro ao atualizar teste' });
      }
  
      return res.status(200).json(testData);
    } catch (error) {
      console.log('Erro ao adicionar pergunta:', error);
      return res.status(500).json({ message: 'Erro ao adicionar pergunta' });
    }
  });

  app.post('/salvarresultado', async (req, res) => {
    const resultado = req.body;

    const response = await salvarResultado(resultado);

    res.json({ message: 'Resultado salvo com sucesso!' });
  });

  app.get('/buscaresultados', async (req, res) => {
    try {
      const resultado = await buscaResultados();
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(401).json({ Error: error.message });
    }
  });
    