import { bind } from './src/index.js'
console.log('working')

document.querySelector('#in')
	.addEventListener('input', (e) => {
		bind(e, 'input', '', ';', console.error)
	})
