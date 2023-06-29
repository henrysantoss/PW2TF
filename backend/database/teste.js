const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

async function buscaTeste() {
  let client;

  try {
    const collectionName = process.env.DB_TESTE;

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

async function adicionarteste(titulo) {
    let client;
  
    try {
      const collectionName = process.env.DB_TESTE;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);

      const doc = { 
        titulo : titulo,
        perguntas: []
      }
  
      const resultado = await collection.insertOne(doc);
  
      if (resultado) {
        return { message: "Inserido com Sucesso" };
      } else {
        throw new Error('Erro ao Inserir');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  const deletarTeste = async (id) => {
    let client;
  
    try {
      const collectionName = process.env.DB_TESTE;
  
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db(process.env.DB_DATABASE);
      const collection = db.collection(collectionName);
      const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
  
      if (resultado.deletedCount === 1) {
        return { message: "Deletado com Sucesso" };
      } else {
        throw new Error(resultado);
      }
    } catch (error) {
      throw new Error(`Erro ao deletar o teste: ${error.message}`);
    } finally {
      if (client) {
        client.close();
      }
    }
  };

  async function buscarTesteEsp(idTeste) {
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
        console.log("Teste encontrado")
        return resultado;
      } else {
        console.log("Nenhum teste encontrado")
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

module.exports = { buscaTeste, adicionarteste, deletarTeste, buscarTesteEsp };