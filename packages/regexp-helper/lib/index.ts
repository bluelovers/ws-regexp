/**
 * Created by user on 2018/4/28/028.
 */

import { support, hasSupportFlag, FlagsName } from 'regexp-support';
import { ITSPickByType, ITSKeyofByExtractType } from 'ts-type/lib/helper/record/pick-type';
import { ITSValueOf } from 'ts-type/lib/helper/key-value';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

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

export type IFlag = ITSTypeAndStringLiteral<FlagsName>

export type IFlagPrototype = {
	[P in ITSKeyofByExtractType<typeof FlagsName, IFlag>]?: boolean;
}
export type IFlagMap = Partial<ITSPickByType<typeof FlagsName, IFlag>>

export type IFlagPrototypeInput = IFlagPrototype | Record<string, boolean>;
export type IFlagMapInput = IFlagMap | Record<string, string>

export type IFlagsValue<R extends IFlagMapInput> = ITSValueOf<ITSPickByType<R, string | IFlag>>
export type IFlagsArray<R extends IFlagMapInput> = IFlagsValue<R>[]

export function prototypeToFlagsArray<T extends IFlagPrototypeInput, R extends IFlagMapInput = IFlagMap>(inputObject: T,
	flagMap: R = FlagsName as any
): IFlagsArray<R>
{
	return Object.keys(flagMap)
		.reduce(function (a, name)
		{
			if ((inputObject as any)[name] === true
				&& (name in flagMap)
				&& (a.indexOf(flagMap[name]) === -1)
			)
			{
				a.push(flagMap[name]);
			}

			return a;
		}, [] as IFlagsArray<R>)
		.sort()
	;
}

export function prototypeToFlags<T extends IFlagPrototypeInput, R extends IFlagMapInput = IFlagMap>(inputObject: T,
	flagMap: R = FlagsName as any
): string | IFlagsValue<R>
{
	return prototypeToFlagsArray(inputObject, flagMap)
		.join('')
		;
}

export default exports as typeof import('./index');
