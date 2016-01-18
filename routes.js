
var User = require('./models/User');
var Transaction     = require('./models/Transaction');
var TransactionType    = require('./models/TransactionType');
var Kid    = require('./models/Kid');

module.exports = function(app) {

    app.get('/', function(request, response) {
      response.render('pages/index');
    });

    app.get('/gettest', function(request, response) {
        response.json("get success");
    });

    // Get summary information for kids
    app.get('/summary/:username/:kidsname', function(req, res) {
      var username = req.params.username;
      var kidsname = req.params.kidsname;
            Kid.findOne({'username': username, 'name': kidsname},function(err, kid){
             if (err){
                    res.send(err);
             }else
             res.json(kid.totalRewards);
            })
    });

    // record reward transactions.
    app.post('/transaction/:user/:kidsname/:transactionType',function(req, res){
        Kid.findOne({'username': req.params.user, 'name' : req.params.kidsname},function(err, kid){
         TransactionType.findOne({'name': req.params.transactionType}, function(err, transactionType){
             kid.totalRewards = kid.totalRewards + transactionType.value;
                
             kid.save(function(err) {
                    res.json(kid.totalRewards);
                });
                 var transaction = new Transaction()
                 transaction.type = req.params.transactionType
                 transaction.username= req.params.user
                 transaction.kidsname= req.params.kidsname
                 transaction.value=transactionType.value
                 transaction.date=Date();
                 transaction.save();
         })
                
        })

    });

    // Get transaction types for Users
    app.get('/transactiontype/:username', function(req, res) {
      var username = req.params.username;
            TransactionType.find({'username': username},function(err, transactionTypes){
             if (err){
                    res.send(err);
             }else
             res.json(transactionTypes);
            })
    });

    // Add User (Parent)
    app.post('/:username/:pin',function(req, res){
       
        User.findOne({'username': req.params.username},function(err, user){
            if (err){
                    res.send("sending error" + err);
            }else{
                console.log
                var user = new User()
                user.username = req.params.username
                user.pin = req.params.pin
                user.save()
                res.json(user)
            }

        })      
    });

    // Add kids
    app.post('/:username/kids/:kidsname',function(req, res){
       
        User.findOne({'username': req.params.username},function(err, user){
            if (err){
                    res.send(err);
            }else{
                var kid = new Kid()
                kid.username = req.params.username
                kid.name = req.params.kidsname
                kid.totalRewards = 0
                kid.save()
                res.json(kid)
            }

        })      
    });

    // Get all transactions for kids
    app.get('/transactions/:username/:kidsname', function(req, res) {
      var username = req.params.username;
      var kidsname = req.params.kidsname;
            Transaction.find({'username': username, kidsname: kidsname},function(err, transactions){
             if (err){
                    res.send(err);
             }else
             res.json(transactions);
            })
    });

    // Not Working -- Create Transaction Type
    app.post('/transactiontype/:username',function(req, res){
       console.log(req.params);
       console.log(req.body);
        User.findOne({'username': req.params.username},function(err, user){
            if (err){
                    res.send(err);
            }else{
                var transactionType = new TransactionType()
                transactionType.username = req.params.username
                transactionType.name = req.body.name
                transactionType.value = req.body.value
                transactionType.interval = req.body.interval
                transactionType.frequency = req.body.frequency
                transactionType.save()
                res.json(transactionType)
            }

        })      
    });
}
