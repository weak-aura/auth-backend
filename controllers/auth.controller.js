const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const {generateToken} = require("../utils/generateToken");
const signup = async (req, res) => {
  try {
    const {name, password} = req.body

    const existingUser = await UserModel.findOne({name})
    if (existingUser) {
      return res.status(400).json({error: "Пользователь с таким именем уже существует"})
    }
    
    if(!name || !password) {
      return res.status(400).json({error: "Все поля должны быть заполнены!"})
    }
    
    if(name.length < 4) {
      return res.status(400).json({error: "Длина имени должно быть не менее 4 букв"})
    }
    
    if(password.length < 6 ) {
      return res.status(400).json({error: "Длина пароля должна быть не менее 6 символов"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      password: hashedPassword
    })

    if (newUser) {
      await newUser.save();
      await generateToken(newUser._id, res)
      res.status(201).json({newUser, message: "Вы зарегестрированы", status: true})
    } else {
      return res.status(400).json({error: "Неверные данные пользователя"})
    }


  } catch (error) {
    console.log("Ошибка при регистраций", error.message)
    res.status(400).json({error: "Ошибка сервера"})
  }
}

const login = async (req, res) => {
  try {
    const {name, password} = req.body

    if(name.length < 4) {
      return res.status(400).json({error: "Длина имени должно быть не менее 4 букв"})
    }
    
    const existingUser = await UserModel.findOne({name})
    if (!existingUser) {
      return res.status(400).json({error: "Пользователь с такой почтой не существует"})
    }
    
    const comparePassword = await bcrypt.compare(password, existingUser?.password || "")

    if (!comparePassword) {
      return res.status(400).json({error: "Пароль не верный"})
    }
    
    if(comparePassword && existingUser) {
      generateToken(existingUser._id, res)
      res.status(201).json({existingUser, message: "Вы вошли в систему", status: true})
    }
    
  } catch (error) {
    console.log("Ошибка при входе в систему: ", error.message)
    res.status(400).json({error: "Ошибка сервера"})
  }
}
const logout = async (req, res) => {
  try {
    res.clearCookie("token", process.env.TOKEN_SECRET)
    res.status(201).json({message: "Вы вышли из системы"})
  } catch (error) {
    console.log("error in logout: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const getMe = async (req, res) => {
  try {
    const providedUser = await UserModel.findById(req.target).select("-password")
    
    res.status(201).json({providedUser, status: true})
  } catch (error) {
    console.log("Ошибка при проверке пользователя: ", error.message)
    res.status(400).json({error: "Ошибка сервера"})
  }
}

module.exports = {signup, login, logout, getMe}