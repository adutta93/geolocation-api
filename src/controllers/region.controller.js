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
		if (!region) {
			res.status(400).json({
				status: 'Failed',
				message: 'Unable to create region',
			});
		} else {
			res.status(201).json({
				status: 'Success',
				message: 'Region successfully created',
				region,
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.GetAllRegion = async (req, res) => {
	try {
		const regions = await Region.find();
		res.status(200).json({
			status: 'Success',
			Total: regions.length,
			regions,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.GetAllRegionPagination = async (req, res) => {
	const skip = req.query.skip ? Number(req.query.skip) : 0;
	const DEFAULT_LIMIT = 10;
	try {
		const regions = await Region.find({}).skip(skip).limit(DEFAULT_LIMIT);
		res.status(200).json({
			status: 'Success',
			Total: regions.length,
			regions,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};
exports.GetRegionById = () => {};
exports.UpdateRegion = () => {};
exports.DeleteRegion = () => {};
