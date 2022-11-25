//requirements
const express = require("express");

const app = express();

//utiliser les middleware nissecaires
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Definition des routes
app.use("/posts", require("./routes/postRoutes"));
module.exports = app;
