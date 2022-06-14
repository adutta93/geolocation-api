const Vector = require('../models/vector.model');
const { GenerateVectorUID, GenerateClassID, CalculateArea, CalculatePerimeter } = require('../utils/VectorUtility');
const { isUserTheOwner } = require('../utils/UserUtility');

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

exports.GetAllVectors = async (req, res) => {
	try {
		const vectors = await Vector.find();
		res.status(200).json({
			status: 'Success',
			Total: vectors.length,
			vectors,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.GetAllVectorsPagination = async (req, res) => {
	const skip = req.query.skip ? Number(req.query.skip) : 0;
	const DEFAULT_LIMIT = 10;
	try {
		const vectors = await Vector.find({}).skip(skip).limit(DEFAULT_LIMIT);
		res.status(200).json({
			status: 'Success',
			Total: vectors.length,
			vectors,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.GetVectorById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ error: 'Vector Id required' });
		}
		const vector = await Vector.findOne({ _id: id });
		if (!vector) {
			return res.status(400).json({ error: 'could not find vector' });
		}
		const coordinates = vector.geometry.coordinates;
		const VectorArea = await CalculateArea(coordinates);
		const VectorPerimeter = await CalculatePerimeter(coordinates);

		res.status(200).json({ vector, area: VectorArea, perimeter: VectorPerimeter });
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.SearchThroughQueryParams = async (req, res) => {
	try {
		const { className, region } = req.query;
		if (!className || region.length < 24) {
			res.status(400).json({
				status: 'Failed',
				message: 'Invalid query',
			});
		}
		// console.log(className, region);
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
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};

exports.UpdateVector = async (req, res) => {
	try {
		const userId = req.user.id;
		const vector = await Vector.findById(req.params.id);

		if (!vector) return res.status(404).json({ Error: 'vector not found' });

		if (!isUserTheOwner(userId, vector.owner)) {
			res.status(400).json({
				status: 'Failed, you are not the owner, you cant update',
			});
		}

		const updatedVector = await vector.update(req.body, {
			new: true,
		});

		res.status(200).json({
			msg: 'Vector updated successfully',
			updatedVector,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};
exports.DeleteVector = async (req, res) => {
	try {
		const userId = req.user.id;
		const vector = await Vector.findById(req.params.id);

		if (!vector) return res.status(404).json({ Error: 'vector not found' });

		if (!isUserTheOwner(userId, vector.owner)) {
			res.status(400).json({
				status: 'Failed, you are not the owner, you cant delete',
			});
		}

		await vector.remove();
		res.json({
			msg: 'vector successfully deleted ',
			id: req.params.id,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Error',
			err: err.message,
		});
	}
};
