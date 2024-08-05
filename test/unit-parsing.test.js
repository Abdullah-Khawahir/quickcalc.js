import { _breakCompoundUnit, _getExponantialUnits, parseUnit } from "../src/unit-parsing.js";
function c(unit, upper, uexp, lower, lexp) {
	return {
		base: {
			name: upper,
			exponent: +uexp
		},
		divisor: {
			name: lower,
			exponent: +lexp
		},
		givien: unit
	}
}
const testCases = [
	c("km/s", 'km', 1, 's', 1),
	c("km/s2", 'km', 1, 's', 2),
	c("km2/s", 'km', 2, 's', 1),
	c("km2/s2", 'km', 2, 's', 2),
	c("mm4/s2", 'mm', 4, 's', 2),
	c("mm4", 'mm', 4, '1', 1),
	c("m4", 'm', 4, '1', 1),
	c("m", 'm', 1, '1', 1),
]
testCases.forEach(t => {
	const got = parseUnit(t.givien);
	const expected = { base: t.base, divisor: t.divisor };
	test(`
Input: ${t.givien}
Got: ${got.base.name + got.base.exponent + '/' + got.divisor.name + got.divisor.exponent}
Expected: ${expected.base.name + expected.base.exponent + '/' + expected.divisor.name + expected.divisor.exponent}`, () => {
		expect(got).toEqual(expected);
	});
});


function GECase(unit, name, expo) {
	return { unit, name, expo }
}
const getExponantialUnitTestCases = [
	GECase('cm3', 'cm', 3),
	GECase('km2', 'km', 2),
	GECase('m2', 'm', 2),
	GECase('mm3', 'mm', 3),
	GECase('dm2', 'dm', 2),
	GECase('m3', 'm', 3),
	GECase('km3', 'km', 3),
	GECase('cm2', 'cm', 2),
	GECase('mm2', 'mm', 2),
	GECase('dm3', 'dm', 3),
	GECase('ft2', 'ft', 2),
	GECase('ft3', 'ft', 3),
	GECase('in2', 'in', 2),
	GECase('in3', 'in', 3),
	GECase('yd2', 'yd', 2),
	GECase('yd3', 'yd', 3),
	GECase('mi2', 'mi', 2),
	GECase('mi3', 'mi', 3),
	GECase('nm2', 'nm', 2),
	GECase('nm3', 'nm', 3),
	GECase('cm32', 'cm', 32),
	GECase('km56', 'km', 56),
	GECase('m8', 'm', 8),
	GECase('mm45', 'mm', 45),
	GECase('dm23', 'dm', 23),
	GECase('m10', 'm', 10),
	GECase('km12', 'km', 12),
	GECase('cm5', 'cm', 5),
	GECase('mm7', 'mm', 7),
	GECase('dm19', 'dm', 19),
	GECase('ft6', 'ft', 6),
	GECase('ft18', 'ft', 18),
	GECase('in4', 'in', 4),
	GECase('in22', 'in', 22),
	GECase('yd11', 'yd', 11),
	GECase('yd15', 'yd', 15),
	GECase('mi3', 'mi', 3),
	GECase('mi21', 'mi', 21),
	GECase('nm13', 'nm', 13),
	GECase('nm29', 'nm', 29)
]

getExponantialUnitTestCases.forEach(testCase => {
	const { unit, name, expo } = testCase
	const got = _getExponantialUnits(unit)
	test(`Unit: ${unit} , Expected: ${name + expo} , Got: ${got.unitName + got.exponent}`, () => {
		expect(got)
			.toEqual({ unitName: name, exponent: expo })
	})

})

function bcCase(unit, u1, u2) {
	return { unit, unit1: u1, unit2: u2 }
}
const breakCompundTestCases = [
	bcCase('byte per s', 'byte', 's'),
	bcCase('byte per min', 'byte', 'min'),
	bcCase('byte per hour', 'byte', 'hour'),

	bcCase('byte/hour', 'byte', 'hour'),
	bcCase('byte/min', 'byte', 'min'),

	bcCase('km/s', 'km', 's'),
	bcCase('m/s', 'm', 's'),
	bcCase('cm/min', 'cm', 'min'),
	bcCase('mm/hour', 'mm', 'hour'),
	bcCase('g/day', 'g', 'day'),
	bcCase('kg/week', 'kg', 'week'),
	bcCase('L/month', 'L', 'month'),
	bcCase('J/year', 'J', 'year'),

	bcCase('kWh/day', 'kWh', 'day'),
	bcCase('N/m2', 'N', 'm2'),
	bcCase('W/m2', 'W', 'm2'),
	bcCase('Pa/s', 'Pa', 's'),
	bcCase('A/mm', 'A', 'mm'),

	bcCase('Mbps/s', 'Mbps', 's'),
	bcCase('GB/hour', 'GB', 'hour'),
	bcCase('TB/day', 'TB', 'day'),
	bcCase('m3/min', 'm3', 'min'),
	bcCase('cm3/hour', 'cm3', 'hour'),

	// Additional cases
	bcCase('ft/s', 'ft', 's'),
	bcCase('mi/hour', 'mi', 'hour'),
	bcCase('yd/min', 'yd', 'min'),
	bcCase('in/day', 'in', 'day'),
	bcCase('oz/week', 'oz', 'week'),
	bcCase('lb/month', 'lb', 'month'),
	bcCase('cal/year', 'cal', 'year'),

	bcCase('kcal/day', 'kcal', 'day'),
	bcCase('psi/min', 'psi', 'min'),
	bcCase('hp/hour', 'hp', 'hour'),
	bcCase('mL/s', 'mL', 's'),
	bcCase('km3/year', 'km3', 'year'),

	bcCase('g/L', 'g', 'L'),
	bcCase('mg/mL', 'mg', 'mL'),
	bcCase('kPa/cm2', 'kPa', 'cm2'),
	bcCase('J/kg', 'J', 'kg'),
	bcCase('W/kg', 'W', 'kg'),

	bcCase('km/h', 'km', 'h'),
	bcCase('m/min', 'm', 'min'),
	bcCase('cm/s', 'cm', 's'),
	bcCase('mm/ms', 'mm', 'ms'),
	bcCase('nm/ps', 'nm', 'ps')
]
breakCompundTestCases.forEach((testCase) => {
	const { unit, unit1, unit2 } = testCase
	const got = _breakCompoundUnit(unit)
	test(`input :${unit} ,Expected: ${unit1} , ${unit2} , Got: ${got.baseUnit + '/' + got.divisorUnit} `, () => {
		expect(got)
			.toStrictEqual({ baseUnit: unit1, divisorUnit: unit2 })
	})
})

