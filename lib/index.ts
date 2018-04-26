/**
 * Created by user on 2018/4/26/026.
 */

import FlagsName, { FlagsPattern, IFlagsPatternTestFn } from './flags';

export { FlagsName }

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

export function testFlag(flag: string, RegExpClass: typeof RegExp = RegExp, flagsPattern = FlagsPattern)
{
	if (flagsPattern[flag] && flagsPattern[flag].length)
	{
		return flagsPattern[flag].every(function (v)
		{
			let [pattern, input, value, fn] = v;
			let bool: boolean;

			let r = new RegExpClass(pattern, flag);

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

			return bool;
		}) === true;
	}

	return false;
}

import * as self from './index';

export default self;

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
