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
export function evaluateStringExpression(stringExpr, onError) {
	try {
		const evaluation = evaluate(stringExpr)
		if (evaluation) return evaluation
	} catch (err) {
		if (onError !== undefined) onError(err)
	}
	return undefined;
}
/**
 *
 * @param {HTMLElementTagNameMap | MathMLElementTagNameMap |SVGElementTagNameMap | string } sourceSelector
 * @param {HTMLElementTagNameMap | MathMLElementTagNameMap |SVGElementTagNameMap | string } destinationSelector
 * @param {(err:Error) =>void} onError 
 * @throws when the parameters are not found 
 * @throws when exprSrc element does not contain 'value' or 'innerText' fields
 */
export function bindHtmlElements(sourceSelector, destinationSelector, onError) { // TODO: better errors and var names
	const sourceElement = document.querySelector(sourceSelector)
	const destinationElement = document.querySelector(destinationSelector)
	try {
		if (!sourceElement) {
			throw new Error(`Source element not found for selector: ${sourceSelector}`);
		}
		if (!destinationElement) {
			throw new Error(`Destination element not found for selector: ${destinationSelector}`);
		}
		if (!('value' in sourceElement) && !('innerText' in sourceElement)) {
			throw new Error(`Source element does not have 'value' or 'innerText' fields`);
		}
		sourceElement.addEventListener('input', (e) => {
			try {
				const inputToEvaluate = e.target.value?.trim();
				const evaluation = evaluate(inputToEvaluate);
				if ('value' in destinationElement) {
					if (evaluation && evaluation.trim() !== inputToEvaluate.trim()) {
						destinationElement.value = evaluation;
					}
				} else if ('innerText' in destinationElement) {
					if (evaluation && evaluation.trim() !== inputToEvaluate) {
						destinationElement.innerText = evaluation;
					}
				} else {
					throw new Error(`Destination element does not have 'value' or 'innerText' fields`);
				}
			} catch (err) {
				if ('value' in destinationElement) {
					destinationElement.value = ''
				} else if ('innerText' in destinationElement) {
					destinationElement.innerText = ''
				}
				if (onError) onError(err)
			}
		})
	} catch (err) {
		if (onError) onError(err)
	}
}
