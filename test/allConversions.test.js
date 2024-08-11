import { allCategories } from './../src/units.js'
import { convert } from './../src/convert.js'

test('runs all posible conversions', () => {
	const start = Date.now()
	let operations = 0
	let tests = []
	let errors = []
	allCategories.forEach(units => {
		let test = ""
		const u = Object.keys(units)
		const visited = {}
		for (let i = 0; i < u.length; ++i) {
			for (let ii = 0; ii < u.length; ++ii) {
				const from = u[i]
				const to = u[ii]
				const key = `${from}-${to}`
				const reversedKey = `${to}-${from}`
				if (!(key in visited || reversedKey in visited)) {
					test = `${from} to ${to} = `
					try {
						test += convert(1e6, from, to)
					} catch (err) {
						test += err.message
						errors.push(err.message)
					} finally {
						tests.push(test)
						operations++;
					}
					visited[key] = true
				}
			}
		}
	})
	let finish = Date.now() - start
	if (errors.length) {
		console.table(errors)
	}
	console.log("%s ms", finish)
	console.log("%s op/s", operations / (finish / 1000))
	expect(errors.length).toEqual(0)
})
