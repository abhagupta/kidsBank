var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
	username: {
		type:String,
		required: true
	},
    pin: {
        type:Number,
        required: true
    }

})

module.exports = mongoose.model('User', UserSchema)