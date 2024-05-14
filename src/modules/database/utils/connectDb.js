const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);

let db;

const connectDb = async () => {
  if (!db) {
    try {
      const connection = await client.connect();
      db = connection.db(process.env.ATLAS_DB);
    } catch (e) {
      console.error(e);
    }
  }
};

const getDb = () => {
  return db;
};

module.exports = { connectDb, getDb };
