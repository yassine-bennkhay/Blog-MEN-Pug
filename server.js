//requirements
const express=require("express")
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");
const path=require("path")
const port = process.env.PORT || 3000;
const URI = process.env.DB_URI;
//dfinition du moteur de template
app.set("views",path.join(__dirname,"views"))
app.set("view engine","pug")
app.use(express.static(path.join(__dirname,"public")))
// Etablire une connexion à la base de données
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`Database Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log("Can't Connect to Database");
    process.exit(1);
  }
};
connectDB();
//Démarage du serveur su le le port : PORT dans .env
app.listen(port, () =>
  console.log(`The Server is running on the port ${port}`)
);
