// a. UID* (different from primary key)
// b. Name*
// c. Description
// d. ClassID* (a numeric identifier of your choice)
// e. ClassName* (a name for the tag of a vector)
// f. Polygon* (geojson of type Polygon)
// g. Region* (a reference/foreign key to a region)

const mongoose = require('mongoose');

const vectorSchema = new mongoose.Schema(
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
		classid: { type: Number, required: true, unique: true },
		className: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		geometry: {
			type: {
				type: String,
				enum: ['Polygon'],
				required: true,
			},
			coordinates: {
				type: [[[Number]]],
				required: true,
			},
		},
		region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Vector', vectorSchema);
