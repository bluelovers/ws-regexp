/**
 * Created by user on 2018/1/31/031.
 */

import { IAstToStringOptions } from 'regexp-parser-literal';
import {
	INodeInput,
	IParserEventEmitterListener,
	ParserEventEmitter,
	ParserEventEmitterEvent,
} from 'regexp-parser-event';
import {
	coreHandler,
	ICoreHandlerReturn,
	IOptions,
	IOptionsCore,
	IOptionsInput,
	IOptionsOn,
	IOptionsRuntime, IRegExpUserInput,
	SymDefaults,
} from './lib/core';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
import { mergeOptions, getSettingOptions, mergeOptions2 } from './lib/mergeOptions';
import { parseRegularExpressionString } from './lib/getSource';
export * from './version';

export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions }

export { IOptions, IOptionsRuntime, IOptionsInput, ICoreHandlerReturn, IOptionsOn, IOptionsCore }

export { IOptionsZhTable }

/**
 * @deprecated
 */
export const defaultOptions: IOptions = {};

export class zhRegExp extends RegExp
{
	public override source: string;
	public override flags: string;

	public override dotAll: boolean;

	public override ignoreCase: boolean;
	public override global: boolean;
	public override multiline: boolean;
	public override sticky: boolean;
	public override unicode: boolean;

	public override lastIndex: number;

	/**
	 * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match. RegExp.$` is an alias for this property.
	 *
	 * @alias $`
	 */
	public static override readonly leftContext: string;
	/**
	 * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match. RegExp.$' is an alias for this property.
	 *
	 * @alias $'
	 */
	public static override readonly rightContext: string;
	/**
	 * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any. RegExp.$+ is an alias for this property.
	 *
	 * @alias $+
	 */
	public static override readonly lastParen: string;
	/**
	 * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters. RegExp.$& is an alias for this property.
	 *
	 * @alias $&
	 */
	public static override readonly lastMatch: string;
	/**
	 * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched. RegExp.$_ is an alias for this property.
	 *
	 * @alias $_
	 */
	public static override readonly input: string;

	/**
	 * default value only exists and work when use `zhRegExp.use(defaultOptions)`
	 */
	public static readonly [SymDefaults]: IOptionsInput;

	/**
	 * create a new zhRegExp class with default value
	 * @example `zhRegExp.use(defaultOptions)`
	 */
	static use(defaultOptions: IOptionsInput): typeof zhRegExp
	{
		defaultOptions = mergeOptions2({}, this[SymDefaults], defaultOptions);

		const zhRegExpNew = new Proxy(zhRegExp, {
			// @ts-ignore
			construct(target: typeof zhRegExp, argArray: unknown, newTarget?: any)
			{
				let { str, flags, options, argv } = getSettingOptions(...argArray as [IRegExpUserInput, any]);

				options = mergeOptions({}, defaultOptions, options);

				return new zhRegExp(str, flags, options, ...argv);
			},

			// @ts-ignore
			get(target: keyof zhRegExp, key: keyof zhRegExp |typeof SymDefaults)
			{
				if (key === SymDefaults)
				{
					return defaultOptions
				}

				return target[key];
			},

		});

		return zhRegExpNew
	}

	constructor(str: IRegExpUserInput, options?: IOptionsInput, ...argv)
	constructor(str: IRegExpUserInput, flags?: string, options?: IOptionsInput, ...argv)
	constructor(str: IRegExpUserInput, flags: string, skip: string, ...argv)
	constructor(str: IRegExpUserInput, flags: string, options?: IOptionsInput | string, ...argv)
	constructor(str, ...argv)
	{
		let { source, flags } = coreHandler(str, ...argv);

		super(source, flags);
	}

	static create<T = zhRegExp>(str: IRegExpUserInput, flags?: string, options?: IOptionsInput | string): T
	static create<T = zhRegExp>(str: IRegExpUserInput, options?: IOptionsInput): T
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
		return parseRegularExpressionString(str);
	}

	static get version(): string
	{
		return require('./package.json').version
	}
}

export const create = zhRegExp.create.bind(zhRegExp) as typeof zhRegExp.create;

export { parseRegularExpressionString }

export interface IApi<T = zhRegExp>
{
	(str: string | RegExp, flags?: string, options?: IOptions | string): T,
	(str: string | RegExp, options?: IOptions): T,
}

export default zhRegExp;
