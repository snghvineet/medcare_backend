const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

router.get('/', (req, res) => {
	res.send({ message: "You're in the Authentication section." });
});

router.post('/signup', async (req, res, next) => {
	const userDetails = req.body;
	const pass = userDetails.password;
	try {
		const hashedPass = await bcrypt.hash(pass, 10);
		console.log(hashedPass);
		res.send({
			username: userDetails.username,
			password: hashedPass,
			role: userDetails.role,
		});
		const user = new User({
			username: userDetails.username,
			password: hashedPass,
			role: userDetails.role,
		});
		user.save();
		res.send({ username: user.username, role: user.role });
	} catch (err) {
		console.log(err.message);
		// next(err);
	}
});

module.exports = router;
