import { evaluate } from './evaluate.js'
/**
 * @param {HTMLInputElement } htmlElement
 * @param {(err:Error)=>void} onError 
 * @returns {string | undefined} the result or undefined otherwise
 * @throws mulitple erros 
 * */
export function evaluateElement(htmlElement, onError) {
	const input = htmlElement?.value
	if (!input) {
		return undefined;
	}
	try {
		const evaluation = evaluate(input)
		if (evaluation) return evaluation;
	} catch (err) {
		if (onError !== undefined) onError(err)
	}
	return undefined;
}

/**
 * @param {HTMLInputElement } element name
 * @param {(err:Error)=>void} onError 
 * @returns {string | undefined} the result or undefined otherwise
 * @throws mulitple erros 
 * */
export function evaluateString(input, onError) {
	try {
		const evaluation = evaluate(input)
		if (evaluation) return evaluation
	} catch (err) {
		if (onError !== undefined) onError(err)
	}
	return undefined;
}
