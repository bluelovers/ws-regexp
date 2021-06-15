/**
 * Created by user on 2018/4/26/026.
 */

import FlagsName, { FlagsPattern, IFlagsPatternTestFn } from './flags';

export { FlagsName }

type valueof<T> = T[keyof T];

/**
 * Check whether a RegExp flag is supported
 */
export function hasSupportFlag(flag: string, RegExpClass: typeof RegExp = RegExp, skipPatternCheck?: boolean)
{
	if (!flag || typeof flag != 'string' || flag.length != 1)
	{
		throw new TypeError(`"${flag}" not a valid flag`)
	}

	let isSupported: boolean = null;
	try
	{
		if (!skipPatternCheck && FlagsPattern[flag])
		{
			isSupported = testFlag(flag, RegExpClass);
		}
		else
		{
			new RegExpClass('', flag);
			isSupported = true;
		}
	}
	catch (exception)
	{
		isSupported = false;
	}
	return isSupported;
}

export function testFlag(flag: string, RegExpClass?: typeof RegExp, testPattern?: typeof FlagsPattern): boolean
export function testFlag(flag: string, RegExpClass?: ICreateRegExp, testPattern?: typeof FlagsPattern): boolean
export function testFlag<T>(flag: string,
	// @ts-ignore
	RegExpClass: ITypeCreateRegExp<T> = RegExp,
	testPattern = FlagsPattern
): boolean
{
	if (testPattern[flag] && testPattern[flag].length)
	{
		return testPattern[flag].every(function (v)
		{
			let [pattern, input, value, fn] = v;
			let bool: boolean;

			try
			{
				let r = createRegExp(pattern, flag, RegExpClass);

				if (fn)
				{
					if (typeof fn == 'function')
					{
						bool = (fn as IFlagsPatternTestFn)(r, value, input, pattern, RegExpClass, flag);
					}
					else
					{
						bool = r[fn](input) === value;
					}
				}
				else
				{
					bool = r.test(input) === value;
				}
			}
			catch (e)
			{
				return false;
			}

			return bool;
		}) === true;
	}

	return false;
}

export function testFlagsAll(RegExpClass: typeof RegExp = RegExp, skipPatternCheck?: boolean): {
	g: boolean,
	i: boolean,
	m: boolean,
	s: boolean,
	u: boolean,
	y: boolean,

	[key: string]: boolean
}
{
	let flagsAll = {} as IFlagsAll;

	for (let i = 65; i <= 90; i++)
	{
		let k1 = String.fromCharCode(i);
		let k2 = String.fromCharCode(i + 32);

		flagsAll[k1] = hasSupportFlag(k1, RegExpClass, skipPatternCheck);

		flagsAll[k2] = hasSupportFlag(k2, RegExpClass, skipPatternCheck);
	}

	let def = [
		'g',
		'i',
		'm',
		's',
		'u',
		'y',
	];

	flagsAll = Object.keys(flagsAll).sort().reduce(function (a, flag)
	{
		if (flagsAll[flag] || def.includes(flag))
		{
			a[flag] = flagsAll[flag];
		}

		return a;
	}, {} as IFlagsAll);

	return flagsAll;
}

export interface IFlagsAll
{
	g: boolean,
	i: boolean,
	m: boolean,
	s: boolean,
	u: boolean,
	y: boolean,

	[key: string]: boolean
}

export interface ICreateRegExp
{
	create?(pattern, flag)

	create?(pattern, flag?)

	create?(pattern, flag?, ...argv)
}

export type ITypeCreateRegExp<T> =
	T extends typeof RegExp ? typeof RegExp :
		T extends ICreateRegExp ? ICreateRegExp :
			//T extends RegExpConstructor ? RegExpConstructor :
			any
	;

// @ts-ignore
export function createRegExp<T>(pattern: string, flag?: string, RegExpClass: ITypeCreateRegExp<T> = RegExp)
{
	let r: RegExp;

	if (typeof (<ICreateRegExp>RegExpClass).create == 'function')
	{
		r = (<ICreateRegExp>RegExpClass).create(pattern, flag);
	}
	else
	{
		r = new (<typeof RegExp>RegExpClass)(pattern, flag);
	}

	return r;
}
