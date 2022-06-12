require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ValidateSignature } = require('../utils/PasswordUtility');

exports.isSignedIn = (req, res, next) => {
	const isSignatureValidated = ValidateSignature(req);
	if (!isSignatureValidated) {
		return res.status(400).json({ message: 'Authorization required' });
	}
	next();
	//jwt.decode()
};

exports.OwnerMiddleware = (req, res, next) => {
	const role = req.user.role;
	if (role !== 'admin' || role !== 'owner') {
		next();
	} else {
		return res.status(400).json({ message: "You're not an owner, access denied" });
	}
};

exports.AdminMiddleware = (req, res, next) => {
	if (req.user.role === 'admin') {
		next();
	} else {
		return res.sendStatus(200).json({ message: "You're not an admin, access denied" });
	}
};
