/**
 * Created by user on 2018/4/28/028.
 */

/**
 * Created by user on 2018/4/28/028.
 */

import { createRegExp, ITypeCreateRegExp } from '../index';

export type IRegExpStatic = typeof RegExp & {

	/**
	 * RegExp.input ($_)
	 *
	 * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched.
	 * RegExp.$_ is an alias for this property.
	 *
	 * @code var re = /hi/g;
	 re.test('hi there!');
	 RegExp.input;         // "hi there!"
	 re.test('foo');       // new test, non-matching
	 RegExp.$_;            // "hi there!"
	 re.test('hi world!'); // new test, matching
	 RegExp.$_;            // "hi world!"
	 */
	input: string,
	$_: string,

	/**
	 * RegExp.lastMatch ($&)
	 *
	 * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters.
	 * RegExp.$& is an alias for this property.
	 *
	 * @code var re = /hi/g;
	 re.test('hi there!');
	 RegExp.lastMatch; // "hi"
	 RegExp['$&'];     // "hi"
	 */
	lastMatch: string,
	'$&': string,

	/**
	 * RegExp.lastParen ($+)
	 *
	 * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any.
	 * RegExp.$+ is an alias for this property.
	 *
	 * @code var re = /(hi)/g;
	 re.test('hi there!');
	 RegExp.lastParen; // "hi"
	 RegExp['$+'];     // "hi"
	 */
	lastParen: string,
	'$+': string,

	/**
	 * RegExp.leftContext ($`)
	 *
	 * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match.
	 * RegExp.$` is an alias for this property.
	 *
	 * @code var re = /world/g;
	 re.test('hello world!');
	 RegExp.leftContext; // "hello "
	 RegExp['$`'];       // "hello "
	 */
	leftContext: string,
	'$`': string,

	/**
	 * RegExp.rightContext ($')
	 *
	 * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match.
	 * RegExp.$' is an alias for this property.
	 *
	 * @code var re = /hello/g;
	 re.test('hello world!');
	 RegExp.rightContext; // " world!"
	 RegExp["$'"];       // " world!"
	 */
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

	input: false,
	$_: false,

	lastMatch: false,
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
