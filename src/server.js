const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

// MongoDB connection string
const dbUrl =
	'mongodb+srv://new_user:pass1234@mdb-basics.9qm5u.mongodb.net/medcare?retryWrites=true&w=majority';

// Set the value of port if there is a PORT environment variable else default to 3000.
const port = process.env.PORT || 3000;
mongoose.connect(dbUrl, (err) => {
	if (err) {
		console.log(err.message);
		return;
	}
	console.log('Connected to MongoDB');
	app.listen(port, () => {
		console.log(`Server started on port ${port}...`);
	});
});

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes for handling requests
app.use('/auth', authRouter);

// In case route is not found
app.use((err, req, res, next) => {
	if (err) next(err);
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
