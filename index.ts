/**
 * Created by user on 2018/1/31/031.
 */

import { create } from 'regexp-cjk';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·])';

export const SP_ESCAPE = '（河蟹）';

/**
 * 和諧/河蟹
 *
 * @type {string[][]}
 */
export const table = [
	'噁心',
	'触手',
	'白痴',
	'打倒',
	'固守',
	'貴族',
	'自由',
	'討伐',
	'竊聽',
	'色情',
	'禁止',
	'淫穢',
	'下流',
	'含著',
	'調教',
	'情欲',
	'尸体',
	'凌辱',
	'幹掉',
	'非法',
	'激烈',
	'互毆',
	'求愛',
	'間諜',
	'賭局',
	'下賤',
	'爆炸',
	'呻吟',
	'屁股',
	'笨蛋',
	'蠢货',
	'洗脑',
	'魅惑',
	'狂化',
	'混乱',
	'是非',
	'弱智',
	'死掉',
	'日本',
	'法克',
	'畜生',
	'麻痹',
	'废物',
];

/**
 * 去和諧時會以第一個項目為返回結果
 *
 * @type {string[][]}
 */
export const table2 = [
	['裸体', '果体',],
];

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
