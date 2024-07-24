import { evaluate } from './../src/evaluate.js'
test("", () => {
	const tCase = (value, expected) => {
		return { value, exp: expected }
	}
	const tests = [
		tCase('1 * 2', 2),
		tCase('1h to min', '60 min'),
		tCase('25 km/s to m/s', '25000 m/s')
	]
	tests.forEach((test) => {
		const { value, exp } = test
		expect(evaluate(value)).toBe(exp)
	})


	expect(() => evaluate('20km to h')).toThrowError("the units are not the same category")
	expect(evaluate('now')).toBe((new Date()).toLocaleString())
})
