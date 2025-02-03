const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MONGODB: ${conn.connection.host}`)
  }catch (error) {
    console.log("Error of connection to MongoDB", error.message)
  }
}

module.exports = connectMongoDB;