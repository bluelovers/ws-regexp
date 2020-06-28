/**
 * Created by user on 2018/4/26/026.
 */

import { ICreateRegExp, ITypeCreateRegExp } from './index';

export enum FlagsName
{
	multiline = 'm',
	m = 'm',

	global = 'g',
	g = 'g',

	ignoreCase = 'i',
	i = 'i',

	// ---------------

	sticky = 'y',
	y = 'y',

	unicode = 'u',
	u = 'u',

	// ---------------

	/**
	 * dot match all mode
	 * node.js 10
	 *
	 * @link http://2ality.com/2017/07/regexp-dotall-flag.html
	 * @code
	 * /^.$/.test('\n') // => false
	 * /^.$/s.test('\n') // => true
	 * /^[^]$/.test('\n') // => true
	 *
	 * @type {string}
	 */
	dotAll = 's',
	s = 's',

	// ---------------

	freeSpacing = 'x',
	x = 'x',

	n = 'n',

}

Object
	.keys(FlagsName)
	.forEach(function (v)
	{
		// @ts-ignore
		FlagsName[FlagsName[v]] = FlagsName[v];
	})
;

export const FlagsPattern: {
	[k in keyof typeof FlagsName]?: {
		0: string,
		1: string,
		2: boolean | any,
		3?: string | IFlagsPatternTestFn,
	}[]
} = {
	s: [
		['^.$', '\n', true],
	],
};

export interface IFlagsPatternTestFn
{
	<T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string): boolean,
}

export default FlagsName;
