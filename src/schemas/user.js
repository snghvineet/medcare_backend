const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		role: { type: String, required: true },
	},
	{ timestamps: true, collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
