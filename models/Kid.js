var mongoose = require('mongoose')

var KidsSchema = mongoose.Schema({
	username:{
		type:String,
		required: true
	},
	name: {
		type:String,
		required: true
	},
    totalRewards: {
        type:Number,
        required: true
    }

})

module.exports = mongoose.model('Kid', KidsSchema)