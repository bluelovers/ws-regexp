/**
 * Created by user on 2018/4/28/028.
 */

import { createRegExp, ITypeCreateRegExp } from '../index';

export type IRegExpPrototype = RegExp & {

	dotAll?: boolean,

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
	let r = createRegExp('', '', RegExpClass);

	return Object.keys(PROTOTYPE)
		.reduce(function (a, b)
		{
			a[b] = (b in r);

			return a;
		}, {} as typeof PROTOTYPE)
	;
}

import * as self from './prototype';
export default self;
