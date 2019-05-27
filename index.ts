/**
 * Created by user on 2019/5/27.
 */

import { array_unique_overwrite } from 'array-hyper-unique'
import StrUtil from 'str-util';
import { FullHalfCore, toFullNumber, toHalfNumber, toFullEnglish, toHalfEnglish, toFullWidth, toHalfWidth } from 'str-util/lib/fullhalf';
import { _get as _getArrayTable } from 'cjk-conv/lib/zh/table/table';
import { IOptionsOn } from 'regexp-cjk/lib/core';
import UString from 'uni-string/src/core';
import getVoiceAll from 'cjk-conv/lib/jp/table_voice';
import { ParserEventEmitterEvent } from 'regexp-parser-event';
import deburr = require('lodash.deburr');

export type ICacheMap = Map<string, string[]>

export interface IZhRegExpPluginOptionsCore
{
	/**
	 * 平假名片假名的 清濁音
	 */
	autoVoice?: boolean,
	/**
	 * 自動配對 半形 全形
	 */
	autoFullHaif?: boolean,
	/**
	 * 配對本地化字元
	 */
	autoLocale?: boolean,
	/**
	 * deburr('déjà vu') // => 'deja vu'
	 *
	 * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
	 */
	autoDeburr?: boolean,

	/**
	 * if return null | undefined then will skip current node
	 */
	callback?(raw: string): string | string[]
}

export type IZhRegExpPluginOptions = IZhRegExpPluginOptionsCore & {
	/**
	 * 緩存
	 */
	cacheMap?: boolean | ICacheMap,
}

export type IZhRegExpPluginOptionsRuntime = IZhRegExpPluginOptionsCore & {
	/**
	 * 緩存
	 */
	cacheMap?: ICacheMap,
}

/**
 * 建立 擴充事件函數物件
 */
export function createZhRegExpPlugin(options: IZhRegExpPluginOptions = {}): IOptionsOn
{
	let cacheMap: ICacheMap;

	if (options.cacheMap)
	{
		if (typeof options.cacheMap === 'boolean')
		{
			cacheMap = new Map<string, string[]>();
		}
		else
		{
			cacheMap = options.cacheMap;
		}
	}

	let { autoDeburr, autoFullHaif, autoLocale, autoVoice } = options;

	let callback = options.callback;

	if (callback && typeof callback !== 'function')
	{
		throw new TypeError(`callback must is function`)
	}

	return <IOptionsOn>{
		default(ast, eventName, ev)
		{
			ast.old_raw = ast.old_raw || ast.raw;

			const raw = ast.raw;

			/**
			 * 確保 此節點沒有被其他修改過
			 */
			if (!ast.changed && ast.old_raw === raw && UString.size(raw) == 1)
			{
				let arr = _coreFn(raw, {
					autoDeburr,
					autoFullHaif,
					autoLocale,
					autoVoice,
					cacheMap,
					callback,
				});

				if (arr && arr.length > 1)
				{
					ast.raw = '[' + arr.join('') + ']';

					/**
					 * trigger change if not will not update node
					 *
					 * ev.emitChange(ast);
					 * or
					 * ev.emit(ParserEventEmitterEvent.change, , ast);
					 */
					ev.emitChange(ast);
					//ev.emit(ParserEventEmitterEvent.change, , ast);
				}
			}
		},
	}
}

/**
 * 分享內部處理函數 方便拿去使用或者擴充
 *
 * @private
 */
export function _coreFn(raw: string, {
	autoDeburr,
	autoFullHaif,
	autoLocale,
	autoVoice,
	cacheMap,
	callback,
}: IZhRegExpPluginOptionsRuntime)
{
	let arr: string[] = [];

	if (cacheMap && cacheMap.has(raw))
	{
		arr = cacheMap.get(raw);
	}
	else
	{
		if (autoVoice)
		{
			let ret = getVoiceAll(raw);

			ret && arr.push(...ret)
		}

		if (autoFullHaif)
		{
			let cf = toFullWidth(raw);
			let ch = toHalfWidth(raw);

			arr.push(cf, ch);

			if (autoLocale)
			{
				arr.push(cf.toLocaleLowerCase(), ch.toLocaleLowerCase(), raw.toLocaleLowerCase());
			}

			if (autoDeburr)
			{
				arr.push(deburr(cf), deburr(ch), deburr(raw));

			}
		}
		else
		{
			if (autoLocale)
			{
				arr.push(raw.toLocaleLowerCase());
			}

			if (autoDeburr)
			{
				arr.push(deburr(raw));
			}
		}

		if (callback)
		{
			let ret = callback(raw);

			if (ret == null)
			{
				return;
			}
			else if (typeof ret === 'string')
			{
				arr.push(ret);
			}
			else if (Array.isArray(ret))
			{
				arr.push(...ret);
			}
		}

		arr.push(raw);

		arr = array_unique_overwrite(arr.filter(v => typeof v === 'string').sort());

		if (cacheMap)
		{
			cacheMap.set(raw, arr);
		}
	}

	return arr;
}

export default createZhRegExpPlugin
