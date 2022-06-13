const Vector = require('../models/vector.model');
const { GenerateVectorUID, GenerateClassID } = require('../utils/VectorUtility');

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
