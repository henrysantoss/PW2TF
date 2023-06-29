const { MongoClient } = require('mongodb');

async function verificarCredenciais(login, senha) {
  let client;

  try {
    const collectionName = process.env.DB_USUARIO;

    client = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(process.env.DB_DATABASE);
    const collection = db.collection(collectionName);

    const resultado = await collection.findOne({ login, senha });

    if (resultado) {
      return { mensagem: 'Login bem-sucedido!' };
    } else {
      throw new Error('Credenciais inválidas.');
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    if (client) {
      client.close();
    }
  }
}

module.exports = { verificarCredenciais };
