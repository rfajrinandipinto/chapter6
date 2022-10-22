/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

 const express = require("express");
 const bodyParser = require('body-parser');
 const morgan = require("morgan");
 const cors = require('cors');
 const router = require("../config/routes");
 
 const app = express();

 app.use(cors({
    origin: '*'
 }));

app.set("views", "./views");
app.set('view engine');
 
 /** Install request logger */
 app.use(morgan("dev"));
 
 /** Install JSON request parser */
 app.use(express.json());

 app.use(bodyParser.urlencoded({ extended: true}));
 
 /** Install Router */
 app.use(router);
 
 module.exports = app;
 