const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;  // ✅ Ajout du préfixe
const client = new MongoClient(url);
const dbName = process.env.MONGO_DATABASE;

async function connectMONGO(){
    try{
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to MongoDB ');
        return db;
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


module.exports = connectMONGO;