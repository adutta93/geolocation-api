const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const ConnectDb = async () => {
	const MONGO_URL = `mongodb+srv://senseH-geoloc-api:hhnk2Y0pTQLuBNQj@cluster0.ca0ng.mongodb.net/?retryWrites=true&w=majority`;
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
