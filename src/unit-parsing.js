/**
 * @param {string} unit
 * 
 */
export function parseUnit(unit) {
	let compound = _breakCompoundUnit(unit);
	let baseExpo = _getExponantialUnits(compound.baseUnit);
	let divisorExpo = _getExponantialUnits(compound.divisorUnit);

	return {
		base: {
			name: baseExpo ? baseExpo.unitName : unit,
			exponent: baseExpo ? baseExpo.exponent : 1
		},
		divisor: {
			name: divisorExpo ? divisorExpo.unitName : '1',
			exponent: divisorExpo ? divisorExpo.exponent : 1,
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
	if (!unit.includes('/')) {
		return { baseUnit: unit.trim(), divisorUnit: '1' };
	}

	const parts = unit.split('/').map(s => s.trim()).filter(Boolean);

	if (parts.length === 2) {
		return { baseUnit: parts[0], divisorUnit: parts[1] };
	} else if (parts.length > 2) {
		const baseUnit = parts[0];
		const divisorUnit = parts.slice(1).join('/');
		return { baseUnit, divisorUnit };
	}

	return undefined; // Return undefined for unhandled cases
}
