import { units, areTimeUnits } from './units.js'
import { convert } from './convert.js';
/**
 * @param {Event} evnt name
 * @param {eventType} the name of the event which is used tp listen e.g. click, change or input etc...
 * @param {string} suffix is the char which enable the handling and parsing
 * @param {string} trigger is charcheter which tells the function to calculate
 * 					expression
 * @param {(err:Error)=>void} onError 
 * */
export function bind(evnt, eventType, suffix, trigger, onError) {
	if (evnt.type !== eventType) {
		return;
	}
	const input = evnt.target?.value
	if (!input) {
		return;
	}
	if (!input.startsWith(suffix)) {
		return;
	}
	if (evnt.data === trigger) {

		try {
			const evaluation = evaluate(input.slice(1, input.length - 1))
			if (evaluation)
				evnt.target.value = evaluation
		} catch (err) {
			if (onError) onError(err)
		}
	}
}

/**
 * @param {string} input 
	* */
function evaluate(input) {
	let result = undefined;
	const chars = '0123456789+-*/_,.%()'.split('')
	const keywords = [
		'to',
		...Object.keys(units),
	]

	const hasUnkown = input.split(' ')
		.map(word => word.replace(/\d+/g, '').trim())
		.filter((word) => word && !keywords.includes(word) && !chars.includes(word))

	if (hasUnkown.length) {
		throw new Error(`Unkown token '${hasUnkown}' in '${input}'`)
	}

	if (input.includes(' to ')) {
		// 1 meter to cm = 100 cm
		const value = input.match(/\d+/).toString()
		const fromUnit = input.split(value)[1].split('to')[0].trim()
		const toUnit = input.split('to').at(-1).trim()

		if (!value || !fromUnit || !toUnit) {
			throw new Error(`Invalid syntax fromValue:'${fromUnit}' toUnit:'${toUnit}'`)
		}
		if (areTimeUnits(fromUnit, toUnit)) {
			return `${convert(+value, fromUnit.trim(), toUnit.trim())} ${toUnit}`
		}
		return `${convert(+value, fromUnit.trim(), toUnit.trim())} ${toUnit}`
	} else {
		return scopedExpr(input, units)
	}

}
//NOTE: copied from stackoverflow https://stackoverflow.com/a/75587774
function scopedExpr(src, ctx) {
	const scope = Object.assign(Object.keys(globalThis).reduce((acc, k) => {
		acc[k] = undefined; return acc
	}, {})
		, ctx)
	return (new Function("with(this) { return (" + src + ") }")).call(scope)
}
