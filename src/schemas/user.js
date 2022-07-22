const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: { type: string, required: true, lowercase: true },
		password: { type: string, required: true },
		role: { type: string, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
