require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const GenereteSalt = async () => {
	return await bcrypt.genSalt();
};

const GeneretePassword = async (password, salt) => {
	return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
	return (await GeneretePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload) => {
	return await jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

module.exports = { GenereteSalt, GeneretePassword, ValidatePassword, GenerateSignature };
