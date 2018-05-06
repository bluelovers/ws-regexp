/**
 * Created by user on 2018/4/26/026.
 */

import { createRegExp, ICreateRegExp, ITypeCreateRegExp } from './index';

export const PatternSupport = {
	namedCapturingGroups: false,
	namedCapturingGroupsUnicode: false,
	namedCapturingGroupsEmoji: false,

	namedCapturingGroupsBackreference: false,
	namedCapturingGroupsDuplicate: false,

	lookAheadPositive: false,
	lookAheadNegative: false,

	lookBehindPositive: false,
	lookBehindNegative: false,

	dotUnicodeEmoji: false,

	classSub: false,
};

export const PatternTest: {
	[k in keyof typeof PatternSupport]?: IPatternTestRow[]
} = {
	/**
	 * A-Z, a-z, 0-9, $, and _
	 */
	namedCapturingGroups: [
		testNamedCapturingGroups('Az'),
		testNamedCapturingGroups('_09'),
		testNamedCapturingGroups('$'),
	],
	namedCapturingGroupsUnicode: [
		testNamedCapturingGroups('naïve嬢の日常'),
		testNamedCapturingGroups('Русский'),
		testNamedCapturingGroups('naïve'),
		testNamedCapturingGroups('嬢の日常'),
		testNamedCapturingGroups('𠬠', 'u'),
	],
	namedCapturingGroupsEmoji: [
		testNamedCapturingGroups('👩', 'u'),
	],

	namedCapturingGroupsBackreference: [
		['^(?<half>.*).\\k<half>$', 'u', 'a*a', true, 'test'],
		['^(?<half>.*).\\k<half>$', 'u', 'a*b', false, 'test'],
	],

	namedCapturingGroupsDuplicate: [
		['^(?:(?<half>b)|(?<half>a)).\\k<half>$', 'u', 'a*a', true, 'test'],
	],

	lookAheadPositive: [
		['aa(?=bb)', '', 'aabb', true, 'test'],
	],

	lookAheadNegative: [
		['aa(?!bb)', '', 'aabb', false, 'test'],
	],

	lookBehindPositive: [
		['(?<=\\$)foo', 'g', '$foo %foo foo', '$ %foo foo', 'replace'],
		['(?<=\\$)foo', 'g', '$foo %foo foo', '$bar %foo foo', function <T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string)
		{
			return input.replace(r, 'bar') === value;
		}],
	],

	lookBehindNegative: [
		['(?<!\\$)foo', 'g', '$foo %foo foo', '$foo % ', 'replace'],
		['(?<!\\$)foo', 'g', '$foo %foo foo', '$foo %bar bar', function <T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string)
		{
			return input.replace(r, 'bar') === value;
		}],
	],

	dotUnicodeEmoji: [

		['^.$', 'u', '😀', true, 'test'],

	],

	/**
	 * @link http://www.wellho.net/regex/javare.html
	 */
	classSub: [
		['[a-z&&[^m-p]]', '', 'm', false, 'test'],
		['[a-z&&[^m-p]]', '', 'a', true, 'test'],
	],
};

export interface IPatternTestFn
{
	<T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string): boolean,
}

export function testPattern(name: string, RegExpClass?: typeof RegExp, testPatterns?: typeof PatternTest): boolean
export function testPattern(name: string, RegExpClass?: ICreateRegExp, testPatterns?: typeof PatternTest): boolean
// @ts-ignore
export function testPattern<T>(name: string, RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest): boolean
{
	if (testPatterns[name] && testPatterns[name].length)
	{
		let bool: boolean = false;

		try
		{
			bool = testPatterns[name].every(function (v)
			{
				let [pattern, flag, input, value, fn] = v;
				let bool: boolean;

				let r = createRegExp(pattern, flag, RegExpClass);

				if (fn)
				{
					if (typeof fn == 'function')
					{
						bool = (fn as IPatternTestFn)(r, value, input, pattern, RegExpClass, flag);
					}
					else
					{
						let ret;

						switch (fn)
						{
							case 'replace':
								ret = input.replace(r, '');

								bool = ret === value;

								break;
							default:
								bool = r[fn](input) === value;
								break;
						}
					}
				}
				else
				{
					bool = r.exec(input) === value;
				}

				//console.log(bool);

				return bool;
			}) === true;

			//console.log(bool);
		}
		catch (e)
		{
			bool = false;
		}

		return bool;
	}

	return null;
}

export function testNamedCapturingGroups(key: string, flags?: string): IPatternTestRow
{
	return [`U\\+(?<${key}>[0-9A-F]{4})`, flags || '', 'U+2620', {
		groups: { [key]: '2620' },
	}, function (r, value, input)
	{
		let ret = r.exec(input) as RegExpExecArray & {
			groups: {
				[key: string]: string,
			}
		};

		return ret.groups && Object
			.entries(ret.groups)
			.every(function (v)
			{
				let [key, v1] = v;
				let v2 = value.groups[key];

				//console.log(key, v1, v2, v1 === v2);

				return v1 === v2;
			})
			;
	}];
}

export interface IPatternTestRow
{
	0: string,
	1: string,
	2: string,
	3: boolean | any,
	4?: string | IPatternTestFn,
}

import * as self from './pattern';
export default self;
