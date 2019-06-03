/**
 * Created by user on 2018/5/6/006.
 */

import { ICreateRegExp, ITypeCreateRegExp } from '../../index';
import { IPatternTestFn, IPatternTestRow, PatternSupport, testPattern } from '../../pattern';
import { _createFnTestPattern, log_dir } from '../../util/index';
import { _wrapToRegexName } from './index';

import CACHE_BLOCKS from '../cache/blocks';
import CACHE_CATEGORIES from '../cache/categories';
import CACHE_PROPERTIES from '../cache/properties';
import CACHE_SCRIPTS from '../cache/scripts';

export const KEY_PREFIX = '\\p{';
export const KEY_PREFIX_NEGATION = '\\P{';
export const KEY_SUFFIX = '}';

/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
export const UNICODE_BLOCKS = {

	InBasic_Latin: false,

};

export const UNICODE_BLOCKS_ALL = {
	...CACHE_BLOCKS,

	...UNICODE_BLOCKS,
};

export const PatternTest: {
	[k in keyof typeof UNICODE_BLOCKS_ALL]?: IPatternTestRow[];
} = {

	InBasic_Latin: [

		['^\\p{InBasic_Latin}+$', 'u', '\u007F', true, 'test'],
		['^\\p{InBasic_Latin}+$', 'u', '\u0080', false, 'test'],

	],

};

export const testUnicodeBlocks = _createFnTestPattern(PatternTest);

// @ts-ignore
export function testUnicodeBlocksAll<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest)
{
	return Object.keys(UNICODE_BLOCKS_ALL).reduce(function (a, key)
	{
		a[key] = testUnicodeBlocks(key, RegExpClass, testPatterns);
		return a;
	}, {} as typeof UNICODE_BLOCKS_ALL);
}

export function wrapToRegexName(name: string, negation?: boolean)
{
	let prefix = KEY_PREFIX;

	if (negation)
	{
		prefix = KEY_PREFIX_NEGATION;
	}

	return _wrapToRegexName(name, prefix, KEY_SUFFIX);
}

