import { evaluate } from './../src/evaluate.js'
test("evaluate function", () => {
	const tCase = (value, expected) => {
		return { value, exp: expected }
	}
	const tests = [
		tCase('1 * 2', 2),
		tCase('(10 * 10)/3', 100 / 3),
		tCase('(10 /0)', Infinity),

		tCase('1h to min', '60 min'),
		tCase('25 km/s to m/s', '25000 m/s'),
		tCase('(25*4) km/s to km/s', '100 km/s'),
		tCase('10000 cm2 to m2', '1 m2'),
		tCase('( 100 * 100) cm2 to m2', '1 m2'),
		tCase('( 100 * 100) cm2 to meters2', '1 meters2'),
		tCase('   ', ''),
	]
	tests.forEach((test) => {
		const { value, exp } = test
		expect(evaluate(value)).toBe(exp.toString())
	})


	expect(() => evaluate('20km to h')).toThrow("the units are not the same category")
	expect(evaluate('now')).toBe((new Date()).toLocaleDateString())

})
