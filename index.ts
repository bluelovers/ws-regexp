/**
 * Created by user on 2018/4/26/026.
 */

import lib, { hasSupportFlag, testFlag, ICreateRegExp, IFlagsAll, ITypeCreateRegExp } from './lib';
import { FlagsName } from './lib/flags';
import { testFlagsAll } from './lib/index';
import libPattern, { PatternSupport, testPattern, IPatternTestFn, IPatternTestRow } from './lib/pattern';
import { testPrototype } from './lib/proto/prototype';
import { testStatic } from './lib/proto/static';
import { testSymbol } from './lib/symbol';

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
};

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

export import FlagsName = FlagsName

export { hasSupportFlag };
export { testFlag };
export { testPattern };

type valueof<T> = T[keyof T];

export default support
