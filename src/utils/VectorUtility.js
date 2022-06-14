const turf = require('@turf/turf');

/**
 * !GenerateVectorUID
 */

const GenerateVectorUID = () => {
	const first_elem = 'VECTOR';
	const second_elem = 'SH';
	const third_elem = 000;
	const fourth_elem = Math.ceil(Math.random() * 1200);

	return first_elem + '_' + second_elem + '_' + third_elem + fourth_elem;
};

/**
 * !GenerateClassID
 */

const GenerateClassID = () => {
	const class_id = Math.ceil(Math.random() * 14000);
	return class_id;
};

/**
 * !CalculateArea
 */

const CalculateArea = (coordinates) => {
	let polygon = turf.polygon(coordinates);
	let area = turf.area(polygon);
	return area;
};

/**
 * !CalculatePerimeter
 */
const CalculatePerimeter = (coordinates) => {
	let totalPerimeter = 0;
	let i = 0;
	while (i < coordinates[0].length - 1) {
		let lat1 = coordinates[0][i][0];
		let lon1 = coordinates[0][i][1];
		let lat2 = coordinates[0][i + 1][0];
		let lon2 = coordinates[0][i + 1][1];

		function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
			let R = 6371; // Radius of the earth in km
			let dLat = deg2rad(lat2 - lat1); // deg2rad below
			let dLon = deg2rad(lon2 - lon1);
			let a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			let distance = R * c; // Distance in km
			return distance;
		}

		function deg2rad(deg) {
			return deg * (Math.PI / 180);
		}
		let current_distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
		totalPerimeter += current_distance;
		i++;
	}
	return totalPerimeter;
};
module.exports = { GenerateVectorUID, GenerateClassID, CalculateArea, CalculatePerimeter };
