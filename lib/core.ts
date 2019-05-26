import { _word_zh_core, _word_zh_core2, zhTableAutoGreedyTable } from './conv';
import { IAstToStringOptions, parseRegExp } from 'regexp-parser-literal';
import {
	IParserEventEmitterListener,
	ParserEventEmitter,
	ParserEventEmitterEvent,
	INodeInput,
} from 'regexp-parser-event';
import regexpRange from 'regexp-range';
import zhTable = require('cjk-conv/lib/zh/table/index');
import { isRegExp } from 'regexp-helper';
import { IOptions as IOptionsZhTable } from 'cjk-conv/lib/zh/table/index';

export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions }

export { IOptionsZhTable }

export type IOptionsCore = {
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

	/**
	 * 讓 文字比對 更加寬鬆
	 */
	greedyTable?: boolean | number,
	unsafe?: boolean,

	/**
	 * allow set `CjkConv.zhTable.auto`
	 */
	zhTable?(char: string, options?: IOptionsZhTable): string[]

} & IAstToStringOptions;

export type IOptions<T extends INodeInput = INodeInput> = IOptionsCore & {
	on?: IOptionsOn<T> | IOptionsOn<T>[],
}

export type IOptionsRuntime<T extends INodeInput = INodeInput> = IOptionsCore & {
	on?: IOptionsOn<T>[],
}

export type IOptionsInput<T extends INodeInput = INodeInput> = IOptions<T> | IOptionsRuntime<T>

export interface ICoreHandlerReturn<T extends INodeInput = INodeInput>
{
	source: string,
	flags: string,
	options: IOptionsRuntime<T>,
}

export type IOptionsOn<T extends INodeInput = INodeInput> = {
	[k in ParserEventEmitterEvent]?: IParserEventEmitterListener<T, ParserEventEmitterEvent>;
}

export function coreHandler(str: string | RegExp,
	flags?: string,
	options?: IOptionsInput | string,
	...argv
): ICoreHandlerReturn
export function coreHandler(str: string | RegExp, options?: IOptionsInput, ...argv): ICoreHandlerReturn
export function coreHandler(str, flags = null, options: IOptionsInput | string = {}, ...argv): ICoreHandlerReturn
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
		} as IOptions;
	}

	if (typeof options.flags == 'string')
	{
		flags = options.flags;
	}

	let hasFlags = typeof flags == 'string';

	options = fixOptionsOn(options);

	if (1 && (!options.disableZh || !options.disableLocalRange || options.on))
	{
		let ev: ParserEventEmitter;

		const zhTableFn = options.zhTable || (options.greedyTable ? zhTableAutoGreedyTable : zhTable.auto);

		if (str instanceof RegExp)
		{
			let ast = parseRegExp(str.toString());
			// @ts-ignore
			ev = new ParserEventEmitter(ast);
		}
		else
		{
			if (options.parseRegularExpressionString && typeof str == 'string')
			{
				let m = parseRegularExpressionString(str);
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

				let raw = _word_zh_core(ast.raw, (options as IOptions).skip, zhTableFn, options as IOptions);

				if (ast.raw !== raw)
				{
					ast.raw = raw;
					ev.emit(ParserEventEmitterEvent.change, ast);
				}
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
						ret = _word_zh_core2(ret, (options as IOptions).skip, zhTableFn, options as IOptions);
					}

					ast.old_raw = ast.old_raw || ast.raw;

					if (ast.raw !== ret)
					{
						ast.raw = ret;

						ev.emit(ParserEventEmitterEvent.change, ast);
					}
				}
			});
		}

		setupParserEventEmitter(ev, options);

		ev.resume();

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
			let m = parseRegularExpressionString(str);
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

	return {
		source: str,
		flags: flags || '',
		options: options as IOptionsRuntime,
	}
}

export function parseRegularExpressionString(str: string)
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

export function fixOptionsOn<T extends INodeInput = INodeInput>(options?: IOptionsInput<T>): IOptionsRuntime<T>
{
	if (options.on && !Array.isArray(options.on))
	{
		options.on = [options.on];
	}

	// @ts-ignore
	return options
}

export function setupParserEventEmitter(ev: ParserEventEmitter, options: IOptionsInput)
{
	if (options.on)
	{
		fixOptionsOn(options).on
			.forEach((conf) =>
			{
				Object
					.keys(conf)
					.forEach(function (event: ParserEventEmitterEvent)
					{
						ev.on(event, conf[event])
					})
				;

			})
		;
	}

	return ev;
}

export default coreHandler
