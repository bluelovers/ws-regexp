/**
 * Created by user on 2018/1/31/031.
 */

import { create } from 'regexp-cjk';
import { table, table2 } from './table';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·])';

export const SP_ESCAPE = '（河蟹）';

export interface IOptions
{
	toRegExp?: () => RegExp,

	count?: number;
}

export function escape(text: string, options: IOptions = {})
{
	let t = table2
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

			let s = fn('(' + value.split('').join(')(') + ')', 'ig');


			text = text.replace(s, r);
		});
	}
	while (--count > 0);

	return text;
}

export function unescape(text: string, options: IOptions = {})
{
	let t = table2
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
		let rs = fn('(' + value.split('').join(')' + SP_KEY + '(') + ')', 'ig');
		let s = new RegExp(rs.source.split(SP_KEY).join(SP_REGEXP), 'ig');

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
	const fn = options.toRegExp ? options.toRegExp : create;

	return table2
		.concat(table)
		.reduce(function (a, b)
		{
			let c;
			c = Array.isArray(b) ? b : [b];

			c.forEach(function (value, index, array)
			{
				let rs: [string, string, string];

				rs = [value.split('').join(SP_KEY), c[0], 'ig'];

				a.push(rs);
			});

			return a;
		}, [] as [string, string, string][])
		;
}

import * as self from './index';
export default self;
