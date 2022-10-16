/**
 * Created by user on 2018/5/7/007.
 */

import { fill as _fillRange } from '@bluelovers/fill-range';
import { TABLE_RANGE } from '@lazy-cjk/regexp-range-table';
import { array_unique_overwrite } from 'array-hyper-unique';

export { TABLE_RANGE }

export type IOptions = {

	/**
	 * 字元範圍表
	 */
	dataTables?: typeof TABLE_RANGE,

	/**
	 * 回傳 陣列
	 */
	arrayMode?: boolean,

	/**
	 * 回傳 字串
	 */
	createRegExpString?: boolean,
	/**
	 * 回傳由 [] 包覆的字串
	 */
	createRegExpClass?: boolean,

	/**
	 * 找到第一個就停止
	 */
	findFirstOne?: boolean,
}

export function matchRange(from: string | number, to: string | number, options: IOptions & {
	createRegExpString: true,
}): string
export function matchRange(from: string | number, to: string | number, options?: IOptions): string[]
export function matchRange(from: string | number, to: string | number, options: IOptions = {}): string[] | string
{
	options = getOptions(options);

	let s = from as string;
	let e = to as string;

	let ret: string[] = [];

	let findFirstOne = !!options.findFirstOne;

	Object
		.keys(options.dataTables)
		// @ts-ignore
		.some(function (key: keyof typeof options.dataTables): boolean
		{
			let bool: boolean;

			options.dataTables[key].some(function (arr): boolean
			{
				let i = arr.indexOf(s);
				let j = arr.indexOf(e, i);

				if (i !== -1 && j !== -1)
				{
					ret.push(...arr.slice(i, j + 1));

					bool = true;
					return findFirstOne;
				}
			});

			if (bool)
			{
				return true;
			}
		})
	;

	if (!ret || !ret.length)
	{
		return null;
	}

	array_unique_overwrite(ret);

	if (options.createRegExpString)
	{
		return toRegExpString(ret, options.createRegExpClass);
	}

	return ret;
}

export function toRegExpString(arr: string[], warpClass?: boolean)
{
	if (arr.length === 1)
	{
		return arr[0];
	}

	let s = arr.join('');

	return warpClass ? '[' + s + ']' : s;
}

export function fillRange(from: string | number, to: string | number, options: IOptions = {}): string[]
{
	options = getOptions(options);

	let s = from;
	let e = to;

	let ret: string[] = null;

	ret = matchRange(from, to, options);

	if (!ret && (options.arrayMode || String(s).length === 1 && String(e).length === 1))
	{
		let _ok: boolean;

		if (typeof s === 'string' && typeof e === 'string')
		{
			let a = s.charCodeAt(0);
			let b = e.charCodeAt(0);

			_ok = a <= b;
		}
		else
		{
			_ok = true;
		}

		if (_ok)
		{
			ret = _fillRange(s, e);
		}

		if (!ret?.length)
		{
			ret = null;
		}
	}

	if (Array.isArray(ret))
	{
		ret = ret.map(v => String(v));
	}

	return ret;
}

export function getOptions(options: IOptions): IOptions
{
	let opts = Object.assign({} as IOptions, options);

	opts.dataTables = opts.dataTables || TABLE_RANGE;

	return opts;
}

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(matchRange, "__esModule", { value: true });

	Object.defineProperty(matchRange, 'matchRange', { value: matchRange });
	Object.defineProperty(matchRange, 'default', { value: matchRange });

	Object.defineProperty(matchRange, 'getOptions', {
		value: getOptions,
	});
	Object.defineProperty(matchRange, 'toRegExpString', {
		value: toRegExpString,
	});
	Object.defineProperty(matchRange, 'TABLE_RANGE', {
		value: TABLE_RANGE,
	});
	Object.defineProperty(matchRange, 'fillRange', {
		value: fillRange,
	});
}

export default matchRange;
