const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

async function buscarPerguntasDoTeste(idTeste) {
    let client;
  
    try {
      const collectionName = process.env.DB_TESTE;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      const resultado = await collection.findOne({ _id: new ObjectId(idTeste) });
      
      if (resultado) {
        console.log("Perguntas encontradas")
        return resultado.perguntas;
      } else {
        console.log("Nenhum teste encontrado")
        throw new Error('Nenhuma teste encontrado');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async function inserirPerguntasDoTeste(idTeste, doc) {
    let client;
    let resultado;
    let documento;
  
    try {
      const collectionName = process.env.DB_TESTE;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      try {
        if (typeof doc !== 'string') {
          throw new Error('O parâmetro doc deve ser uma string JSON válida.');
        }
        documento = JSON.parse(doc);
        console.log(documento);
        delete documento._id;
        resultado = await collection.replaceOne(
          { _id: new ObjectId(idTeste) },
          documento
        );
      } catch (error) {
        console.log(error);
      }
      if (resultado) {
        console.log("Perguntas inseridas");
        return resultado.perguntas;
      } else {
        console.log("Nenhuma pergunta inserida");
        throw new Error('Nenhum teste encontrado');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }
  
  

module.exports = { buscarPerguntasDoTeste, inserirPerguntasDoTeste };