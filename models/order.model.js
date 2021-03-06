var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var orderSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	state: {
		type: String,
		enum: ['pending', 'cooking', 'ready'],
		default: 'pending'
	},
	order_date: {
		type: Date,
		default: Date.now
	},
	email: String,
	email_on_ready: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('order', orderSchema);