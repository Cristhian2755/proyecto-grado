const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../../backend/.env" });

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectDatabase() {

    try {

        await client.connect();

        console.log("MongoDB Atlas conectado correctamente");

        const db = client.db("iser_proyectos");

        return db;

    } catch (error) {

        console.error("Error conectando MongoDB:", error);

    }

}

module.exports = connectDatabase;