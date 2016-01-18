var mongoose = require('mongoose')

var TransactionTypeSchema = mongoose.Schema({
	name: {
		type:String,
		required: true
	},
    value: {
        type:Number,
        required: true
    }


})

module.exports = mongoose.model('TransactionType', TransactionTypeSchema)