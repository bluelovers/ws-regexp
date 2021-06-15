/**
 * Created by user on 2018/4/26/026.
 */

import { ICreateRegExp, ITypeCreateRegExp } from './index';
import {} from '@regexp-cjk/types';

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

	indices = 'd',
	d = 'd',

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

	d: [
		[
			'a+(?<Z>z)?', 'xaaaz', null, (re, value, input, pattern, RegExpClass, flag, ...argv) =>
		{
			let ret: RegExpExecArray<'Z'> = re.exec(input);

			if (
				ret.indices[0][0] === 1
				&& ret.indices[0][1] === 5
				&& ret.indices[1][0] === 4
				&& ret.indices[1][1] === 5
				&& ret.indices.groups.Z[0] === 4
				&& ret.indices.groups.Z[1] === 5
			)
			{
				return true;
			}

			return false;
		},
		],
	],

};

export interface IFlagsPatternTestFn
{
	<T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string): boolean,
}

export default FlagsName;
