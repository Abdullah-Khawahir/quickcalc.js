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
const temprtureConversionFunctions = {
	/**
	 * converts the kelvin to kelvin
	 * @param {number} kelvin 
	 **/
	kelvin: (kelvin) => kelvin,
	/**
	 * converts the celsius to kelvin
	 * @param {number} celsius 
	 **/
	CelsiusToKelvin: (celsius) => {
		return (celsius + 273.15)
	},
	/**
	 * converts the fahrenheit to kelvin
	 * @param {number} fahrenheit 
	 **/
	FahrenheitToKelvin: (fahrenheit) => {
		return (((fahrenheit - 32) * 5 / 9) + 273.15)
	},


	/**
	 * converts the fahrenheit to kelvin
	 * @param {number} fahrenheit 
	 **/
	KelvinToFahrenheit: (kelvin) => {
		return ((kelvin - 273.15) * 9 / 5) + 32
	},
	KelvinToCelsius: (kelvin) => {
		return (kelvin - 273.15)
	},
}

const temprtureUnitsToKelvin = {
	Kelvin: temprtureConversionFunctions.kelvin,
	Celsius: temprtureConversionFunctions.CelsiusToKelvin,
	Fahrenheit: temprtureConversionFunctions.FahrenheitToKelvin,

	K: temprtureConversionFunctions.kelvin,
	C: temprtureConversionFunctions.CelsiusToKelvin,
	F: temprtureConversionFunctions.FahrenheitToKelvin,
}
export function getConvertingFunction(toUnit) {
	return {
		Kelvin: temprtureConversionFunctions.kelvin,
		K: temprtureConversionFunctions.kelvin,

		Celsius: temprtureConversionFunctions.KelvinToCelsius,
		C: temprtureConversionFunctions.KelvinToCelsius,

		Fahrenheit: temprtureConversionFunctions.KelvinToFahrenheit,
		F: temprtureConversionFunctions.KelvinToFahrenheit,
	}[toUnit] ?? console.error("failed to getConvertingFunction")
}

/**
 * @param {string} unit1 
 * @param {string} unit2 
 * @returns {boolean}
 * */
export function areTimeUnits(unit1, unit2) {
	return (unit1 in timeUnits) && (unit2 in timeUnits)
}
/**
 * @param {string} unit
 * @returns { { unit1:string, unit2:string } | undefined  } retruns the units else return undefined 
 **/
export function breakCompoundUnit(unit) {
	const parts = unit.split(/(per|\/)/i).filter(Boolean)
	if (parts.length === 3) {
		const [unit1, per, unit2] = parts.map(s => s.toLowerCase().trim());
		if (['/', 'per'].includes(per.trim())) {
			return { unit1, unit2 };
		}
	}

	return undefined;
}
// TODO: add the next units :
// - Temperature
// - Area


/**
 * @param {string} unit1 
 * @param {string} unit2 
 * @returns {boolean}
 * */
export function areSameCatagory(unit1, unit2) {
	const categories = [timeUnits, lengthUnits, sizeUnits, volumeUnits, temprtureUnitsToKelvin]
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		if ((unit1 in category) && (unit2 in category)) {
			return true
		}
	}
	return false
}
export function isTemprtureUnit(unit) {
	return unit in temprtureUnitsToKelvin
	return convertedValue
}
const units = { ...timeUnits, ...lengthUnits, ...sizeUnits, ...volumeUnits, ...temprtureUnitsToKelvin };
export { timeUnits, lengthUnits, sizeUnits, volumeUnits, temprtureUnitsToKelvin, units };
