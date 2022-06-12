require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ConnectDb = require('./db/db');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * !MongoDb Connection
 */
ConnectDb();

/**
 * !Routes
 */
const userRoutes = require('./routes/user.route');
app.use('/dev/api', userRoutes);

/**
 * !Server
 */
const PORT = process.env.PORT || 1993;

app.listen(PORT, () => {
	console.clear();
	console.log(`Port is running at ${PORT}`);
});
