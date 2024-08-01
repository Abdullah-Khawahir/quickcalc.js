import { evaluate } from './../src/evaluate.js'
const tCase = (value, expected) => {
	return { value, exp: expected }
}
const tests = [
	// Simple arithmetic
	tCase('1 * 2', 2),
	tCase('(10 * 10)/3', 100 / 3),
	tCase('10 / 0', Infinity),
	tCase('5 + 3', 8),
	tCase('10 - 2', 8),
	tCase('2**3', 8),

	// Unit conversions
	tCase('1h to min', '60 min'),
	tCase('25 km/s to m/s', '25000 m/s'),
	tCase('(25*4) km/s to km/s', '100 km/s'),
	tCase('10000 cm2 to m2', '1 m2'),
	tCase('(100 * 100) cm2 to m2', '1 m2'),
	tCase('(100 * 100) cm2 to meters2', '1 meters2'),
	tCase('1 km to m', '1000 m'),
	tCase('1 kg to g', '1000 g'),
	tCase('1000 g to kg', '1 kg'),
	tCase('1 m to cm', '100 cm'),
	tCase('1 m2 to cm2', '10000 cm2'),
	tCase('1 m3 to cm3', '1000000 cm3'),
	tCase('1 l to ml', '1000 ml'),

	// Edge cases
	tCase('   ', ''),
	tCase('0 / 1', 0),
	tCase('1 / 0', Infinity),
	tCase('0 * 0', 0),
	tCase('1 - 1', 0),
	tCase('1 + 0', 1),
	tCase('0 - 1', -1),

	// Complex expressions
	tCase('(5 + 3) * 2', 16),
	tCase('2**3 + 1', 9),
	tCase('(1 + 2) * (3 / 4)', 2.25),
	tCase('((2 + 3) * 4) / 2', 10),
	tCase('(4**2) / (2 + 2)', 4),

	// Mixed unit conversions
	tCase('60 min to h', '1 h'),
	tCase('3600 s to h', '1 h'),
	tCase('100 cm to m', '1 m'),
	tCase('2 h to min', '120 min'),
	tCase('1000 ml to l', '1 l'),
	tCase('1 day to h', '24 h'),
	tCase('1 week to days', '7 days'),
	tCase('1 year to days', '365.25 days')

]

tests.forEach((testCase) => {
	const { value, exp } = testCase
	const got = evaluate(value)
	test(`test for value: ${value}. Expected: ${exp}, Got:${got}`, () => {
		expect(got)
			.toBe(exp.toString())
	})

})

// Additional exception tests

// import { evaluate } from './../src/evaluate.js'
// test("evaluate function", () => {
// 	const tCase = (value, expected) => {
// 		return { value, exp: expected }
// 	}
// 	const tests = [
// 		tCase('1 * 2', 2),
// 		tCase('(10 * 10)/3', 100 / 3),
// 		tCase('(10 /0)', Infinity),
//
// 		tCase('1h to min', '60 min'),
// 		tCase('25 km/s to m/s', '25000 m/s'),
// 		tCase('(25*4) km/s to km/s', '100 km/s'),
// 		tCase('10000 cm2 to m2', '1 m2'),
// 		tCase('( 100 * 100) cm2 to m2', '1 m2'),
// 		tCase('( 100 * 100) cm2 to meters2', '1 meters2'),
// 		tCase('   ', ''),
// 	]
// 	tests.forEach((test) => {
// 		const { value, exp } = test
// 		expect(evaluate(value)).toBe(exp.toString())
// 	})
//
//
// 	expect(() => evaluate('20km to h')).toThrow("the units are not the same category")
// 	expect(evaluate('now')).toBe((new Date()).toLocaleDateString())
//
// })
