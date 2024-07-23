import { expect, test } from '@jest/globals';
import { evaluate } from './../src/binder'
test("", () => {
	expect(evaluate('1 * 2')).toBe(2)
	expect(evaluate('1h to min')).toBe('60 min')
	expect(() => evaluate('20km to h')).toThrowError("the units are not the same category")

	expect(evaluate('now')).toBe((new Date()).toLocaleString())
})
