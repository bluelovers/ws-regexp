/**
 * Created by user on 2018/1/31/031.
 */

import { create, IApi } from 'regexp-cjk';

export * from './table';
import { table, table2, table3, array_unique } from './table';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·]|\\*|□|圌|[=＝]|\\\\\\\\|\\\/\\\/|、)';

export const SP_ESCAPE = '（河蟹）';

export interface IOptions
{
	toRegExp?: IApi,
	fnSplitChar?: (s: string) => string[],

	count?: number;

	staticReturn?: boolean,

	tables?,

	flags?: string,
}

export function escape(text: string, options: IOptions = {})
{
	let count = options.count || 1;
	const fn = options.toRegExp ? options.toRegExp : create;

	do
	{
		loopTable(function (value, index, array, options)
		{
			let sa = options.fnSplitChar(value);

			let a = new Array(sa.length).fill(0).map(function (value, index, array)
			{
				return '$' + (index + 1);
			});
			let r = a.join(SP_ESCAPE);

			let s = fn('(' + sa.join(')(') + ')', options.flags);

			text = text.replace(s, r);
		}, options);
	}
	while (--count > 0);

	return text;
}

export function unescape(text: string, options: IOptions = {})
{
	let count = options.count || 1;
	const fn = options.toRegExp ? options.toRegExp : create;

	loopTable(function (value, index, array, options, cache)
	{
		let sa = options.fnSplitChar(value);

		let rs = fn('(' + sa.join(')' + SP_KEY + '(') + ')', options.flags);
		let s = new RegExp(rs.source.split(SP_KEY).join(SP_REGEXP), options.flags);

		let r;

		if (typeof cache.retLast != 'undefined' && cache.retLast !== null && !(cache.retLast instanceof String))
		{
			r = cache.retLast;
		}
		else if (!options.staticReturn && cache.retLast instanceof String)
		{
			r = cache.retLast.toString();
		}
		else if (!options.staticReturn && array.length == 1)
		{
			r = new Array(sa.length)
				.fill(0)
				.map(function (value, index, array)
				{
					return '$' + (index + 1);
				}).join('')
			;
		}
		else
		{
			r = array[0];
		}

		text = text.replace(s, r);
	}, options);

	return text;
}

export function getTable(options: IOptions = {}): [string, string, string][]
{
	return loopTable(function (value, index, array, options, cache)
	{
		let rs: [string, string, string];

		let s = options.fnSplitChar(value);
		let r;

		if (typeof cache.retLast != 'undefined' && cache.retLast !== null && !(cache.retLast instanceof String))
		{
			r = cache.retLast;
		}
		else if (!options.staticReturn && cache.retLast instanceof String)
		{
			r = cache.retLast.toString();
		}
		else if (!options.staticReturn && array.length == 1)
		{
			r = new Array(s.length)
				.fill(0)
				.map(function (value, index, array)
				{
					return '$' + (index + 1);
				}).join('')
			;
		}
		else
		{
			r = array[0];
		}

		rs = [s.join(SP_KEY), r, options.flags];

		return rs;
	}, options);
}

export interface ICache
{
	[key: string]: any,
	[index: number]: any,
	retLast?: String | Function,
}

export function loopTable(cb: (value: string, index: number, array: string[], options: IOptions, cache?: ICache) => any,
	options: IOptions
)
{
	options.flags = typeof options.flags == 'string' ? options.flags : 'ig';
	options.fnSplitChar = options.fnSplitChar || splitChar;
	options.toRegExp = options.toRegExp || create;

	return (options.tables || [])
		.concat(table2)
		.concat(table3)
		.concat(table)
		.reduce(function (a, b)
		{
			let c;
			c = Array.isArray(b) ? b.slice() : [b];

			const cache: ICache = {};

			if (c.length > 1 && typeof c[c.length - 1] != 'string')
			{
				cache.retLast = c.pop();
			}

			c.forEach(function (value, index, array)
			{
				let rs = cb(value, index, array, options, cache);

				a.push(rs);
			});

			return a;
		}, [])
		;
}

export function splitChar(s: string): string[]
{
	return s.split('');
}

import * as self from './index';

export default self;
