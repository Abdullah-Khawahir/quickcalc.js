import { units } from './units.js'
/**
 * @param {string} unit
 * 
 */
export function parseUnit(unit) {
	let compound = _breakCompoundUnit(unit);
	let basePower = _getExponantialUnits(compound.baseUnit);
	let divisorPower = _getExponantialUnits(compound.divisorUnit);

	return {
		base: {
			name: basePower ? basePower.unitName : unit,
			exponent: basePower ? basePower.exponent : 1
		},
		divisor: {
			name: divisorPower ? divisorPower.unitName : '1',
			exponent: divisorPower ? divisorPower.exponent : 1,
		}
	};
}

export function _getExponantialUnits(unit) {
	const [_, unitName, exponent] = unit?.match(/([a-zA-z]+)(\d*$)/) || [];
	if (unitName) {
		return {
			unitName,
			exponent: +exponent || 1
		};
	}
	return undefined;
}

export function _breakCompoundUnit(unit) {
	unit = unit.trim();
	if (!unit.includes('/')) {
		return { baseUnit: unit, divisorUnit: '1' }
	}

	const parts = unit.split('/').map(s => s.trim()).filter(Boolean); // Split and trim parts

	if (parts.length === 4) {
		return { baseUnit: parts.slice(0, 2).join('/'), divisorUnit: parts.slice(2, 4).join('/') };
	}

	else if (parts.length === 3) {
		const firstTwoAsUnit = parts.slice(0, 2).join('/').replace(/\d+/g, ''); // First two parts combined
		const lastTwoAsUnit = parts.slice(1, 3).join('/').replace(/\d+/g, ''); // Last two parts combined

		if (firstTwoAsUnit in units) {
			return { baseUnit: parts.slice(0, 2).join('/'), divisorUnit: parts[2] };
		}
		// Check if last two parts form a valid unit (without digits)
		else if (lastTwoAsUnit in units) {
			return { baseUnit: parts[2], divisorUnit: parts.slice(0, 2).join('/') };
		}
	}
	else if (parts.length === 2) {
		return { baseUnit: parts[0], divisorUnit: parts[1] };
	}

	return undefined;
}
