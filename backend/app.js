const express = require('express')
const app = express();
const bodyparser = require('body-parser');

const products = require("./routes/productRoute")

app.use(bodyparser.json());
app.use(express.json());
//available routes
app.use('/api/v1',products);

module.exports = app