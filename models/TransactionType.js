var mongoose = require('mongoose')

var TransactionTypeSchema = mongoose.Schema({
	username:{
		type:String,
		required: true
	},
	name: {
		type:String,
		required: true
	},
    value: {
        type:Number,
        required: true
    },
	interval: { // possible values Daily, Weekly, Monthly. default: no limit
		type:String,
		required: false
	},
	frequency: { // how many time
		type:Number,
        required: false
	}
})

module.exports = mongoose.model('TransactionType', TransactionTypeSchema)