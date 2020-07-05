import { IReturnTypeEachCore, ICallback } from '../types';
import { _each } from './_each';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';

function _cb<T extends RegExp = RegExp>(match: RegExpMatchArray, index: number, re: T, _: IReturnTypeEachCore<T>)
{
	return match
}

export function map<R = RegExpMatchArray, T extends RegExp = RegExp>(input: string,
	re: T,
	cb?: never,
	options?: ICloneRegexpOptionsCustom<T>,
): R[]
export function map<R, T extends RegExp = RegExp>(input: string,
	re: T,
	cb: ICallback<R, T>,
	options?: ICloneRegexpOptionsCustom<T>,
): R[]
export function map<R = RegExpMatchArray, T extends RegExp = RegExp>(input: string,
	re: T,
	cb?: ICallback<R, T>,
	options: ICloneRegexpOptionsCustom<T> = {},
)
{
	let ret: R[] = [];
	cb = cb ?? _cb as any

	for (const m of _each(input, re, options))
	{
		ret.push(cb(m.match, m.index, m.re, m))
	}

	return ret;
}

export default map
