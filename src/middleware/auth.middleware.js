require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'gbrynunmi#$@mt#$@o9#$@';

exports.isSignedIn = async (req, res, next) => {
	console.log('process.env.APP_SECRET', process.env.APP_SECRET);
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.APP_SECRET);
			req.user = await User.findById(decoded._id).select('-password');
			next();
		} catch (err) {
			console.log(err);
			res.status(401).json({ Status: 'Not authorized' });
		}
	}
	if (!token) {
		res.status(401).json({ Status: 'No token is provided' });
	}
};

exports.isOwner = (req, res, next) => {
	console.log('User role => ', req.user.role);
	if (req.user.role !== 'owner') {
		return res.status(403).json({
			message: "You're not an owner, access denied",
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	console.log('User role => ', req.user.role);
	if (req.user.role !== 'admin') {
		return res.status(403).json({
			message: "You're not an admin, access denied",
		});
	}
	next();
};
