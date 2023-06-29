const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

  async function salvarResultado(doc) {
    let client;
  
    try {
      const collectionName = process.env.DB_RESULTADO;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      const resultado = await collection.insertOne(doc);
  
      if (resultado) {
        return { mensagem: "Inserido com sucesso o resultado" };
      } else {
        throw new Error('Erro');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async function buscaResultados() {
    let client;
  
    try {
      const collectionName = process.env.DB_RESULTADO;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      const resultado = await collection.find().toArray();
  
      if (resultado) {
        return { resultado };
      } else {
        throw new Error('Erro');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  module.exports = { salvarResultado, buscaResultados };