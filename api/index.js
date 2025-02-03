const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectMongoDB = require("../database/mongoDB")
const {authRoutes} = require("../routes/auth.routes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  // strict: "same"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes)

app.get("/", (req,res) => {
  res.status(200).json({message: "it is working"})
})

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
  connectMongoDB();
})