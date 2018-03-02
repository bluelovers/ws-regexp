/**
 * Created by user on 2018/1/31/031.
 */

import lib from './lib';
import _support from './support';

export interface IApi<T = zhRegExp>
{
	(str: string | RegExp, flags?: string, options?: IOptions | string): T,
	(str: string | RegExp, options?: IOptions): T,
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

	/**
	 * allow str is /a/g
	 */
	parseRegularExpressionString?: boolean,
}

export const defaultOptions: IOptions = {};

export class zhRegExp extends RegExp
{
	public source: string;
	public flags: string;

	public ignoreCase: boolean;
	public global: boolean;
	public multiline: boolean;
	public sticky: boolean;
	public unicode: boolean;

	public lastIndex: number;

	/**
	 * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match. RegExp.$` is an alias for this property.
	 *
	 * @alias $`
	 */
	public static readonly leftContext: string;
	/**
	 * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match. RegExp.$' is an alias for this property.
	 *
	 * @alias $'
	 */
	public static readonly rightContext: string;
	/**
	 * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any. RegExp.$+ is an alias for this property.
	 *
	 * @alias $+
	 */
	public static readonly lastParen: string;
	/**
	 * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters. RegExp.$& is an alias for this property.
	 *
	 * @alias $&
	 */
	public static readonly lastMatch: string;
	/**
	 * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched. RegExp.$_ is an alias for this property.
	 *
	 * @alias $_
	 */
	public static readonly input: string;

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

		if (options.parseRegularExpressionString && typeof str == 'string')
		{
			let m = zhRegExp.parseRegularExpressionString(str);
			if (m)
			{
				str = new RegExp(m.source, m.flags);
			}
		}

		let hasFlags = typeof flags == 'string';

		let rs, f;

		if (!options.disableZh)
		{
			[rs, f] = lib._word_zh(str, null, flags || str.flags);
		}
		else if (!options.disableLocalRange)
		{
			rs = lib.replace_literal(str, function (text: string)
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

	static create<T = zhRegExp>(str: string | RegExp, flags?: string, options?: IOptions | string): T
	static create<T = zhRegExp>(str: string | RegExp, options?: IOptions): T
	static create<T = zhRegExp>(str, flags = null, skip?, ...argv)
	{
		return new this(str, flags, skip, ...argv);
	}

	getStatic<T = typeof zhRegExp>(): T
	{
		return Object.getPrototypeOf(this);
	}

	/**
	 * @todo
	 */
	toRegularExpressionString()
	{
		return this.toString();
		//return `/${this.source}/${this.flags}`;
	}

	static parseRegularExpressionString(str: string)
	{
		let m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
		if (m)
		{
			let [s, d, r, f] = m;

			return {
				source: typeof r !== 'undefined' ? r : '',
				flags: typeof f !== 'undefined' ? f : '',
				slash: s,
				input: str,
			};
		}

		return null;
	}

	static get support(): typeof _support
	{
		return _support;
	}

	static isRegExp<T>(r: T): T & RegExp | null
	static isRegExp(r: RegExp): RegExp
	static isRegExp(r)
	{
		if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]')
		{
			return r;
		}

		return null;
	}
}

export const parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
export const isRegExp = zhRegExp.isRegExp;
export const create = zhRegExp.create.bind(zhRegExp) as typeof zhRegExp.create;

/*
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

export const create = zhRegExp.create.bind(zhRegExp) as IApi<zhRegExp>;
*/

export default zhRegExp;
