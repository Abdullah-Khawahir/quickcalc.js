import { units, timeUnits, areTimeUnits } from "./units.js"
import { convert } from './convert.js'

/**
 * @param {string} input 
 * @returns {Array<string>}
 * */
export function syntaxToken(input) {
	const numberPattern = /\d+(?:\.\d+)?/;  // Matches integers and floating-point numbers
	const keywordPattern = /\bto\b/;        // Matches the keyword "to"
	const exponentiationPattern = /\*\*/;   // Matches the exponentiation operator '**'
	const operatorPattern = /[\+\-\*/\^\(\)]/;  // Matches arithmetic operators +, -, *, /, and ^
	const compoundUnitPattern = /[a-zA-Z]+\d+/; // Matches compound units like m2, cm2, cm3
	const unitPattern = /[a-zA-Z]+(?:\/[a-zA-Z]+)?/; // Matches simple units and compound units without exponents

	// Combined regex to match all token types
	const combinedPattern = new RegExp([
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

	tokens.forEach((item, index, arr) => {
		// Always push the current item
		ret.push(item);

		// If current item is not an operator and the next item is not an operator
		if (index + 1 < arr.length && !operators.has(item) && !operators.has(arr[index + 1])) {
			ret.push('*');
		}
	});

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
		// if(tokens.includes('since')) {}
		let date = new Date()
		date.setMilliseconds(ScopedJsEval(tokens.join(' '), timeUnits))
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
		throw new Error(`JavaScriptError faild to evalute "${src}" : ${err.message}`)
	}
	return evaluation.toString()
}
