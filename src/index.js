import { stringToIcon, validateIcon } from '@iconify/core/lib/icon/name';

export function cleanIconName(name) {
	if (typeof name === 'string') {
		name = stringToIcon(name);
	}
	return name === null || !validateIcon(name) ? null : name;
}

function testIcon(name) {
	const cleaned = cleanIconName(name);
	console.log('Testing:', cleaned);
	return cleaned;
}

module.exports = {
	testIcon,
};
