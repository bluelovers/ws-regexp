/**
 * Created by user on 2018/4/28/028.
 */

/**
 * Created by user on 2018/4/28/028.
 */

import { createRegExp, ITypeCreateRegExp } from '../index';

export type IRegExpStatic = typeof RegExp & {

	input: string,
	$_: string,

	lastMatch: string,
	'$&': string,
	lastParen: string,
	'$+': string,
	leftContext: string,
	'$`': string,
	rightContext: string,
	'$\'': string,

}

export type IRegExpStatic2 = IRegExpStatic & {

	$10?: string,
	$100?: string,

}

export const REGEXP_STATIC = {

	$1: false,
	$2: false,
	$3: false,
	$4: false,
	$5: false,
	$6: false,
	$7: false,
	$8: false,
	$9: false,

	lastMatch: false,

	input: false,

	$_: false,
	'$&': false,
	lastParen: false,
	'$+': false,
	leftContext: false,
	'$`': false,
	rightContext: false,
	'$\'': false,

	$10: false,
	$100: false,

} as {
	[k in keyof IRegExpStatic2]?: boolean
};

// @ts-ignore
export function testStatic<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp)
{
	let r = RegExpClass;

	return Object.keys(REGEXP_STATIC)
		.reduce(function (a, b)
		{
			a[b] = (b in r);

			return a;
		}, {} as typeof REGEXP_STATIC)
		;
}

import * as self from './static';

export default self;
