import { parseUnit } from "./unit-parsing.js";

const SIScalers = [
	{ shortPrefix: 'Q', longPrefix: 'quetta', multiplier: 1e30 },
	{ shortPrefix: 'R', longPrefix: 'ronna', multiplier: 1e27 },
	{ shortPrefix: 'Y', longPrefix: 'yotta', multiplier: 1e24 },
	{ shortPrefix: 'Z', longPrefix: 'zetta', multiplier: 1e21 },
	{ shortPrefix: 'E', longPrefix: 'exa', multiplier: 1e18 },
	{ shortPrefix: 'P', longPrefix: 'peta', multiplier: 1e15 },
	{ shortPrefix: 'T', longPrefix: 'tera', multiplier: 1e12 },
	{ shortPrefix: 'G', longPrefix: 'giga', multiplier: 1e9 },
	{ shortPrefix: 'M', longPrefix: 'mega', multiplier: 1e6 },
	{ shortPrefix: 'k', longPrefix: 'kilo', multiplier: 1e3 },
	{ shortPrefix: 'h', longPrefix: 'hecto', multiplier: 1e2 },
	{ shortPrefix: 'da', longPrefix: 'deka', multiplier: 1e1 },
	{ shortPrefix: '', longPrefix: '', multiplier: 1 },
	{ shortPrefix: 'd', longPrefix: 'deci', multiplier: 1e-1 },
	{ shortPrefix: 'c', longPrefix: 'centi', multiplier: 1e-2 },
	{ shortPrefix: 'm', longPrefix: 'milli', multiplier: 1e-3 },
	{ shortPrefix: 'μ', longPrefix: 'micro', multiplier: 1e-6 },
	{ shortPrefix: 'n', longPrefix: 'nano', multiplier: 1e-9 },
	{ shortPrefix: 'p', longPrefix: 'pico', multiplier: 1e-12 },
	{ shortPrefix: 'f', longPrefix: 'femto', multiplier: 1e-15 },
	{ shortPrefix: 'a', longPrefix: 'atto', multiplier: 1e-18 },
	{ shortPrefix: 'z', longPrefix: 'zepto', multiplier: 1e-21 },
	{ shortPrefix: 'y', longPrefix: 'yocto', multiplier: 1e-24 },
	{ shortPrefix: 'r', longPrefix: 'ronto', multiplier: 1e-27 },
	{ shortPrefix: 'q', longPrefix: 'quecto', multiplier: 1e-30 }
];
/**
 * Takes an object of units like meter and adds the SI prefix units, e.g., meter, centimeter, millimeter.
 * @param {object} objectOfUnits SI metric units without the SI prefix.
 * @param {number} exponent The exponent to apply to the SI prefix multipliers (default is 1).
 * @returns SI metric units with prefix.
 */
function withSIPrefixLong(objectOfUnits, exponent = 1) {
	for (const unit in objectOfUnits) {
		const value = objectOfUnits[unit];
		SIScalers.forEach(prefix => {
			const adjustedMultiplier = Math.pow(prefix.multiplier, exponent);
			if (value !== 1) {
				objectOfUnits[`${prefix.longPrefix}${unit}`] = adjustedMultiplier * value;
				if (unit !== 'hertz') {
					objectOfUnits[`${prefix.longPrefix}${unit}s`] = adjustedMultiplier * value;
				}
			} else {
				objectOfUnits[`${prefix.longPrefix}${unit}`] = adjustedMultiplier;
				if (unit !== 'hertz') {
					objectOfUnits[`${prefix.longPrefix}${unit}s`] = adjustedMultiplier;
				}
			}
		});
	}
	return objectOfUnits;
}

/**
 * add a new key for each key with an s suffix
 * @param {object} objectOfUnits
 *
 */
function withPrularSuffix(objectOfUnits) {
	for (const unit in objectOfUnits) {
		if (!unit.endsWith('s')) {
			objectOfUnits[`${unit}s`] = objectOfUnits[unit]
		} else {
			objectOfUnits[`${unit}es`] = objectOfUnits[unit]
		}
	}
	return objectOfUnits;
}

/**
 * 
 * takes an object of units like m and adds the SI prefix units ex. m , cm , mm 
 * @param {object} objectOfUnits SI metric units without the SI prefix
 * @returns SI metric units with prefix
 */
function withSIPrefixShort(objectOfUnits, exponent = 1) {
	for (const unit in objectOfUnits) {
		const value = objectOfUnits[unit];
		SIScalers.forEach(prefix => {
			const adjustedMultiplier = Math.pow(prefix.multiplier, exponent);
			objectOfUnits[`${prefix.shortPrefix}${unit}`] = value * adjustedMultiplier;
		});
	}
	return objectOfUnits;
}
const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = (day * 365) + (hour * 6); // 365 days and 6 hours

const timeUnits = {
	...withSIPrefixLong({ second }),
	...withSIPrefixShort({ s: 1 }),
	...withPrularSuffix({
		minute,
		hour,
		day,
		week,
		year,
	}),
	now: Date.now(),
	tomorrow: 0,
	yesterday: 0,

	min: minute,
	h: hour,
	d: day,
	w: week,
	y: year,
};

const meter = 1;
const inch = meter * 0.0254;
const foot = inch * 12;
const yard = foot * 3;
const mile = meter * 1609.344;

const lengthUnits = {
	...withSIPrefixLong({ meter }),
	...withSIPrefixShort({ m: 1 }),
	inches: inch,
	yards: yard,
	miles: mile,

	inch,
	foot,
	yard,
	mile,

	in: inch,
	ft: foot,
	yd: yard,
	mi: mile,
};

const bit = 1;
const byte = 8;
const sizeUnits = {
	...withSIPrefixLong({ bit }),
	...withSIPrefixShort({ b: 1 }),

	...withSIPrefixLong({ byte }),
	...withSIPrefixShort({ B: 8 }),
};

const liter = 1;
const cubic_centimeter = liter * 1000;
const teaspoon = liter * 1000 * 4.92892;
const tablespoon = liter * 1000 * 14.7868;
const fluid_ounce = liter * 1000 * 29.5735;
const cup = liter * 4.16667;
const pint = liter / 1.75975;
const quart = liter * 1.05669;
const gallon = liter * 0.264172;
const cubic_inch = liter * 1000 * 16.3871;
const cubic_foot = liter * 0.0283168;
const cubic_yard = liter * 0.00130795;

const volumeUnits = {
	...withSIPrefixLong({ liter }),
	...withSIPrefixShort({ L: 1 }),
	...withSIPrefixShort({ l: 1 }),
	...withSIPrefixShort({ m3: 1000 }, 3),

	teaspoons: teaspoon,
	tablespoons: tablespoon,
	cups: cup,
	pints: pint,
	quarts: quart,
	gallons: gallon,

	teaspoon,
	tablespoon,
	fluid_ounce,
	cup,
	pint,
	quart,
	gallon,

	cc: cubic_centimeter,
	tsp: teaspoon,
	tbsp: tablespoon,
	floz: fluid_ounce,
	c: cup,
	pt: pint,
	qt: quart,
	gal: gallon,
	in3: cubic_inch,
	ft3: cubic_foot,
	yd3: cubic_yard,
};
const gram = 1;
const pound = gram * 0.0220462;
const ounce = pound / 16;
const ton = gram * 1000 * 1000;
const massUnits = {
	...withSIPrefixLong({ gram }),
	...withSIPrefixShort({ g: 1 }),

	ounce,
	ounces: ounce,
	oz: ounce,
	pound,
	lb: pound,
	pounds: pound,
	ton,
	tons: ton,
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


const areaUnits = (() => {
	let areaUnitsMap = {}
	for (const key in lengthUnits) {
		areaUnitsMap[key + '2'] = lengthUnits[key] ** 2
	}
	return areaUnitsMap
})()

const watt = 1;

const horsepower = watt * 745.7;
const mechanicalHorsepower = watt * 745.7;
const metricHorsepower = watt * 735.5;
const footPoundPerSecond = watt * 1.35582;
const btuPerHour = watt * 0.29307107;
const ergPerSecond = watt / 10000000;
const caloriePerSecond = watt / 4.184;
const voltAmpere = watt;

const lumenPerSecond = watt;
const thermochemicalHorsepower = watt * 735.5;
const electricalHorsepower = watt * 746;
const boilerHorsepower = watt * 9810;

const powerUnits = {

	...withSIPrefixLong({ watt }),
	...withSIPrefixShort({ W: 1 }),

	...withSIPrefixLong({ voltAmpere }),
	...withSIPrefixShort({ VA: voltAmpere }),

	horsepower,
	mechanicalHorsepower,
	metricHorsepower,
	footPoundPerSecond,
	btuPerHour,
	ergPerSecond,
	caloriePerSecond,

	voltAmpere,
	lumenPerSecond,
	thermochemicalHorsepower,
	electricalHorsepower,
	boilerHorsepower,

	hp: horsepower,
	ftLbPerS: footPoundPerSecond,
	BTUPerH: btuPerHour,
	ergPerS: ergPerSecond,
	calPerS: caloriePerSecond,
	lmPerS: lumenPerSecond,

	thp: thermochemicalHorsepower,
	ehp: electricalHorsepower,
	bhp: boilerHorsepower
};
const ampere = 1;

const currentUnits = {
	...withSIPrefixLong({ ampere }),
	...withSIPrefixShort({ A: 1 }),
};

const pascal = 1;

const bar = pascal * 100000;

const atmosphere = pascal * 101325;
const torr = pascal * 133.322;
const psi = pascal * 6894.76;

const pressureUnits = {
	...withSIPrefixLong({ pascal }),
	...withSIPrefixShort({ Pa: 1 }),


	...withSIPrefixLong({ bar }),
	// ...withSIPrefixShort({ : 1 }),
	atmospheres: atmosphere,
	torrs: torr,

	bar,
	atmosphere,
	torr,
	psi,

	atm: atmosphere,
	Torr: torr,
};
const newton = 1;

const poundForce = newton * 4.44822;
const dyne = newton / 10e5;

const forceUnits = {
	...withSIPrefixLong({ newton }),
	...withSIPrefixShort({ N: 1 }),
	poundForces: poundForce,
	dynes: dyne,

	newton,
	poundForce,
	dyne,

	lbf: poundForce,
	dyn: dyne
};

const hertz = 1;

const frequencyUnits = {
	...withSIPrefixLong({ hertz }),
	...withSIPrefixShort({ Hz: 1 }),
};

const joule = 1;

const calorie = joule * 4.184;

const britishThermalUnit = joule * 1055.06;
const electronvolt = joule * 1.60218e-19;
const kilowattHour = joule * 3.6e6;

const energyUnits = {

	...withSIPrefixLong({ joule }),
	...withSIPrefixShort({ J: 1 }),

	...withSIPrefixLong({ calorie }),
	...withSIPrefixShort({ cal: calorie }),

	...withSIPrefixLong({ wattHour: kilowattHour / 1000 }),
	...withSIPrefixShort({ Wh: kilowattHour / 1000 }),


	britishThermalUnits: britishThermalUnit,
	electronvolts: electronvolt,

	BTU: britishThermalUnit,
	eV: electronvolt,
};

export const allCategories = [
	volumeUnits, timeUnits, lengthUnits, sizeUnits,
	temprtureUnitsToKelvin, areaUnits, massUnits,
	powerUnits, currentUnits, pressureUnits, forceUnits,
	frequencyUnits, energyUnits,
]
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
	const u1 = parseUnit(unit1)
	const u2 = parseUnit(unit2)
	let isSameBase = false;
	let isSameDivisor = false;
	let isSameBaseExpo = false;
	let isSameDivisorExpo = false;
	for (let i = 0; i < allCategories.length; i++) {
		const category = allCategories[i];
		if (unit1 in category && unit2 in category) {
			isSameBase = true
			isSameBaseExpo = true
			break;
		} else if (u1.base.name in category && u2.base.name in category) {
			if (u1.base.exponent === u2.base.exponent) {
				isSameBase = true
				isSameBaseExpo = true
				break;
			}
		}
	}
	for (let i = 0; i < allCategories.length; i++) {
		const category = allCategories[i];
		if (u1.base.name == u2.base.name) {
			isSameDivisor = true
		}
		if (u1.base.exponent == u2.base.exponent) {
			isSameDivisorExpo = true
		}
		if (u1.divisor.name == '1' && u2.divisor.name == '1') {
			isSameDivisor = true
			isSameDivisorExpo = true
		}

		if (`${u1.divisor.name}${u1.divisor.exponent}` in category &&
			`${u2.divisor.name}${u2.divisor.exponent}` in category ||
			u1.divisor.name in category && u2.divisor.name in category) {

			if (u1.divisor.exponent === u2.divisor.exponent) {
				isSameDivisor = true
				isSameDivisorExpo = true
				break;
			}
		}
	}
	return isSameBase && isSameDivisor && isSameBaseExpo && isSameDivisorExpo
}
export function isTemprtureUnit(unit) {
	return unit in temprtureUnitsToKelvin
}

const units = {
	"1": 1,
	...timeUnits, ...areaUnits, ...lengthUnits, ...sizeUnits, ...volumeUnits,
	...temprtureUnitsToKelvin, ...massUnits, ...powerUnits, ...currentUnits,
	...pressureUnits, ...forceUnits, ...frequencyUnits, ...energyUnits,
};

/**
 *
 * @param {string} unit 
 * @returns {Object}
 */
export function getUnitCatagory(unit) {
	if (unit == 1) return units
	const categories = allCategories
	for (let i = 0; i < categories.length; i++) {
		if (unit in categories[i]) {
			return categories[i]
		}
	}
	return undefined
}
export {
	areaUnits, currentUnits, energyUnits, forceUnits,
	frequencyUnits, lengthUnits, powerUnits, pressureUnits, sizeUnits, temprtureUnitsToKelvin, timeUnits, units, volumeUnits
};

