/* jshint esversion: 8 */
var express = require('express');
const cors = require('cors');
var routes = require('../server');

const port = 3000;
var app = express();

app.use(cors());
app.use("/", routes);


app.listen(port, () => {
    console.log(`Server Started Successfully ${port}`);
});