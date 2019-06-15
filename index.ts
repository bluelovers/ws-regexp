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
import _support from 'regexp-support';
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
import { isRegExp } from 'regexp-helper';
import { IOptions as IOptionsZhTable } from 'cjk-conv/lib/zh/table/index';
import merge from 'lodash/merge';
import RegexpHelper = require('regexp-helper');
import mergeOptions, { getSettingOptions } from './lib/mergeOptions';
import { parseRegularExpressionString } from './lib/getSource';

export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions }

export { IOptions, IOptionsRuntime, IOptionsInput, ICoreHandlerReturn, IOptionsOn, IOptionsCore }

export { IOptionsZhTable }

/**
 * @deprecated
 */
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
		defaultOptions = mergeOptions({}, this[SymDefaults], defaultOptions);

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

	static get support()
	{
		return require('regexp-support').default as typeof import('regexp-support').default;
	}

	static get version(): string
	{
		return require('./package.json').version
	}
}

export namespace zhRegExp
{
	export import isRegExp = RegexpHelper.isRegExp;
}

export const create = zhRegExp.create.bind(zhRegExp) as typeof zhRegExp.create;

export { isRegExp, parseRegularExpressionString }

export interface IApi<T = zhRegExp>
{
	(str: string | RegExp, flags?: string, options?: IOptions | string): T,
	(str: string | RegExp, options?: IOptions): T,
}

// @ts-ignore
export const version: string;

Object.defineProperty(exports, "version", {
	get()
	{
		return require('./package.json').version
	}
});

export default zhRegExp;
