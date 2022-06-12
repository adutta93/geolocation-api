require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1993;

app.listen(PORT, () => {
	console.clear();
	console.log(`Port is running at ${PORT}`);
});
