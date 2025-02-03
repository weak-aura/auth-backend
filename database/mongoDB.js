const mongoose = require("mongoose");

const connectionMongoDB = (uri) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connect = await mongoose.connect(uri)
      resolve(connect)
    }catch (error) {
      reject(error)
    }
  })
}

module.exports = connectionMongoDB