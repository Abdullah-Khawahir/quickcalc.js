import { units, areSameCatagory } from './units.js';
/**
 * Converts a value from one unit to another.
 * @param {number} value - The value to convert.
 * @param {string} fromUnit - The unit to convert from.
 * @param {string} toUnit - The unit to convert to.
 * @returns {number} - The converted value.
 * @throws if the units are not the same
 */
export function convert(value, fromUnit, toUnit) {
	if (!units[fromUnit] || !units[toUnit]) {
		throw new Error('Invalid unit provided for conversion');
	}
	if (!areSameCatagory(fromUnit, toUnit)) {
		throw new Error("the units are not the same category")
	}
	// Convert the value to the base unit (assumed to be the smallest unit in the map)
	const baseValue = value * units[fromUnit];

	// Convert the base value to the target unit
	const convertedValue = baseValue / units[toUnit];

	return convertedValue;
}

