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

import * as self from './index';
export default self;
