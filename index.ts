/**
 * Created by user on 2018/1/31/031.
 */

import * as lib from './lib';

export interface IApi
{
	(str: string | RegExp, flags?: string, options?: IOptions | string): zhRegExp,
	(str: string | RegExp, options?: IOptions): zhRegExp,
}

export interface IOptions
{
	skip?: string,
	disableZh?: boolean,
	/**
	 * disableLocalRange only work when disableZh is true
	 */
	disableLocalRange?: boolean,
	flags?: string,
}

export const defaultOptions: IOptions = {

};

export class zhRegExp extends RegExp
{
	constructor(str: string | RegExp, flags?: string, options?: IOptions | string)
	constructor(str: string | RegExp, options?: IOptions)
	constructor(str, flags = null, options: IOptions | string = {})
	{
		if (flags !== null && typeof flags == 'object')
		{
			options = Object.assign({}, flags) as IOptions;
			flags = options.flags || null;
		}

		if (typeof options == 'string')
		{
			options = {
				skip: options,
			};
		}

		if (typeof options.flags == 'string')
		{
			flags = options.flags;
		}

		let hasFlags = typeof flags == 'string';

		let rs, f;

		if (!options.disableZh)
		{
			[rs, f] = lib._word_zh(str, null, flags || str.flags);
		}
		else if (!options.disableLocalRange)
		{
			rs = lib.replace_literal(str, function(text: string)
			{
				return text;
			});
		}

		let bool = (rs instanceof RegExp);

		if (hasFlags)
		{
			f = flags;
		}
		else
		{
			f = f || flags || rs.flags || '';
		}

		if (!bool)
		{
			super(rs, f);
		}
		else
		{
			super(rs.source, f);
		}
	}

	static create(str: string | RegExp, flags?: string, options?: IOptions | string)
	static create(str: string | RegExp, options?: IOptions)
	static create(str, flags = null, skip?, ...argv)
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
