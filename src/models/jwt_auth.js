const jwt = require('jsonwebtoken');

const SECRET_KEY = '!#(*!*#&HVD(AFH!(#$_Usfuqru13';
const EXPIRY_TIME = 60 * 60; // In seconds

const signJWT = (userDetails) => {
	try {
		const token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + EXPIRY_TIME,
				iat: Math.floor(Date.now() / 1000),
				user: {
					username: userDetails.username,
					role: userDetails.role,
				},
			},
			SECRET_KEY
		);
		return token;
	} catch (err) {
		throw err;
	}
};

const verifYJWT = (token) => {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (err) {
		throw err;
	}
};

module.exports = {
	signJWT: signJWT,
	verifYJWT: verifYJWT,
};
