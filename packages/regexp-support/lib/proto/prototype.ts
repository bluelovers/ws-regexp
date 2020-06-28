/**
 * Created by user on 2018/4/28/028.
 */

import { createRegExp, ITypeCreateRegExp } from '../index';

export interface IRegExpPrototype extends RegExp
{
	dotAll: boolean,
}

export const PROTOTYPE = {
	source: false,
	flags: false,

	lastIndex: false,

	dotAll: false,
	global: false,
	ignoreCase: false,
	multiline: false,
	sticky: false,
	unicode: false,

} as {
	[k in keyof IRegExpPrototype]?: boolean
};

// @ts-ignore
export function testPrototype<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp)
{
	const flags = 'g';

	let r = createRegExp('', flags, RegExpClass);

	return Object.keys(PROTOTYPE)
		.reduce(function (a, b)
		{
			switch (b)
			{
				case 'flags':
					// @ts-ignore
					a[b] = (b in r) && r[b] === flags;
					break;
				default:
					a[b] = (b in r);
					break;
			}

			return a;
		}, {} as typeof PROTOTYPE)
	;
}
