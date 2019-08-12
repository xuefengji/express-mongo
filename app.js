var express = require("express");
var router = require('./control/router.js');

var app = express();

app.get("/",router.insert);

app.get('/du',router.find);

app.get('/delete',router.delete);

app.get('/update',router.update);

app.listen(3000);


