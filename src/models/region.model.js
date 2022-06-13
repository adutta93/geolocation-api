const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
	{
		uid: { type: String, required: true, trim: true, unique: true },
		name: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		location: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: [0, 0],
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Region', regionSchema);
