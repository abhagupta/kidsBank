var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User     = require('./models/User');
var Transaction     = require('./models/Transaction');
var TransactionType    = require('./models/TransactionType');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
var uri = process.env.MONGOLAB_URI;
var mongoURI = 'mongodb://127.0.0.1:27017/Rewards';
mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.render('pages/cool');
});

app.get('/summary/:id?', function(req, res) {
	 var id = req.params.id;
        User.findOne({'username': id},function(err, user){
        	if (err){
                res.send(err);
        	}else
        	res.json(user.totalRewards);
        })
})

app.post('/:id/:transactionType',function(req, res){
	var id = req.params.id;
    var transactionType = req.params.transactionType;
    User.findOne({'username': id},function(err, user){
    	TransactionType.findOne({'name': transactionType}, function(err, transactionType){
    		user.totalRewards = user.totalRewards + transactionType.value;
    		user.save(function(err) {
                res.json({ message: 'User updated!' });
            });
    	})
        	
    })

})
      



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


