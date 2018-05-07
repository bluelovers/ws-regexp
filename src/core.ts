/**
 * Created by user on 2018/5/7/007.
 */

import * as _fillRange from 'fill-range';
import TABLE_RANGE from './table';

export { TABLE_RANGE }

export type IOptions = {

	dataTables?: typeof TABLE_RANGE,

	arrayMode?: boolean,

	createRegExpString?: boolean,
	createRegExpClass?: boolean,
}

export function matchRange(from, to, options: IOptions & {
	createRegExpString: true,
}): string
export function matchRange(from, to, options?: IOptions): string[]
export function matchRange(from, to, options: IOptions = {}): string[] | string
{
	options = getOptions(options);

	let s = from;
	let e = to;

	let ret: string[] = null;

	Object
		.keys(options.dataTables)
		.some(function (key)
		{
			return options.dataTables[key].some(function (arr)
			{
				let i = arr.indexOf(s);
				let j = arr.indexOf(e, i);

				if (i !== -1 && j !== -1)
				{
					ret = arr.slice(i, j + 1);
					return true;
				}
			})
		})
	;

	if (ret === null)
	{
		return null;
	}

	if (options.createRegExpString)
	{
		return toRegExpString(ret, options.createRegExpClass);
	}

	return ret;
}

export function toRegExpString(arr: string[], warpClass?: boolean)
{
	if (arr.length == 1)
	{
		return arr[0];
	}

	let s = arr.join('');

	return warpClass ? '[' + s + ']' : s;
}

export function fillRange(from, to, options: IOptions = {}): string[]
{
	options = getOptions(options);

	let s =from;
	let e = to;

	let ret: string[] = null;

	ret = matchRange(from, to, options);

	if (!ret && (options.arrayMode || String(s).length == 1 && String(e).length == 1))
	{
		let _ok: boolean;

		if (typeof s == 'string' && typeof e == 'string')
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

		if (!ret || !ret.length)
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

export function getOptions(options: IOptions)
{
	let opts = Object.assign({}, options);

	opts.dataTables = opts.dataTables || TABLE_RANGE;

	return opts;
}

import * as self from '../index';
export default self;
