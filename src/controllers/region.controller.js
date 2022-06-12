const Region = require('../models/region.model');
const { GenerateRegionUID } = require('../utils/RegionUtility');

exports.CreateRegion = async (req, res) => {
	try {
		const { name, description, location, owner, coordinates } = req.body;

		const newRegion = new Region({
			uid: GenerateRegionUID(),
			name,
			description,
			location,
			coordinates,
			owner,
		});
		const region = await newRegion.save();
		res.status(201).json({
			status: 'Success',
			message: 'Region successfully created',
			region,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};
