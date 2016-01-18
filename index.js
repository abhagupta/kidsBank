var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User     = require('./models/User');
var Transaction     = require('./models/Transaction');
var TransactionType    = require('./models/TransactionType');
var routes =  require('./routes.js')

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//var uri = process.env.MONGOLAB_URI;
//var mongoURI = 'mongodb://127.0.0.1:27017/Rewards';
//mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

routes(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


