const User = require('../models/user.model');
const shortid = require('shortid');
const { FindUser } = require('../utils/UserUtility');
const { GenereteSalt, GeneretePassword, GenerateSignature } = require('../utils/PasswordUtility');
/**
 *
 * ! Add user
 * * Post req
 */

exports.signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const UserExist = await FindUser('', email);

	if (UserExist) {
		return res.status(409).json({ message: 'User already exists' });
	}
	// generate salts
	const salt = await GenereteSalt();
	const hash_password = await GeneretePassword(password, salt);
	const _createUser = await User.create({
		firstName,
		lastName,
		email,
		hash_password,
		username: shortid.generate(),
	});
	return res.status(200).json({
		_createUser,
	});
};
