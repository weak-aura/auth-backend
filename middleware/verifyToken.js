const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const verifyToken = async (req, res, next) => {
  try {
    // достаем токен из cookies
    const token = req.cookies.token
    
    if(!token){
      return res.status(403).json({error: "Токен не найден"})
    }
    
    // расшифровка токена 
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!decoded) {
      return res.status(401).json({error: "Токен не действителен"})
    }

    // добавляем расшифрованный токен в переменную 
    req.target = await UserModel.findById(decoded.id)
    next()
  }catch (error) {
    console.log("error protectRoute: ", error.message)
    res.status(400).json({error: "invalid access token"})
  }
}

module.exports = {verifyToken}