const GenerateRegionUID = () => {
	const first_elem = 'REGION';
	const second_elem = 'SH';
	const third_elem = 000;
	const fourth_elem = Math.ceil(Math.random() * 1200);

	return first_elem + '_' + second_elem + '_' + third_elem + fourth_elem;
};
module.exports = { GenerateRegionUID };
