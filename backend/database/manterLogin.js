const { MongoClient } = require('mongodb');

async function manterLogado() {
  let client;

  try {
    const collectionName = process.env.DB_LOGADO;

    client = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.DB_DATABASE);
    const collection = db.collection(collectionName);

    const log = {
        logado: "Sim"
      }

    const resultado = await collection.insertOne(log);

    if (resultado) {
        return { mensagem: 'T' };
    } else {
        return { mensagem: 'F' };
    }
  } catch (error) {
        throw new Error(error);
  } finally {
    if (client) {
      client.close();
    }
  }
}

async function verificarLogado() {
    let client;
  
    try {
      const collectionName = process.env.DB_LOGADO;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      const log = {
          logado: "Sim"
        }
  
      const resultado = await collection.findOne(log);
  
      if (resultado) {
        return { mensagem: 'T' };
      } else {
        return { mensagem: 'F' };
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async function deletarLogado() {
    let client;
  
    try {
      const collectionName = process.env.DB_LOGADO;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
  
      const log = {
          logado: "Sim"
        }
  
      const resultado = await collection.deleteMany(log);
  
      if (resultado) {
        return { mensagem: 'Deletado' };
      } else {
        return { mensagem: 'Erro' };
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

module.exports = { manterLogado, verificarLogado, deletarLogado };