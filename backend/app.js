const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const errorMiddleware = require('./middleware/error')
const products = require("./routes/productRoute")
const users = require("./routes/userRoute")

// to access req.body
app.use(bodyparser.json());
app.use(express.json());


//available routes
app.use('/api/v1',products);
app.use('/api/v1',users);

// middleware for errors
app.use(errorMiddleware)
module.exports = app