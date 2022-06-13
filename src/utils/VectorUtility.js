const turf = require('@turf/turf');

const GenerateVectorUID = () => {
	const first_elem = 'VECTOR';
	const second_elem = 'SH';
	const third_elem = 000;
	const fourth_elem = Math.ceil(Math.random() * 1200);

	return first_elem + '_' + second_elem + '_' + third_elem + fourth_elem;
};

const GenerateClassID = () => {
	const class_id = Math.ceil(Math.random() * 14000);
	return class_id;
};

const CalculateArea = (coordinates) => {
	let polygon = turf.polygon(coordinates);
	let area = turf.area(polygon);
	return area;
};
module.exports = { GenerateVectorUID, GenerateClassID, CalculateArea };
