import { parseUnit } from './unit-parsing.js';
import { areSameCatagory, getConvertingFunction, getUnitCatagory, isTemprtureUnit, temprtureUnitsToKelvin } from './units.js';
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

			return value * (convertedTemp / convertedOther);
		}
		if (isDivisorTemp) {
			const kelvin = temprtureUnitsToKelvin[from.divisor.name](value) ** from.divisor.exponent;
			const convertedTemp = getConvertingFunction(to.divisor.name)(kelvin) ** to.divisor.exponent;
			const convertedOther = value * baseCategory[to.base.name] ** to.base.exponent /
				(baseCategory[from.base.name] ** from.base.exponent)

			return convertedOther / convertedTemp;
		}
	}

	const baseValue = value * (baseCategory[from.base.name] ** from.base.exponent / divisorCategory[from.divisor.name] ** from.divisor.exponent)
	const converted = baseValue / (baseCategory[to.base.name] ** to.base.exponent / divisorCategory[to.divisor.name] ** to.divisor.exponent)
	return converted
	// const fromCompUnit = breakCompoundUnit(fromUnit)
	// const toCompUnit = breakCompoundUnit(toUnit)
	// const isCompundUnit = fromCompUnit !== undefined && toCompUnit !== undefined;
	// if (isCompundUnit) {
	// 	const baseFromUnitCategory = getUnitCatagory(fromCompUnit.baseUnit)
	// 	const divisorFromUnitCategory = getUnitCatagory(fromCompUnit.divisorUnit)
	//
	// 	if (!areSameCatagory(fromCompUnit.baseUnit, toCompUnit.baseUnit) || !areSameCatagory(fromCompUnit.divisorUnit, toCompUnit.divisorUnit)) {
	// 		throw new Error(`the units are not the same category: ${fromUnit} , ${toUnit}`)
	// 	}
	//
	// 	if (isTemprtureUnit(fromCompUnit.baseUnit) && isTemprtureUnit(toCompUnit.baseUnit)) { // isBase
	// 		const baseKelvin = temprtureUnitsToKelvin[fromCompUnit.baseUnit](value)
	// 		const convertedValue = getConvertingFunction(toCompUnit.baseUnit)(baseKelvin)
	//
	// 		const baseValue = divisorFromUnitCategory[fromCompUnit.divisorUnit]
	// 		const converted = baseValue / (divisorFromUnitCategory[toCompUnit.divisorUnit] / convertedValue)
	// 		return converted
	// 	} else if (isTemprtureUnit(fromCompUnit.divisorUnit) && isTemprtureUnit(toCompUnit.divisorUnit)) { // is Div
	// 		const baseKelvin = temprtureUnitsToKelvin[fromCompUnit.divisorUnit](value)
	// 		const convertedValue = getConvertingFunction(toCompUnit.divisorUnit)(baseKelvin)
	//
	// 		const baseValue = baseFromUnitCategory[fromCompUnit.baseUnit]
	// 		const converted = baseValue / (baseFromUnitCategory[toCompUnit.baseUnit] / convertedValue)
	// 		return converted
	// 	}
	//
	// 	const baseValue = value * (baseFromUnitCategory[fromCompUnit.baseUnit] / divisorFromUnitCategory[fromCompUnit.divisorUnit])
	// 	const converted = baseValue / (baseFromUnitCategory[toCompUnit.baseUnit] / divisorFromUnitCategory[toCompUnit.divisorUnit])
	// 	return converted
	// }
	//
	// if (isTemprtureUnit(fromUnit) && isTemprtureUnit(toUnit)) {
	// 	const baseKelvin = temprtureUnitsToKelvin[fromUnit](value)
	// 	const convertedValue = getConvertingFunction(toUnit)(baseKelvin)
	// 	return convertedValue
	// }
	//
	// if (areAreaUnits(fromUnit, toUnit)) {
	// 	const baseValue = value * area[fromUnit];
	// 	const convertedValue = baseValue / units[toUnit];
	//
	// 	return convertedValue
	// }
	//
	// if (!units[fromUnit] || !units[toUnit]) {
	// 	throw new Error(`Invalid unit provided for conversion: ${fromUnit} , ${toUnit}`);
	// }
	// if (!areSameCatagory(fromUnit, toUnit)) {
	// 	throw new Error(`the units are not the same category: ${fromUnit} , ${toUnit}`)
	// }
	// const unitCatagory = getUnitCatagory(fromUnit)
	// const baseValue = value * unitCatagory[fromUnit];
	// const convertedValue = baseValue / unitCatagory[toUnit];
	//
	// return convertedValue
}

