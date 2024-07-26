import { units, timeUnits, areTimeUnits } from "./units.js"
import { convert } from './convert.js'

/**
 * @param {string} input 
 * @returns {Array<string>}
 * */
export function syntaxToken(input) { // TODO: Test
	if (input.length === 0) {
		return []
	}
	const allUnits = Object.keys(units)
	const keywords = [
		'to',
		...allUnits,
		"**",				// WARN: the order matters here
		..."()*/+-%",
	]
	const numberPattern = '\\d+\\.\\d+'
	const unitPattern = allUnits.join('|')
	const compoundUnitSeparator = ['/', 'per'].join('|')
	// NOTE: this next line is for some JavaScript bullshit to escape regex symbols like mapping + to \+  
	const regexPattern = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
	const regex = new RegExp(`((?:${unitPattern})(?:${compoundUnitSeparator})(?:${unitPattern})|${regexPattern}|${numberPattern})`, 'g');
	let tokens = input.split(regex).map(token => token?.trim()).filter(Boolean)

	return tokens
}

/**
 * @param {string} string 
 * @return {boolean} true if the string is a mathematical expression, false otherwise
 **/
function isMathExpression(string) {
	const mathExpressionPattern = /^[0-9+\-*/().\s]+$/;
	return mathExpressionPattern.test(string);
}
/**
 * @param {string} input 
 * @returns {string} the evaluated value
 * @throws when the syntax wrong 
 * @throws when the fails to evaluate JavaScript
 * 
 **/
export function evaluate(input) {
	const tokens = syntaxToken(input)
	if (tokens.includes('to')) {
		// 1 meter to cm = 100 cm | 1m to cm
		let toKeywordIndex = tokens.indexOf('to')
		let [value, fromUnit, _, toUnit] = tokens.slice(toKeywordIndex - 2)
		let leftOfFromUnit = tokens.slice(0, toKeywordIndex - 1)?.join(' ')

		if (isMathExpression(leftOfFromUnit)) { // if the left of conversion is math expression
			value = evaluate(leftOfFromUnit)
		}
		if (!isNumber(value)) {
			value = units[value]
		}

		if (!isNumber(value)) {
			throw new Error(`${value} is not a number or a known unit`)
		}

		if (value && !fromUnit && toUnit) {
			return `${value} ${toUnit}`
		}

		if (!value || !fromUnit || !toUnit) {
			throw new Error(`Invalid convert syntax ${input}`)
		}

		if (areTimeUnits(fromUnit, toUnit)) {
			return `${convert(+value, fromUnit.trim(), toUnit.trim())} ${toUnit}`
		}

		return `${convert(+value, fromUnit.trim(), toUnit.trim())} ${toUnit}`
	}


	let isTimeExpression = false;
	for (const token of tokens) {
		if (timeUnits[token] !== undefined) {
			isTimeExpression = true
			break;
		}
	}

	if (isTimeExpression) {
		// if(tokens.includes('since')) {}
		let date = new Date()
		date.setMilliseconds(ScopedJsEval(input, timeUnits))
		return date.toLocaleDateString()
	}

	return ScopedJsEval(input, units)
}
function isNumber(value) {
	return Number(value) !== NaN
}
function ScopedJsEval(src, ctx) {
	let now_date = new Date()
	let yesterday_date = new Date()
	yesterday_date.setMilliseconds(yesterday_date.getMilliseconds - timeUnits['day'])
	let tomorrow_date = new Date()
	tomorrow_date.setMilliseconds(tomorrow_date.getMilliseconds + timeUnits['day'])

	let now = now_date.getMilliseconds()
	let yesterday = yesterday_date.getMilliseconds()
	let tomorrow = tomorrow_date.getMilliseconds()


	// NOTE: copied from stackoverflow https://stackoverflow.com/a/75587774
	const scope = Object.assign(Object.keys(globalThis)
		.reduce((acc, k) => {
			acc[k] = undefined; return acc
		}, {})
		, { ...ctx, now, yesterday, tomorrow })
	let evaluation;
	try {
		evaluation = (new Function("with(this) { return (" + src + ") }")).call(scope)
	} catch (err) {
		throw new Error(`JavaScriptError faild to evalute : ${err.message}`)
	}
	return evaluation
}
