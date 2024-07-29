import { units, areSameCatagory, breakCompoundUnit, isTemprtureUnit, temprtureUnitsToKelvin, getConvertingFunction, areAreaUnits } from './units.js';
/**
 * Converts a value from one unit to another.
 * @param {number} value - The value to convert.
 * @param {string} fromUnit - The unit to convert from.
 * @param {string} toUnit - The unit to convert to.
 * @returns {number} - The converted value.
 * @throws if the units are not the same
 */
export function convert(value, fromUnit, toUnit) {
	const fromCompoundUnit = breakCompoundUnit(fromUnit)
	const toCompoundUnit = breakCompoundUnit(toUnit)
	if (fromCompoundUnit !== undefined && toCompoundUnit !== undefined) {

		const baseValue = value * (units[fromCompoundUnit.unit1] / units[fromCompoundUnit.unit2])
		const converted = baseValue / (units[toCompoundUnit.unit1] / units[toCompoundUnit.unit2])
		return converted
	}

	if (isTemprtureUnit(fromUnit) && isTemprtureUnit(toUnit)) {
		const baseKelvin = temprtureUnitsToKelvin[fromUnit](value)
		const convertedValue = getConvertingFunction(toUnit)(baseKelvin)
		return convertedValue
	}

	if (areAreaUnits(fromUnit, toUnit)) {
		const baseValue = value * area[fromUnit];
		const convertedValue = baseValue / units[toUnit];

		return convertedValue
	}

	if (!units[fromUnit] || !units[toUnit]) {
		throw new Error(`Invalid unit provided for conversion: ${fromUnit} , ${toUnit}`);
	}
	if (!areSameCatagory(fromUnit, toUnit)) {
		throw new Error(`the units are not the same category: ${fromUnit} , ${toUnit}`)
	}
	const baseValue = value * units[fromUnit];
	const convertedValue = baseValue / units[toUnit];

	return convertedValue
}

