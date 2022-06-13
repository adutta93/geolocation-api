const mongoose = require('mongoose');
const path = require('path');
const { MONGO_URL } = require('../config');

const ConnectDb = async () => {
	try {
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Atlas Connected');
	} catch (error) {
		console.error(`Error is ${error}`);
		process.exit(1);
	}
};

module.exports = ConnectDb;
