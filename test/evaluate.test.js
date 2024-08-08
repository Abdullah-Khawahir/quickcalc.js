import { syntaxToken } from './../src/evaluate.js'

	})

}

test("syntax Token function", () => {
	const tCase = (inputCase) => {
		return {
			input: inputCase,
			expected: [...inputCase.split(' ').filter(Boolean)],
		}
	}
	const cases = [
		tCase("1 ** 2 km/s to m/s"),
		tCase("1 ** -2 km/s to m/s"),
		tCase("1 ** +2 km/s to m/s"),
		tCase("1 * m * 2 * 3 * m/s * 1 / s"),
		tCase("2 m2 to cm2"),
		tCase("now * day * 5"),
		tCase("now * day * m2"),
		tCase("44 ** m"),
		tCase("+44 ** m"),
		tCase("-44 ** m"),

		tCase("( 44 ** m ) m to cm"),
		tCase("( 44 ** 2 ) km/s to cm/minute"),
		tCase("( +44 ** m ) m to cm"),
		tCase("( -44 ** 2 ) km/s to cm/minute"),

		tCase(".1 km/s to cm/minute"),
		tCase("+.1 km/s to cm/minute"),
		tCase("-.1 km/s to cm/minute"),

		tCase(".1 * 10 * m * .2 * 10 * 3 * m/s * 1 / s"),
		tCase("+.1 * -10 * m * +.2 * -10 * +3 * m/s * +1 / s"),
		tCase("-.1 * +10 * m * -.2 * +10 * -3 * m/s * +1 / s"),

		tCase("( 4.4e1 ** m ) m to cm"),
		tCase("( 4.4e+10 ** m ) m to cm"),
		tCase("( 4.4e-10 ** m ) m to cm"),
	]

	cases.forEach(testCase => {
		const got = syntaxToken(testCase.input)
		const expected = testCase.expected
		test(`input:${testCase.input}\nexpected:${expected}\ngot:${got}`, () => {
			expect(got).toEqual(expected)
		})
	})
}
