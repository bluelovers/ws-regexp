/**
 * Created by user on 2018/1/31/031.
 */

import { _word_zh_core, _word_zh_core2 } from './lib/conv';
import ParserEventEmitter, { ParserEventEmitterEvent, IParserEventEmitterListener } from 'regexp-parser-event';
import { IAstToStringOptions, parseRegExp } from 'regexp-parser-literal';
import _support from 'regexp-support';
import regexpRange from 'regexp-range';
import RegexpHelper, { isRegExp as _isRegExp } from 'regexp-helper';

export type IOptions = {
	skip?: string,
	disableZh?: boolean,
	/**
	 * disableLocalRange only work when disableZh is true
	 */
	disableLocalRange?: boolean,
	allowLocalRangeAutoZh?: boolean,
	flags?: string,

	/**
	 * allow str is /a/g
	 */
	parseRegularExpressionString?: boolean,

	on?: {
		[k in keyof typeof ParserEventEmitterEvent]?: IParserEventEmitterListener<any>;
	},

} & IAstToStringOptions;

export const defaultOptions: IOptions = {};

export class zhRegExp extends RegExp
{
	public source: string;
	public flags: string;

	public dotAll: boolean;

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

	constructor(str: string | RegExp, flags?: string, options?: IOptions | string, ...argv)
	constructor(str: string | RegExp, options?: IOptions, ...argv)
	constructor(str, flags = null, options: IOptions | string = {}, ...argv)
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

		if (1 && (!options.disableZh || !options.disableLocalRange || options.on))
		{
			let ev: ParserEventEmitter;

			if (str instanceof RegExp)
			{
				let ast = parseRegExp(str.toString());
				ev = new ParserEventEmitter(ast);
			}
			else
			{
				if (options.parseRegularExpressionString && typeof str == 'string')
				{
					let m = zhRegExp.parseRegularExpressionString(str);
					if (m)
					{
						str = m.source;
						flags = hasFlags ? flags : m.flags;
					}
				}

				ev = ParserEventEmitter.create(str, flags || '');
			}

			if (!options.disableZh)
			{
				ev.on(ParserEventEmitterEvent.default, function (ast)
				{
					ast.old_raw = ast.old_raw || ast.raw;
					ast.raw = _word_zh_core(ast.raw, (options as IOptions).skip);
					ev.emit(ParserEventEmitterEvent.change, ast);
				});
			}

			if (!options.disableLocalRange)
			{
				ev.on(ParserEventEmitterEvent.class_range, function (ast, ...argv)
				{
					let s = ast.min.raw;
					let e = ast.max.raw;

					let ret = regexpRange(s, e, {
						createRegExpString: true,
					});
					if (ret)
					{
						if ((options as IOptions).allowLocalRangeAutoZh)
						{
							ret = _word_zh_core2(ret, (options as IOptions).skip);
						}

						ast.old_raw = ast.old_raw || ast.raw;
						ast.raw = ret;

						ev.emit(ParserEventEmitterEvent.change, ast);
					}

					/*
					for (let r of local_range)
					{
						let i = r.indexOf(s);
						let j = r.indexOf(e, i);

						if (i !== -1 && j !== -1)
						{
							ast.old_raw = ast.old_raw || ast.raw;
							ast.raw = r.slice(i, j + 1).join('');

							ev.emit(ParserEventEmitterEvent.change, ast);
							break;
						}
					}
					*/
				});
			}

			if (options.on)
			{
				Object
					.keys(options.on)
					.forEach(function (event)
					{
						// @ts-ignore
						ev.on(event, (options as IOptions).on[event])
					})
				;
			}

			ev.resume();

			//options.sortClass = true;

			str = ev.getSource(!!options.debugChanged
				|| !options.noUniqueClass
				|| options.sortClass
				, options);
			flags = hasFlags ? flags : ev.flags;
		}
		else
		{
			if (options.parseRegularExpressionString && typeof str == 'string')
			{
				let m = zhRegExp.parseRegularExpressionString(str);
				if (m)
				{
					str = new RegExp(m.source, m.flags);
					flags = hasFlags ? flags : str.flags;
				}
			}
			else if (str instanceof RegExp)
			{
				str = str.source;
				flags = hasFlags ? flags : str.flags;
			}
		}

		super(str, flags || '');

		/*
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
		*/
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
}

export namespace zhRegExp
{
	export import isRegExp = RegexpHelper.isRegExp;
}

export const parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
export const isRegExp = zhRegExp.isRegExp;
export const create = zhRegExp.create.bind(zhRegExp) as typeof zhRegExp.create;

export interface IApi<T = zhRegExp>
{
	(str: string | RegExp, flags?: string, options?: IOptions | string): T,
	(str: string | RegExp, options?: IOptions): T,
}

export default zhRegExp;
