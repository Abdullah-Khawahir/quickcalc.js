const millisecond = 1;
const second = millisecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = (day * 365) + (hour * 6); // 365 days and 6 hours

const timeUnits = {
	millisecond,
	second,
	minute,
	hour,
	day,
	week,
	year,
	now: Date.now(),
	tomorrow: 0,
	yesterday: 0,


	ms: millisecond,
	s: second,
	min: minute,
	h: hour,
	d: day,
	w: week,
	y: year,
};

const millimeter = 1;
const centimeter = millimeter * 10;
const meter = centimeter * 100;
const kilometer = meter * 1000;
const inch = millimeter * 25.4;
const foot = inch * 12;
const yard = foot * 3;
const mile = kilometer * 1.609344;

const lengthUnits = {
	millimeter,
	centimeter,
	meter,
	kilometer,
	inch,
	foot,
	yard,
	mile,

	mm: millimeter,
	cm: centimeter,
	m: meter,
	km: kilometer,
	in: inch,
	ft: foot,
	yd: yard,
	mi: mile,
};

const byte = 1;
const kilobyte = byte * 1024;
const megabyte = kilobyte * 1024;
const gigabyte = megabyte * 1024;
const terabyte = gigabyte * 1024;
const petabyte = terabyte * 1024;
const exabyte = petabyte * 1024;
const zettabyte = exabyte * 1024;
const yottabyte = zettabyte * 1024;

const sizeUnits = {
	byte,
	kilobyte,
	megabyte,
	gigabyte,
	terabyte,
	petabyte,
	exabyte,
	zettabyte,
	yottabyte,


	B: byte,
	KB: kilobyte,
	MB: megabyte,
	GB: gigabyte,
	TB: terabyte,
	PB: petabyte,
	EB: exabyte,
	ZB: zettabyte,
	YB: yottabyte,
};

const milliliter = 1;
const liter = milliliter * 1000;
const cubic_centimeter = milliliter; // 1 milliliter
const cubic_meter = liter * 1000;
const teaspoon = milliliter * 4.92892; // 1 teaspoon = 4.92892 milliliters
const tablespoon = milliliter * 14.7868; // 1 tablespoon = 14.7868 milliliters
const fluid_ounce = milliliter * 29.5735; // 1 fluid ounce = 29.5735 milliliters
const cup = milliliter * 240; // 1 cup = 240 milliliters
const pint = milliliter * 473.176; // 1 pint = 473.176 milliliters
const quart = milliliter * 946.353; // 1 quart = 946.353 milliliters
const gallon = milliliter * 3785.41; // 1 gallon = 3785.41 milliliters
const cubic_inch = milliliter * 16.3871; // 1 cubic inch = 16.3871 milliliters
const cubic_foot = milliliter * 28316.8; // 1 cubic foot = 28316.8 milliliters
const cubic_yard = milliliter * 764555; // 1 cubic yard = 764555 milliliters

const volumeUnits = {
	milliliter,
	liter,
	cubic_centimeter,
	cubic_meter,
	teaspoon,
	tablespoon,
	fluid_ounce,
	cup,
	pint,
	quart,
	gallon,
	cubic_inch,
	cubic_foot,
	cubic_yard,

	ml: milliliter,
	l: liter,
	cc: cubic_centimeter,
	m3: cubic_meter,
	tsp: teaspoon,
	tbsp: tablespoon,
	fl_oz: fluid_ounce,
	c: cup,
	pt: pint,
	qt: quart,
	gal: gallon,
	in3: cubic_inch,
	ft3: cubic_foot,
	yd3: cubic_yard,
};

/**
 * @param {string} unit1 
 * @param {string} unit2 
 * @returns {boolean}
 * */
export function areSameCatagory(unit1, unit2) {
	const categories = [timeUnits, lengthUnits, sizeUnits, volumeUnits]
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		if (category[unit1] && category[unit2]) {
			return true
		}
	}
	return false
}

/**
 * @param {string} unit1 
 * @param {string} unit2 
 * @returns {boolean}
 * */
export function areTimeUnits(unit1, unit2) {
	return timeUnits[unit1] && timeUnits[unit2]
}
const units = { ...timeUnits, ...lengthUnits, ...sizeUnits, ...volumeUnits };
export { timeUnits, lengthUnits, sizeUnits, volumeUnits, units };
