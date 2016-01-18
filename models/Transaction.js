var mongoose = require('mongoose')

var TransactionSchema = mongoose.Schema({
	type: {
		type:String,
		required: true
	},
    value: {
        type:Number,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    kidsname: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        required: true
    }


})



module.exports = mongoose.model('Transaction', TransactionSchema)