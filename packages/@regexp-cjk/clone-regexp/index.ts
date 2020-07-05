/// <reference lib="es2018.regexp" />
import _cloneRegexp from 'clone-regexp';
import { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp } from './lib/types';

export type { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp }

export function cloneRegexp<T extends RegExp>(inputRegExp: IRegExpWithClone<T>, options: ICloneRegexpOptions<T> = {}): T
{
	let {
		cloneRegexp: cloneRegexp2,
		disableDetectRegexpClone,
		...opts
	} = options;

	let re: T;

	if (cloneRegexp2)
	{
		re = cloneRegexp2(inputRegExp, opts)
	}
	else if (disableDetectRegexpClone !== true && typeof inputRegExp.clone === 'function')
	{
		// @ts-ignore
		re = inputRegExp.clone(opts)
	}
	else
	{
		re = _cloneRegexp(inputRegExp, opts) as T
	}

	if (typeof opts.lastIndex === 'number')
	{
		re.lastIndex = opts.lastIndex
	}
	else if ((opts.resetLastIndex ?? true) === true)
	{
		re.lastIndex = 0
	}

	return re
}

export default cloneRegexp
