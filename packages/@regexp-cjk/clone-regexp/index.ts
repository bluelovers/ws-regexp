/// <reference lib="es2018.regexp" />
import _cloneRegexp from 'clone-regexp';
import { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp } from './lib/types';

export type { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp }

export function cloneRegexp<T extends RegExp>(inputRegExp: IRegExpWithClone<T>, options: ICloneRegexpOptions<T> = {}): T
{
	let {
		cloneRegexp: cloneRegexp2,
		...opts
	} = options;

	if (cloneRegexp2)
	{
		return cloneRegexp2(inputRegExp, opts)
	}
	// @ts-ignore
	else if (typeof inputRegExp.clone === 'function')
	{
		// @ts-ignore
		return inputRegExp.clone(opts)
	}

	return _cloneRegexp(inputRegExp, opts) as T
}

export default cloneRegexp
