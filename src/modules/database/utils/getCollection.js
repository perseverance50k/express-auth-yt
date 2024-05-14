const { getDb } = require("./connectDb");

const getCollection = (collectionName) => {
  const db = getDb();
  const collection = db.collection(collectionName);

  return collection;
};

module.exports = { getCollection };
