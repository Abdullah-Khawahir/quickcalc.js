import { units, timeUnits, areTimeUnits } from "./units.js"
import { convert } from './convert.js'

/**
 * @param {string} input 
 * @returns {Array<string>}
 * */
export function syntaxToken(input) {
	const exponentialNumberPattern = /[-+]?\d*\.?\d+e[-+]?\d+/i;  // Matches 10e1, -10.35e+2, -.33e7, .02e3 etc.
	const numberPattern = /[-+]?(?:\d+\.\d*|\.\d+|\d+)/;  // Matches -10, +10.35, -.33, etc.
	const keywordPattern = /\bto\b/;        // Matches the keyword "to"
	const exponentiationPattern = /\*\*/;   // Matches the exponentiation operator '**'
	const operatorPattern = /[\+\-\*/\^\(\)]/;  // Matches arithmetic operators +, -, *, /, and ^
	const compoundUnitPattern = /[a-zA-Z]+\d+/; // Matches compound units like m2, cm2, cm3
	const unitPattern = /[a-zA-Z]+\d?(?:\/[a-zA-Z]+\d?)?/; // Matches simple units and compound units with exponents

	// Combined regex to match all token types
	const combinedPattern = new RegExp([
		exponentialNumberPattern.source,
		numberPattern.source,
		keywordPattern.source,
		exponentiationPattern.source,
		operatorPattern.source,
		compoundUnitPattern.source,
		unitPattern.source
	].join('|'), 'g');
	const tokens = [];
	let match;

	// Use the regex to find all matches in the expression
	while ((match = combinedPattern.exec(input)) !== null) {
		// Append the matched token to the tokens array
		tokens.push(match[0]);
	}
	return tokens;
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
 * @param {Array<string>} tokens
 */
function addImplicitMultiplication(tokens) {
	const ret = [];
	const operators = new Set(['**', '-', '/', '*', '+', ..."()"]);

	for (let i = 0; i < tokens.length; ++i) {
		const item = tokens[i]
		ret.push(item)

		if (i + 1 < tokens.length && !operators.has(item) && !operators.has(tokens[i + 1])) {
			ret.push('*');
		}
	}
	return ret;
}
/**
 * @param {string} input 
 * @returns {string} the evaluated value
 * @throws when the syntax wrong 
 * @throws when the fails to evaluate JavaScript
 * 
 **/
export function evaluate(input) {
	if (!input.trim()) {
		return ""
	}
	let tokens = syntaxToken(input)
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


	tokens = addImplicitMultiplication(tokens)
	let isTimeExpression = false;
	for (const token of tokens) {
		if (token in timeUnits) {
			isTimeExpression = true
			break;
		}
	}

	if (isTimeExpression) {
		let date = new Date()
		date.setTime(ScopedJsEval(tokens.join(' '), timeUnits))
		return date.toLocaleString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour: 'numeric', minute: 'numeric' });
	}

	return ScopedJsEval(input, units)
}
function isNumber(value) {
	return Number(value) !== NaN
}


function ScopedJsEval(src, ctx) {
	let now_date = new Date()
	let yesterday_date = new Date()
	yesterday_date.setTime(yesterday_date.getTime() - timeUnits['day'])
	let tomorrow_date = new Date()
	tomorrow_date.setTime(tomorrow_date.getTime() + timeUnits['day'])

	let now = now_date.getTime()
	let yesterday = yesterday_date.getTime()
	let tomorrow = tomorrow_date.getTime()


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
		throw new Error(`JavaScriptError faild to evalute "${src}" : ${err.message}`)
	}
	return evaluation
}
