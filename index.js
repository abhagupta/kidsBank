var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://127.0.0.1:27017/Rewards')

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.render('pages/cool');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


