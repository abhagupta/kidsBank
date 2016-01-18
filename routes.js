
var User = require('./models/User');
var Transaction     = require('./models/Transaction');
var TransactionType    = require('./models/TransactionType');

module.exports = function(app) {

    app.get('/', function(request, response) {
      response.render('pages/index');
    });

    app.get('/gettest', function(request, response) {
        res.json("get success");
    });

    app.get('/summary/:id?', function(req, res) {
      var id = req.params.id;
            User.findOne({'username': id},function(err, user){
             if (err){
                    res.send(err);
             }else
             res.json(user.totalRewards);
            })
    });

    app.post('/:id/:transactionType',function(req, res){
        User.findOne({'username': req.params.id},function(err, user){
         TransactionType.findOne({'name': req.params.transactionType}, function(err, transactionType){
             user.totalRewards = user.totalRewards + transactionType.value;
                
             user.save(function(err) {
                    res.json(user.totalRewards);
                });
                 var transaction = new Transaction()
                 transaction.type = req.params.transactionType
                 transaction.username= req.params.id
                 transaction.value=transactionType.value
                 transaction.date=Date();
                 transaction.save();
         })
                
        })

    });
}
