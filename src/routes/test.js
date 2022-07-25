const express = require('express');
const router = express.Router();
const JWTAuth = require('../models/jwt_auth');

router.get('/', (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const result = JWTAuth.verifYJWT(token);
		res.send(result);
	} catch (err) {
		console.log(err.message);
		next(err);
	}
});

module.exports = router;
