/**
 * Created by user on 2018/3/2/002.
 */

let re = /(wor)(ld)/g;
re.test('hello world!');

// @ts-ignore
export const leftContext = _multiEqual(RegExp.leftContext, RegExp['$`'], 'hello ');
// @ts-ignore
export const rightContext = _multiEqual(RegExp.rightContext, RegExp["$'"], '!');
// @ts-ignore
export const lastParen = _multiEqual(RegExp.lastParen, RegExp["$+"], 'ld');
export const lastMatch = _multiEqual(RegExp.lastMatch, RegExp["$&"], 'world');
// @ts-ignore
export const input = _multiEqual(RegExp.input, RegExp["$_"], 'hello world!');

export function _multiEqual(a, b, ...argv)
{
	if (a === b)
	{
		if (argv.length)
		{
			for (let v of argv)
			{
				if (v !== a)
				{
					return false;
				}
			}
		}

		return true;
	}

	return false;
}

import * as self from './support';

export const support = (function (): {
	readonly leftContext: boolean;
	readonly rightContext: boolean;
	readonly lastParen: boolean;
	readonly lastMatch: boolean;
	readonly input: boolean;
}
{
	let s = Object.assign({}, self);
	delete s.default;
	// @ts-ignore
	delete s.support;

	for (let k in s)
	{
		if (/^_/.test(k))
		{
			delete s[k];
		}
	}

	return Object.freeze(s);
})();

export default support;

//console.log(self);
