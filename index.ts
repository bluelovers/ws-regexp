/**
 * Created by user on 2018/1/31/031.
 */

import * as lib from './lib';

export interface IApi
{
	(str: string, flags?: string, skip?: string): zhRegExp
	(str: RegExp, flags?: string, skip?: string): zhRegExp
}

export class zhRegExp extends RegExp
{
	constructor(str: string, flags?: string, skip?: string)
	constructor(str: RegExp, flags?: string, skip?: string)
	constructor(str, flags = '', skip = '')
	{
		let [rs, f] = lib._word_zh(str, null, flags);
		let bool = (rs instanceof RegExp);

		f = f || flags || '';

		if (!bool)
		{
			super(rs, f);
		}
		else
		{
			super(rs.source, f);
		}
	}

	static create(str, flags = '', skip = '', ...argv)
	{
		return new this(str, flags, skip, ...argv);
	}
}

export function isRegExp(r: RegExp): RegExp
export function isRegExp(r): RegExp | null
export function isRegExp(r)
{
	if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]')
	{
		return r;
	}

	return null;
}

export const create = zhRegExp.create.bind(zhRegExp) as IApi;

export default zhRegExp;
