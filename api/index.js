const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectionMongoDB = require("../database/mongoDB")
const {authRoutes} = require("../routes/auth.routes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.status(200).json({message: "it is working"})
})

connectionMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb")
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("error connection mongodb: ", error.message)
  })