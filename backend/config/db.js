const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas se conectado correctamente");

  } catch (error) {

    console.error("Error de coneccion a MongoDB:", error.message);
    process.exit(1);

  }
};

module.exports = connectDB;