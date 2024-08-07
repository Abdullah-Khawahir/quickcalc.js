import { parseUnit } from './unit-parsing.js';
import { areSameCatagory, getConvertingFunction, getUnitCatagory, isTemprtureUnit, temprtureUnitsToKelvin } from './units.js';
let DECEMAL = 5
/**
 * Converts a value from one unit to another.
 * @param {number} value - The value to convert.
 * @param {string} fromUnit - The unit to convert from.
 * @param {string} toUnit - The unit to convert to.
 * @returns {number} - The converted value.
 * @throws if the units are not the same
 */
export function convert(value, fromUnit, toUnit) {
	const from = parseUnit(fromUnit)
	const to = parseUnit(toUnit)
	if (!areSameCatagory(from.base.name, to.base.name) ||
		!areSameCatagory(from.divisor.name, to.divisor.name) ||
		from.base.exponent !== to.base.exponent ||
		from.divisor.exponent !== to.divisor.exponent) {

		throw new Error(`the units are not the same category: ${fromUnit} , ${toUnit}`)
	}
	const baseCategory = getUnitCatagory(to.base.name)
	const divisorCategory = getUnitCatagory(to.divisor.name)


	const isBaseTemp = isTemprtureUnit(from.base.name)
	const isDivisorTemp = isTemprtureUnit(from.divisor.name)
	if (isBaseTemp || isDivisorTemp) {

		if (isBaseTemp) {
			const kelvin = temprtureUnitsToKelvin[from.base.name](value) ** from.base.exponent;
			const convertedTemp = getConvertingFunction(to.base.name)(kelvin) ** to.base.exponent;
			const convertedOther = (divisorCategory[from.divisor.name] ** from.divisor.exponent) /
				divisorCategory[to.divisor.name] ** to.divisor.exponent

			return formatNumber(value * (convertedTemp / convertedOther), DECEMAL);
		}
		if (isDivisorTemp) {
			const kelvin = temprtureUnitsToKelvin[from.divisor.name](value) ** from.divisor.exponent;
			const convertedTemp = getConvertingFunction(to.divisor.name)(kelvin) ** to.divisor.exponent;
			const convertedOther = value * baseCategory[to.base.name] ** to.base.exponent /
				(baseCategory[from.base.name] ** from.base.exponent)

			return formatNumber(convertedOther / convertedTemp, DECEMAL);
		}
	}

	const baseValue = value * (baseCategory[from.base.name] ** from.base.exponent / divisorCategory[from.divisor.name] ** from.divisor.exponent)
	const converted = baseValue / (baseCategory[to.base.name] ** to.base.exponent / divisorCategory[to.divisor.name] ** to.divisor.exponent)
	return formatNumber(converted, DECEMAL)
}

function formatNumber(num, decimal) {
	return +((+num).toFixed(decimal))
}
