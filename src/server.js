const express = require('express');
const app = express();
const morgan = require('morgan');

const authRouter = require('./routes/auth');

// Middlewares
app.use(morgan('dev'));

// Routes for handling requests
app.use('/auth', authRouter);

// In case route is not found
app.use((req, res, next) => {
	const error = new Error(req.url + ' is not found!');
	error.status = 404;
	next(error);
});

// Handling all errors
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message,
		},
	});
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
