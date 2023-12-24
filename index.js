require('dotenv').config()
const express = require ("express");
const app = express();
const route = require("./routes")
const dbConnection = require("./config/dbConfig");

app.use(express.json());
dbConnection();

app.use(route);

app.listen(8000, function(){
  console.log("Server Is Running")
});

// username : mdmahabubrahman800
// password: 2i23VfMbxtl40H1i
// databasename: ecommerceapi