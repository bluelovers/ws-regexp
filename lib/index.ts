/**
 * Created by user on 2018/4/28/028.
 */

import support, { hasSupportFlag, FlagsName } from 'regexp-support';

export const RE_NATIVE_FLAGS = new RegExp(`[${support.nativeFlags}]`, 'g');
export const RE_NON_NATIVE_FLAGS = new RegExp(`[^${support.nativeFlags}]`, 'g');

export const hasFlagsProp = support.prototype.flags;

export function getNativeFlags<T extends RegExp>(target: T): string
export function getNativeFlags(target: string): string
export function getNativeFlags(target): string
{
	let flags: string;

	if (target instanceof RegExp)
	{
		target = _getNativeFlags(target)
	}

	if (typeof target === 'string')
	{
		flags = stripNonNativeFlags(target);
	}
	else
	{
		throw new TypeError(`target must is RegExp or String`);
	}

	return flags;
}

export function stripNonNativeFlags(flags: string)
{
	return flags.replace(RE_NON_NATIVE_FLAGS, '');
}

export function isNativeFlags(flags: string)
{
	return (flags === '') || !RE_NON_NATIVE_FLAGS.test(flags);
}

/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
export function _getNativeFlags<T extends RegExp>(regex: T)
{
	return hasFlagsProp ?
		regex.flags :
		/\/([a-z]*)$/i.exec(RegExp.prototype.toString.call(regex))[1]
		;
}

export type valueof<T> = T[keyof T];

export function prototypeToFlagsArray<T extends Partial<{
	[k in keyof typeof FlagsName]?
} & {
	[k: string]: any
}>, R = Partial<typeof FlagsName> & {
	[k: string]: string
}>(inputObject: T,
	// @ts-ignore
	flagMap: R = FlagsName
): valueof<R>[]
{
	return Object
		.keys(flagMap)
		.reduce(function (a, name)
		{
			if (inputObject[name] === true
				&& (name in flagMap)
				&& (a.indexOf(flagMap[name]) === -1)
			)
			{
				a.push(flagMap[name]);
			}

			return a;
		}, [] as valueof<R>[])
		.sort()
	;
}

export function prototypeToFlags<T extends Partial<{
	[k in keyof typeof FlagsName]?
} & {
	[k: string]: any
}>, R = Partial<typeof FlagsName> & {
	[k: string]: string
}>(inputObject: T,
	// @ts-ignore
	flagMap: R = FlagsName
): string
{
	return prototypeToFlagsArray(inputObject, flagMap)
		.join('')
		;
}

import * as self from './index';
export default self;
