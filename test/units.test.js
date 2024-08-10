import { areSameCatagory } from "../src/units";

[
	"km m",
	"meter cm",
	"mm cm",
	"mm4 cm4",
	"mm4 cm4",
	"min h",
].forEach(testCase => {
	const [u1, u2] = testCase.split(' ');
	const got = areSameCatagory(u1, u2)
	test(`input ${testCase.split(' ')} got: ${got} expected:${true}`, () => {
		expect(got).toEqual(true)
	})
});
[
	"km mL",
	"km A",
	"oz nm",
	"N m",
	"mile kg",
].forEach(testCase => {
	const [u1, u2] = testCase.split(' ');
	const got = areSameCatagory(u1, u2)
	test(`input ${testCase.split(' ')} got: ${got} expected:${true}`, () => {
		expect(got).toEqual(false)
	})
});

