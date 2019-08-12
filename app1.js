var express = require('express');
var router = require('./control');
var app1 = express();

app1.set('view engine','ejs');

app1.use(express.static('./public'));

app1.get('/',router.showIndex);

app1.post('/tijiao',router.insert);

app1.get('/du',router.find);

app1.get('/shanshu',router.delete);

app1.listen(3000);