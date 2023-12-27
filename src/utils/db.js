const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    const { name, host } = db.connection;
    console.log(`Conectado a la DB: ${name}, en el host: ${host}`);
  } catch (error) {
    console.log("Error al conectar a la DB", error);
  }
};

module.exports = connect
