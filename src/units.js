const millisecond = 1;
const second = millisecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = (day * 365) + (hour * 6); // 365 days and 6 hours

const timeUnits = {

	milliseconds: millisecond,
	seconds: second,
	minutes: minute,
	hours: hour,
	days: day,
	weeks: week,
	years: year,

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
	millimeters: millimeter,
	centimeters: centimeter,
	meters: meter,
	kilometers: kilometer,
	inches: inch,
	yards: yard,
	miles: mile,

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
	bytes: byte,
	kilobytes: kilobyte,
	megabytes: megabyte,
	gigabytes: gigabyte,
	terabytes: terabyte,
	petabytes: petabyte,
	exabytes: exabyte,
	zettabytes: zettabyte,
	yottabytes: yottabyte,

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
const cubic_centimeter = milliliter;
const cubic_meter = liter * 1000;
const teaspoon = milliliter * 4.92892;
const tablespoon = milliliter * 14.7868;
const fluid_ounce = milliliter * 29.5735;
const cup = milliliter * 240;
const pint = milliliter * 473.176;
const quart = milliliter * 946.353;
const gallon = milliliter * 3785.41;
const cubic_inch = milliliter * 16.3871;
const cubic_foot = milliliter * 28316.8;
const cubic_yard = milliliter * 764555;

const volumeUnits = {
	milliliters: milliliter,
	liters: liter,
	cubic_centimeters: cubic_centimeter,
	cubic_meters: cubic_meter,
	teaspoons: teaspoon,
	tablespoons: tablespoon,
	fluid_ounces: fluid_ounce,
	cups: cup,
	pints: pint,
	quarts: quart,
	gallons: gallon,
	cubic_inchs: cubic_inch,
	cubic_foots: cubic_foot,
	cubic_yards: cubic_yard,

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
const milligram = 1;
const gram = milligram * 1000;
const kilogram = gram * 1000;
const microgram = milligram / 1000;
const pound = kilogram * 2.20462;
const ounce = pound / 16;
const massUnits = {
	micrograms: microgram,
	milligrams: milligram,
	grams: gram,
	kilograms: kilogram,
	pounds: pound,
	ounces: ounce,

	microgram,
	milligram,
	gram,
	kilogram,
	pound,
	ounce,

	mcg: microgram,
	mg: milligram,
	g: gram,
	kg: kilogram,
	lb: pound,
	oz: ounce
}


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
		const [unit1, per, unit2] = parts.map(s => s.trim());
		if (['/', 'per'].includes(per.trim())) {
			return { unit1, unit2 };
		}
	}
	if (parts.length > 3) {
		const perIndex = parts.findIndex((item) => ['/', 'per'].includes(item))
		if (perIndex != -1) {
			const [unit1, per, unit2] = parts.slice(perIndex - 1)
			if (['/', 'per'].includes(per.trim())) {
				return { unit1, unit2 };
			}
		}
	}

	return undefined;
}


const areaUnits = (() => {
	let areaUnitsMap = {}
	for (const key in lengthUnits) {
		areaUnitsMap[key + '2'] = lengthUnits[key] * lengthUnits[key]
	}
	return areaUnitsMap
})()

const watt = 1;
const kilowatt = watt * 1000;
const megawatt = kilowatt * 1000;
const gigawatt = megawatt * 1000;
const milliwatt = watt / 1000;
const microwatt = milliwatt / 1000;
const horsepower = watt * 745.7;
const mechanicalHorsepower = watt * 745.7;
const metricHorsepower = watt * 735.5;
const footPoundPerSecond = watt * 1.35582;
const btuPerHour = watt * 0.29307107;
const ergPerSecond = watt / 10000000;
const caloriePerSecond = watt / 4.184;
const voltAmpere = watt;
const kilovoltAmpere = kilowatt;
const megavoltAmpere = megawatt;
const gigavoltAmpere = gigawatt;
const lumenPerSecond = watt;
const thermochemicalHorsepower = watt * 735.5;
const electricalHorsepower = watt * 746;
const boilerHorsepower = watt * 9810;

const powerUnits = {
	watt,
	kilowatt,
	megawatt,
	gigawatt,
	milliwatt,
	microwatt,
	horsepower,
	mechanicalHorsepower,
	metricHorsepower,
	footPoundPerSecond,
	btuPerHour,
	ergPerSecond,
	caloriePerSecond,
	voltAmpere,
	kilovoltAmpere,
	megavoltAmpere,
	gigavoltAmpere,
	lumenPerSecond,
	thermochemicalHorsepower,
	electricalHorsepower,
	boilerHorsepower,

	W: watt,
	kW: kilowatt,
	MW: megawatt,
	GW: gigawatt,
	mW: milliwatt,
	µW: microwatt,
	hp: horsepower,
	ftLbPerS: footPoundPerSecond,
	BTUPerH: btuPerHour,
	ergPerS: ergPerSecond,
	calPerS: caloriePerSecond,
	VA: voltAmpere,
	kVA: kilovoltAmpere,
	MVA: megavoltAmpere,
	GVA: gigavoltAmpere,
	lmPerS: lumenPerSecond,
	thp: thermochemicalHorsepower,
	ehp: electricalHorsepower,
	bhp: boilerHorsepower
};

const allCategories = [timeUnits, lengthUnits, sizeUnits, volumeUnits, temprtureUnitsToKelvin, areaUnits, massUnits, powerUnits]
/**
 *
 * @param {string} unit1 
 * @param {string} unit2
 */
export function areAreaUnits(unit1, unit2) {
	if (unit1.endsWith('2') && unit2.endsWith('2')) {
		if (unit1.slice(-1) in lengthUnits && unit2.slice(-1) in lengthUnits) {
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
export function areSameCatagory(unit1, unit2) {
	const categories = allCategories
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
}
export function getUnitCatagory(unit) {
	const categories = allCategories
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		if ((unit in category)) {
			return category
		}
	}
	return undefined
}
// IMPORTANT: order matters here for areaUnits and length units and areaUnits must be before lengthUnits
const units = { ...timeUnits, ...areaUnits, ...lengthUnits, ...sizeUnits, ...volumeUnits, ...temprtureUnitsToKelvin, ...massUnits };

export { timeUnits, lengthUnits, sizeUnits, volumeUnits, temprtureUnitsToKelvin, areaUnits, units };
