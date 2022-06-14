require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/');

/**
 * !isSignedIn
 */
exports.isSignedIn = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, SECRET);
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

/**
 * !isOwner
 */
exports.isOwner = (req, res, next) => {
	if (req.user.role !== 'owner') {
		return res.status(403).json({
			message: "You're not an owner, access denied",
		});
	}
	next();
};

/**
 * !isAdmin
 */
exports.isAdmin = (req, res, next) => {
	if (req.user.role !== 'super-admin') {
		return res.status(403).json({
			message: "You're not an admin, access denied",
		});
	}
	next();
};
