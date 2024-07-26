import { evaluateElement } from './src/binder.js'
console.log('working')

document.querySelector('#in').addEventListener('input', (e) => {
	const res = evaluateElement(e.target, console.error)
	const view = document.querySelector('#res')
	if (res) {
		view.innerHTML = res
	} else {
		view.innerHTML = ''
	}
})
