import { breakCompoundUnit } from "../src/units";



function tCase(unit, u1, u2) {
	return { unit, unit1: u1, unit2: u2 }
}
test("", () => {
	const tests = [
		tCase('byte per s', 'byte', 's'),
		tCase('byte per min', 'byte', 'min'),
		tCase('byte per hour', 'byte', 'hour'),

		tCase('byte/hour', 'byte', 'hour'),
		tCase('byte/min', 'byte', 'min'),

		tCase('km/s', 'km', 's'),
	]
	tests.forEach((test) => {
		const { unit, unit1, unit2 } = test
		expect(breakCompoundUnit(unit)).toStrictEqual({ unit1, unit2 })
	})

})
