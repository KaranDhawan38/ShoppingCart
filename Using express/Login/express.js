var express = require('express');

var app = express();

var bodyParser = require('body-parser')

app.use(express.static('public'));

app.use(bodyParser.json({ type: 'application/*+json' }));

var port = 3000;

app.listen(port,function(err){
                              if(err)
                              return console.log('something went wrong :',err);
                              console.log('server is listening on '+port);	
                             });

app.get('/',function(req,res){
	                           res.send("./index.html");
                             });
 /* app.post();
  app.put();
  app.delete();*/