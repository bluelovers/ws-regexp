
const rePinyinLike = /[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]+/;

const rePinyinLikeFull = /^[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]+$/;

const rePinyinChar = /[^\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]/;

const reNotPinyinChar = /[^\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]/;

export {
	rePinyinLikeFull,
	rePinyinLike,
	rePinyinChar,
	reNotPinyinChar,
}

export function isPinyinLike(input: string)
{
	return rePinyinLikeFull.test(input)
}

export function matchPinyinLike(input: string)
{
	return rePinyinLike.exec(input)
}

export function replacePinyinChar(input: string, fn: ((...args: string[]) => string) | string)
{
	return input.replace(rePinyinChar, fn as any)
}

export function replaceNotPinyinChar(input: string, fn: ((...args: string[]) => string) | string)
{
	return input.replace(reNotPinyinChar, fn as any)
}

export default isPinyinLike
