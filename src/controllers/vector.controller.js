const Vector = require('../models/vector.model');
const { GenerateVectorUID, GenerateClassID, CalculateArea } = require('../utils/VectorUtility');

exports.CreateVector = async (req, res) => {
	try {
		const { name, description, className, geometry, coordinates, owner, region } = req.body;

		const newVector = new Vector({
			uid: GenerateVectorUID(),
			name,
			description,
			classid: GenerateClassID(),
			className,
			geometry,
			coordinates,
			owner,
			region,
		});
		const vector = await newVector.save();
		if (!vector) {
			res.status(400).json({
				status: 'Failed',
				message: 'Unable to create vector',
			});
		} else {
			res.status(201).json({
				status: 'Success',
				message: 'Vector successfully created',
				vector,
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.GetVectorById = async (req, res) => {
	const { uid } = req.params;
	if (!uid) {
		return res.status(400).json({ error: 'Vector Id required' });
	}
	const vector = await Vector.findOne({ uid: uid });
	if (!vector) {
		return res.status(400).json({ error: 'could not find vector' });
	}
	const coordinates = vector.geometry.coordinates;
	const VectorArea = await CalculateArea(coordinates);

	res.status(200).json({ vector, VectorArea: VectorArea });
};

exports.SearchThroughQueryParams = async (req, res) => {
	const { className, region } = req.query;
	if (!className || region.length < 24) {
		res.status(400).json({
			status: 'Failed',
			message: 'Invalid query',
		});
	}
	console.log(className, region);
	const vector = await Vector.findOne({ className: className, region: region });
	if (!vector) {
		res.status(400).json({
			status: 'Failed',
			message: 'Vector not found',
		});
	} else {
		res.status(201).json({
			status: 'Success',
			message: 'Got vector',
			vector,
		});
	}
};
