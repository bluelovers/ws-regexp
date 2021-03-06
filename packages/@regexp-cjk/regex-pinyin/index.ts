
const rePinyinLike = /[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf\u0300-\u0308\u0363-\u036f]*/;

const rePinyinLikeFull = /^(?:[a-zA-Z][\u0304\u0300]?|[\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9])(?:(?:[a-zA-Z][\u0300-\u0308\u0363-\u036f]?|[\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf'])*[12345]?)?$/;

const rePinyinChar = /[\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf\u0300-\u0308\u0363-\u036f]/;

const reNotPinyinChar = new RegExp(rePinyinChar.source.replace(/^\[(?!^)/, '[^'));

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
