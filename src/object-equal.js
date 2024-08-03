export function eq(a, b) {
	if (typeof a !== typeof b) return false;
	if (a === null || b === null || typeof a !== 'object') {
		return a === b;
	}

	if (Array.isArray(a)) {
		if (!Array.isArray(b) || a.length !== b.length) {
			return false;
		}
		for (let i = 0; i < a.length; i++) {
			if (!eq(a[i], b[i])) {
				return false;
			}
		}
		return true;
	}

	const keys1 = Object.keys(a);
	const keys2 = Object.keys(b);

	if (keys1.length !== keys2.length) {
		return false;
	}
	for (let key of keys1) {
		if (!keys2.includes(key) || !eq(a[key], b[key])) {
			return false;
		}
	}

	return true;
}
