import { evaluate } from './evaluate.js'
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
			const evaluation = evaluate(input.slice(suffix.length, input.length - trigger.length))
			if (evaluation)
				evnt.target.value = evaluation
		} catch (err) {
			if (onError !== undefined) onError(err)
		}
	}
}
