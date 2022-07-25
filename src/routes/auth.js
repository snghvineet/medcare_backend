const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const JWTAuth = require('../models/jwt_auth');

router.get('/', (req, res) => {
	res.send({ message: "You're in the Authentication section." });
});

router.post('/signup', async (req, res, next) => {
	const userDetails = req.body;
	const pass = userDetails.password;
	try {
		// Hashing the password
		const hashedPass = await bcrypt.hash(pass, 10);
		// Creating a new document in users collection
		const user = new User({
			username: userDetails.username,
			password: hashedPass,
			role: userDetails.role,
		});
		const result = await user.save();
		const token = JWTAuth.signJWT(result);
		res.send({ id: result._id, token: token });
	} catch (err) {
		console.log(err.message);
		next(err);
	}
});

router.post('/signin', async (req, res) => {
	const userDetails = req.body;
	try {
		// Finding a user with the given username
		const user = await User.findOne({ username: userDetails.username });
		if (user == null) {
			const err = new Error('Invalid username or password.');
			err.status = 401;
			throw err;
		}
		const passMatch = await bcrypt.compare(userDetails.password, user.password);
		if (!passMatch) {
			const err = new Error('Invalid username or password.');
			err.status = 401;
			throw err;
		}
		const token = JWTAuth.signJWT(user);
		res.send({ id: user._id, token: token });
	} catch (err) {
		console.log(err.message);
		next(err);
	}
});

module.exports = router;
