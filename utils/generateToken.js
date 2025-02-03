const jwt = require("jsonwebtoken");

const generateToken = (id, res) => {
  const token = jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: "1h"})
  res.cookie("token", token, {maxAge: 3600000, httpOnly: true, sameSite: "none", secure: true})
}

module.exports = {generateToken}