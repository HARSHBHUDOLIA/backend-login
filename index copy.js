require("dotenv").config();

const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);

const express = require("express");


const authRoutes = require("./routes/auth.routes");
const mongoose = require("mongoose");

const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));


app.use(express.json());

console.log("Hello index");
app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
