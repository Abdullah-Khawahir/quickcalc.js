import { areSameCatagory, isSpeedUnit } from "../src/units";
[// good cases
	"mph",
	"km/s",
	"mile/s",
	"Mach",
	"knot",
	"in/s",
].forEach(testCase => {
	const got = isSpeedUnit(testCase)
	test(`input ${testCase} got: ${got} expected:${true}`, () => {
		expect(got)
			.toEqual(true)
	});
});

[// good cases
	"km m",
	"meter cm",
	"mm cm",
	"mm4 cm4",
	"mm4 cm4",
	"min h"
].forEach(testCase => {
	const [u1, u2] = testCase.split(' ');
	const got = areSameCatagory(u1, u2)
	test(`input ${testCase.split(' ')} got: ${got} expected:${true}`, () => {
		expect(got).toEqual(true);
	});
});

[ //bade cases
	"km mL",
	"km A",
	"oz nm",
	"N m",
	"mile kg",
].forEach(testCase => {
	const [u1, u2] = testCase.split(' ');
	const got = areSameCatagory(u1, u2)
	test(`input ${testCase.split(' ')} got: ${got} expected:${false}`, () => {
		expect(got).toEqual(false)
	})
});

