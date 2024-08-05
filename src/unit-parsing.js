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
	const parts = unit.split(/(per|\/)/i).filter(Boolean);
	if (parts.length === 3) {
		const [unit1, per, unit2] = parts.map(s => s.trim());
		if (['/', 'per'].includes(per.trim())) {
			return { baseUnit: unit1, divisorUnit: unit2 };
		}
	} else if (parts.length > 3) {
		const perIndex = parts.findIndex((item) => ['/', 'per'].includes(item));
		if (perIndex != -1) {
			const [unit1, per, unit2] = parts.slice(perIndex - 1);
			if (['/', 'per'].includes(per.trim())) {
				return { baseUnit: unit1, divisorUnit: unit2 };
			}
		}
	} else if (!unit.includes('/') || !unit.includes('per')) {
		return { baseUnit: unit, divisorUnit: '1' };
	}

	return undefined;
}
