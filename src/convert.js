import { units, areSameCatagory, getUnitCatagory, breakCompoundUnit, isTemprtureUnit, temprtureUnitsToKelvin, getConvertingFunction, areAreaUnits } from './units.js';
/**
 * Converts a value from one unit to another.
 * @param {number} value - The value to convert.
 * @param {string} fromUnit - The unit to convert from.
 * @param {string} toUnit - The unit to convert to.
 * @returns {number} - The converted value.
 * @throws if the units are not the same
 */
export function convert(value, fromUnit, toUnit) {
	const fromCompUnit = breakCompoundUnit(fromUnit)
	const toCompUnit = breakCompoundUnit(toUnit)
	const isCompundUnit = fromCompUnit !== undefined && toCompUnit !== undefined;
	if (isCompundUnit) {
		const baseFromUnitCategory = getUnitCatagory(fromCompUnit.baseUnit)
		const divisorFromUnitCategory = getUnitCatagory(fromCompUnit.divisorUnit)

		if (!areSameCatagory(fromCompUnit.baseUnit, toCompUnit.baseUnit) || !areSameCatagory(fromCompUnit.divisorUnit, toCompUnit.divisorUnit)) {
			throw new Error(`the units are not the same category: ${fromUnit} , ${toUnit}`)
		}

		const baseValue = value * (baseFromUnitCategory[fromCompUnit.baseUnit] / divisorFromUnitCategory[fromCompUnit.divisorUnit])
		const converted = baseValue / (baseFromUnitCategory[toCompUnit.baseUnit] / divisorFromUnitCategory[toCompUnit.divisorUnit])
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
	const unitCatagory = getUnitCatagory(fromUnit)
	const baseValue = value * unitCatagory[fromUnit];
	const convertedValue = baseValue / unitCatagory[toUnit];

	return convertedValue
}

