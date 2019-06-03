/**
 * Created by user on 2018/4/26/026.
 */

import * as lib from './lib';
import { hasSupportFlag, testFlag, ICreateRegExp, IFlagsAll, ITypeCreateRegExp } from './lib';
import { FlagsName } from './lib/flags';
import { testFlagsAll } from './lib/index';
import * as libPattern from './lib/pattern';
import { PatternSupport, testPattern, IPatternTestFn, IPatternTestRow } from './lib/pattern';
import { testUnicodeAll, UNICODE_ALL } from './lib/pattern/charset/unicode';
import { testUnicodeBlocksAll } from './lib/pattern/charset/unicode-blocks';
import { testUnicodeScriptAll, UNICODE_SCRIPTS_ALL } from './lib/pattern/charset/unicode-script';
import { testPrototype, IRegExpPrototype } from './lib/proto/prototype';
import { testStatic, IRegExpStatic } from './lib/proto/static';
import { testSymbol } from './lib/symbol';

/**
 * @link https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
 * @link https://www.regular-expressions.info/posixbrackets.html
 * @link http://2ality.com/archive.html?tag=regexp
 */
const _support = {

	nativeFlags: '',

	/**
	 * flag support with name and pattern test
	 */
	flags: Object
		.keys(FlagsName)
		.reduce(function (a, flags)
		{
			let bool: boolean = false;

			if (flags in a)
			{
				bool = a[flags];
			}
			else if (FlagsName[flags] in a)
			{
				bool = a[FlagsName[flags]];
			}
			else
			{
				bool = hasSupportFlag(FlagsName[flags]);
			}

			a[flags] = bool;

			return a;
		}, {} as {
			[k in keyof typeof FlagsName]: boolean
		}),

	/**
	 * all flag support without name and pattern test
	 */
	flagsAll: testFlagsAll(RegExp, true),

	/**
	 * pattern support
	 */
	pattern: Object.keys(PatternSupport).reduce(function (a, key)
	{
		a[key] = testPattern(key);
		return a;
	}, {} as typeof PatternSupport),

	//hasFlagsProp: /x/g.flags === 'g',

	prototype: testPrototype(),

	static: testStatic(),

	symbol: testSymbol(),

	objectStringTag: Object.prototype.toString.call(/a/) as string,

	unicodeSet: (() => {

		return {

			unicode: false,
			script: false,
			blocks: false,

			//unicodeKeys: Object.keys(UNICODE_ALL),
			//scriptKeys: Object.keys(UNICODE_SCRIPTS_ALL),

			unicodeTest: Object.entries(testUnicodeAll())
				.reduce(function (a, b)
				{
					if (b[1] !== null)
					{
						a[b[0]] = b[1];
					}

					return a;
				}, {} as Partial<ReturnType<typeof testUnicodeAll>>),

			scriptTest: Object.entries(testUnicodeScriptAll())
				.reduce(function (a, b)
				{
					if (b[1] !== null)
					{
						a[b[0]] = b[1];
					}

					return a;
				}, {} as Partial<ReturnType<typeof testUnicodeScriptAll>>),

			blocksTest: Object.entries(testUnicodeBlocksAll())
				.reduce(function (a, b)
				{
					if (b[1] !== null)
					{
						a[b[0]] = b[1];
					}

					return a;
				}, {} as Partial<ReturnType<typeof testUnicodeBlocksAll>>),

		};

	})(),

};

_support.unicodeSet.unicode = Object.values(_support.unicodeSet.unicodeTest).includes(true);
_support.unicodeSet.script = Object.values(_support.unicodeSet.scriptTest).includes(true);
_support.unicodeSet.blocks = Object.values(_support.unicodeSet.blocksTest).includes(true);

_support.nativeFlags = Object
	.keys(_support.flagsAll)
	.reduce(function (a, f)
	{
		if (_support.flagsAll[f])
		{
			a.push(f);
		}

		return a;
	}, [] as string[])
	.join('')
;

export const support = Object.freeze(_support);

export { FlagsName }
export { hasSupportFlag };
export { testFlag };
export { testPattern };

export { IRegExpPrototype, IRegExpStatic }

export default support
