/**
 * Created by user on 2018/1/31/031.
 */

import { create } from 'regexp-cjk';
export * from './table';
import { table, table2, table3, array_unique } from './table';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·]|\\*|□|圌)';

export const SP_ESCAPE = '（河蟹）';

export interface IOptions
{
	toRegExp?: () => RegExp,

	count?: number;

	followReturn?: boolean,

	tables?,

	flags?: string,
}

export function escape(text: string, options: IOptions = {})
{
	let flags = typeof options.flags == 'string' ? options.flags : 'ig';

	let t = (options.tables || [])
		.concat(table2)
		.concat(table3)
		.reduce(function (a, b)
		{
			if (Array.isArray(b))
			{
				a = a.concat(b);
			}
			else
			{
				a.push(b);
			}

			return a;
		}, [])
		.concat(table)
	;

	let count = options.count || 1;
	const fn = options.toRegExp ? options.toRegExp : create;

	do
	{
		t.forEach(function (value: string, index, array)
		{
			let a = new Array(value.split('').length).fill(0).map(function (value, index, array)
			{
				return '$' + (index + 1);
			});
			let r = a.join(SP_ESCAPE);

			let s = fn('(' + value.split('').join(')(') + ')', flags);

			text = text.replace(s, r);
		});
	}
	while (--count > 0);

	return text;
}

export function unescape(text: string, options: IOptions = {})
{
	let flags = typeof options.flags == 'string' ? options.flags : 'ig';

	let t = (options.tables || [])
		.concat(table2)
		.concat(table3)
		.reduce(function (a, b)
		{
			if (Array.isArray(b))
			{
				a = a.concat(b);
			}
			else
			{
				a.push(b);
			}

			return a;
		}, [])
		.concat(table)
	;

	let count = options.count || 1;
	const fn = options.toRegExp ? options.toRegExp : create;

	t.forEach(function (value: string, index, array)
	{
		let rs = fn('(' + value.split('').join(')' + SP_KEY + '(') + ')', flags);
		let s = new RegExp(rs.source.split(SP_KEY).join(SP_REGEXP), flags);

		let a = new Array(value.split('').length).fill(0).map(function (value, index, array)
		{
			return '$' + (index + 1);
		});
		let r = a.join('');

		text = text.replace(s, r);
	});

	return text;
}

export function getTable(options: IOptions = {}): [string, string, string][]
{
	let flags = typeof options.flags == 'string' ? options.flags : 'ig';

	return (options.tables || [])
		.concat(table2)
		.concat(table3)
		.concat(table)
		.reduce(function (a, b)
		{
			let c;
			c = Array.isArray(b) ? b : [b];

			c.forEach(function (value, index, array)
			{
				let rs: [string, string, string];

				let s = value.split('');
				let r;

				if (c.length == 1 && options.followReturn)
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
					r = c[0];
				}

				rs = [s.join(SP_KEY), r, flags];

				a.push(rs);
			});

			return a;
		}, [] as [string, string, string][])
		;
}

import * as self from './index';
export default self;
