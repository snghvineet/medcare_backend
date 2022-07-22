const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
	const userDetails = req.body;
	const pass = userDetails.password;
	const hashedPass = await bcrypt.hash(pass, 10);
	console.log(hashedPass);
	res.send({
		username: userDetails.username,
		password: hashedPass,
		role: userDetails.role,
	});
});

module.exports = router;
