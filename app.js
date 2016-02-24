/*
Alexander Amiot
http://52.10.36.129:3000
*/

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.post('/',function(req,res){
  var gParams = [];
  for (var p in req.query){
    gParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.getList = gParams;

  var pParams = [];
  for (var p in req.body){
    pParams.push({'name':p,'value':req.body[p]})
  }
  context.postList = pParams;
  res.render('checker', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

