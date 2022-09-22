import { _word_zh_core, _word_zh_core2, zhTableAutoGreedyTable } from './conv';
import { IAstToStringOptions } from 'regexp-parser-literal';
import {
	INodeInput,
	IParserEventEmitterListener,
	IParserEventEmitterListenerMap,
	ParserEventEmitter,
	ParserEventEmitterEvent,
} from 'regexp-parser-event';
import { matchRange as regexpRange } from 'regexp-range';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
import { fixOptions, getSettingOptions, IGetSettingOptions } from './mergeOptions';
import { getRegExpSourcePattern } from './getSource';
import { auto as zhTableAuto } from '@lazy-cjk/zh-table-list';
import { astNotChanged, astOldRaw } from './plugin';

export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions }

export { IOptionsZhTable }

export const SymDefaults = Symbol.for('zhRegExp.defaults');

export type IOptionsCore = {
	skip?: string,
	disableZh?: boolean,
	/**
	 * disableLocalRange only work when disableZh is true
	 */
	disableLocalRange?: boolean,
	allowLocalRangeAutoZh?: boolean,
	/**
	 * 強制複寫 flags 設定
	 * 但當使用於 zhRegExp.use 內時 則會自動被轉換為 defaultFlags
	 */
	flags?: string,
	/**
	 * 當沒有設定 flags 時的預設值
	 */
	defaultFlags?: string,

	/**
	 * allow str is /a/g
	 * @deprecated
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
	zhTable?(char: string, options?: IOptionsZhTable): string[],

	/**
	 * 用來解決插件需求
	 */
	onCore?: IOptionsOnCore[],

} & IAstToStringOptions;

export interface IOptionsOnCore
{
	/**
	 * 執行於分析參數後 執行 核心處理前
	 * 回傳的物件會取代參數
	 */
	beforeStart?(opts: IGetSettingOptions<string> & {
		hasFlags: boolean,
	}): IGetSettingOptions & {
		hasFlags: boolean,
	};

	afterStart?(opts: IGetSettingOptions<string> & {
		hasFlags: boolean,
	}): IGetSettingOptions & {
		hasFlags: boolean,
	};
}

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

/*
export type IOptionsOn<T extends INodeInput = INodeInput> = {
	[k in ParserEventEmitterEvent]?: IParserEventEmitterListener<T, ParserEventEmitterEvent>;
}
 */

export interface IOptionsOn<T extends INodeInput = INodeInput> extends IParserEventEmitterListenerMap<T>
{
	//
}

export type IRegExpUserInput = string | RegExp;

export function coreHandler(str: IRegExpUserInput,
	flags?: string,
	options?: IOptionsInput | string,
	...argv
): ICoreHandlerReturn
export function coreHandler(str: IRegExpUserInput, options?: IOptionsInput, ...argv): ICoreHandlerReturn
export function coreHandler(str, flags = null, options: IOptionsInput | string = {}, ...argv): ICoreHandlerReturn
{
	const opts = getSettingOptions(str, flags, options, ...argv);

	let source: string;
	let hasFlags: boolean;

	({ options, argv } = opts);

	options = fixOptions(options);

	({ source, hasFlags, flags } = getRegExpSourcePattern(opts));

	str = source;

	if (options.onCore)
	{
		let optsNew = options.onCore.reduce((a, setting) => {

			if (!setting.beforeStart)
			{
				return a
			}

			return setting.beforeStart(a);
		}, {
			str,
			flags,
			options,
			argv,
			hasFlags,
		});

		({ str, options, flags, argv, hasFlags } = optsNew);
	}

	if ((!options.disableZh || !options.disableLocalRange || options.on))
	{
		let ev = ParserEventEmitter.create(str, flags || '');

		const zhTableFn = options.zhTable || (options.greedyTable ? zhTableAutoGreedyTable : zhTableAuto);

		if (!options.disableZh)
		{
			ev.on(ParserEventEmitterEvent.default, function (ast)
			{
				astOldRaw(ast);

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

					astOldRaw(ast);

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

	if (options.onCore)
	{
		let optsNew = options.onCore.reduce((a, setting) => {

			if (!setting.afterStart)
			{
				return a
			}

			return setting.afterStart(a);
		}, {
			str,
			flags,
			options,
			argv,
			hasFlags,
		});

		({ str, options, flags, argv, hasFlags } = optsNew);
	}

	return {
		source: str,
		flags: flags || '',
		options: options as IOptionsRuntime,
	}
}

export function setupParserEventEmitter(ev: ParserEventEmitter, options: IOptionsInput)
{
	const onList = fixOptions(options).on;

	if (onList)
	{
		onList
			.forEach((conf) =>
			{
				Object
					.keys(conf)
					// @ts-ignore
					.forEach(function (event: ParserEventEmitterEvent)
					{
						ev.on(event, conf[event] as any)
					})
				;
			})
		;
	}

	return ev;
}

export default coreHandler
