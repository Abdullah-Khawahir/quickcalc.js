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
	const keywords = [
		'to',
		...Object.keys(units),
		"**",				// WARN: the order matters here
		..."()*/+-%",
	]
	const numberPattern = '\\d+\\.\\d+'
	// NOTE: this next line is for some JavaScript bullshit to escape regex symbols like mapping + to \+  
	const regexPattern = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
	const regex = new RegExp(`(${regexPattern}|${numberPattern})`, 'g');

	let tokens = input.split(regex).map(token => token.trim()).filter(Boolean)

	return tokens
	// NOTE: this trasforms the units from '1m' to '1 * m' which evalutates to '1000'
	//
	// let keywordsIndex = []
	// for (let i = 0; i < tokens.length; i++) {
	// 	const token = tokens[i];
	// 	if (Object.keys(units).includes(token)) {
	// 		keywordsIndex.push(i)
	// 	}
	// }
	// const operators = [...'+-*/%', '**'];
	// for (let i = 0; i < tokens.length; i++) {
	// 	const prev = tokens[i - 1];
	// 	const next = tokens[i + 1];
	//
	// 	if (!operators.includes(tokens[i])) {
	// 		if (i > 0 && !operators.includes(prev)) {
	// 			tokens.splice(i, 0, '*');
	// 			i++;
	// 		}
	// 		if (i < tokens.length - 1 && !operators.includes(next)) {
	// 			tokens.splice(i + 1, 0, '*');
	// 			i++;
	// 		}
	// 	}
	// }
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
		let [value, fromUnit, _, toUnit] = tokens
		if (!Number.isInteger(+value)) {
			value = +units[value]
		}
		if (!Number.isInteger(+value)) {
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
		return date.toLocaleString()
	}

	return ScopedJsEval(input, units)
}

// NOTE: copied from stackoverflow https://stackoverflow.com/a/75587774
function ScopedJsEval(src, ctx) {
	let now_date = new Date()
	let yesterday_date = new Date()
	yesterday_date.setMilliseconds(yesterday_date.getMilliseconds - timeUnits['day'])
	let tomorrow_date = new Date()
	tomorrow_date.setMilliseconds(tomorrow_date.getMilliseconds + timeUnits['day'])

	let now = now_date.getMilliseconds()
	let yesterday = yesterday_date.getMilliseconds()
	let tomorrow = tomorrow_date.getMilliseconds()


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
