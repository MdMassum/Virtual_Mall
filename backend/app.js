const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const errorMiddleware = require('./middleware/error')
const products = require("./routes/productRoute")

// to access req.body
app.use(bodyparser.json());
app.use(express.json());


//available routes
app.use('/api/v1',products);

// middleware for errors
app.use(errorMiddleware)
module.exports = app