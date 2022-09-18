import { IFrom2To, IOptions, KEY_ZHT, KEY_ZHS, KEY_JP } from './types';
import { TABLE, TABLE_KEYS } from './table';
import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';
import { UString } from 'uni-string';
import { _getdata } from './util';

// /[\u4E00-\u9FFF\u{20000}-\u{2FA1F}]+/u
const REGEXP_TEST = new RegExp(_re_cjk_conv('u').source + '+', 'u');

const defaultOptions: IOptions = {
	safe: true,
};

namespace _
{
	export let jp2zht: IFrom2To;
	export let jp2zhs: IFrom2To;
	export let zht2jp: IFrom2To;
	export let zht2zhs: IFrom2To;
	export let zhs2jp: IFrom2To;
	export let zhs2zht: IFrom2To;

	let langs = Object.keys(TABLE);

	// @ts-ignore
	langs.forEach(function (from: IKEY_FROM_TO)
	{
		// @ts-ignore
		langs.forEach(function (to: IKEY_FROM_TO)
		{
			if (from == to) return;

			_[`${from}2${to}`] = function (str, options?: IOptions): string
			{
				if (!REGEXP_TEST.test(str.toString()))
				{
					return str;
				}

				options = Object.assign({}, defaultOptions, options);

				return UString.split(str, '')
					.map(function (char: string)
					{
						if (options.skip && options.skip.indexOf(char) != -1)
						{
							return char;
						}

						let c: string;
						if (c = _getdata(char, from, to, options.safe))
						{
							return c;
						}

						return char;
					})
					.join('')
					;
			} as IFrom2To;
		});
	});
}

/**
 * only 只將 日文漢字 => 轉為繁漢字
 * @type {IFrom2To}
 */
export const jp2zht = _.jp2zht as IFrom2To;
/**
 * only 只將 日文漢字 => 轉為簡漢字
 * @type {IFrom2To}
 */
export const jp2zhs = _.jp2zhs as IFrom2To;

/**
 * only 簡漢字 => 轉為日漢字
 * @type {IFrom2To}
 */
export const zhs2jp = _.zhs2jp;

/**
 * only 只將 繁漢字 => 轉為日文漢字
 * @type {IFrom2To}
 */
export const zht2jp = _.zht2jp;

/**
 * only 只將簡繁日 當中共通的 繁漢字 => 轉為簡漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
export const zht2zhs = _.zht2zhs;

/**
 * only 只將簡繁日 當中共通的 簡漢字 => 轉為繁漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
export const zhs2zht = _.zhs2zht;

/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias cjk2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export function zh2jp(str, options?: IOptions): string
{
	if (!REGEXP_TEST.test(str.toString()))
	{
		return str;
	}

	options = Object.assign({}, defaultOptions, options);

	return UString.split(str, '')
		.map(function (char: string)
		{
			if (options.skip && options.skip.indexOf(char) != -1)
			{
				return char;
			}

			let c: string;
			if (c = _getdata(char, KEY_ZHT, KEY_JP, options.safe))
			{
				return c;
			}
			else if (c = _getdata(char, KEY_ZHS, KEY_JP, options.safe))
			{
				return c;
			}

			return char;
		})
		.join('')
		;
}

/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias zh2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export const cjk2jp = zh2jp;

/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為繁體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export function cjk2zht(str, options?: IOptions): string
{
	if (!REGEXP_TEST.test(str.toString()))
	{
		return str;
	}

	options = Object.assign({}, defaultOptions, options);

	return UString.split(str, '')
		.map(function (char: string)
		{
			if (options.skip && options.skip.indexOf(char) != -1)
			{
				return char;
			}

			let c: string;
			if (c = _getdata(char, KEY_JP, KEY_ZHT, options.safe))
			{
				return c;
			}
			else if (c = _getdata(char, KEY_ZHS, KEY_ZHT, options.safe))
			{
				return c;
			}

			return char;
		})
		.join('')
		;
}

/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為簡體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export function cjk2zhs(str, options?: IOptions): string
{
	if (!REGEXP_TEST.test(str.toString()))
	{
		return str;
	}

	options = Object.assign({}, defaultOptions, options);

	return UString.split(str, '')
		.map(function (char: string)
		{
			if (options.skip && options.skip.indexOf(char) != -1)
			{
				return char;
			}

			let c: string;
			if (c = _getdata(char, KEY_JP, KEY_ZHS, options.safe))
			{
				return c;
			}
			else if (c = _getdata(char, KEY_ZHT, KEY_ZHS, options.safe))
			{
				return c;
			}

			return char;
		})
		.join('')
		;
}

export default exports as typeof import('./index');
