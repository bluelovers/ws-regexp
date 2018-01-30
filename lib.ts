/**
 * Created by user on 2018/1/31/031.
 */

import { parse as regexpParse, types } from 'regexp2';
import { cn2tw, tw2cn } from 'chinese_convert';
import * as StrUtil from 'str-util';

export function replace_literal(r: string, cb : (text: string) => string): string
export function replace_literal(r: RegExp, cb : (text: string) => string): RegExp
export function replace_literal(r, cb : (text: string) => string)
{
	let bool = (r instanceof RegExp);

	let rb = regexpParse(r);
	let str = toRegexp(rb, cb);

	if (bool)
	{
		return new RegExp(str, r.flags) as RegExp;
	}

	return str as string;
}

function toRegexp(res, cb): string
{
	if (res.body)
	{
		if (res.body.type == types.ALTERNATE)
		{
			return toRegexp(res.body.left, cb) + '|' + toRegexp(res.body.right, cb);
		}
		else if (res.type == types.MATCH)
		{
			return res.body.reduce(function(a, b){
				a.push(_(b, cb));

				return a;
			}, []).join('');
		}
		else if (res.type == types.QUANTIFIED)
		{
			return _(res.body, cb) + toRegexp(res.quantifier, cb);
		}

		return _(res.body, cb);
	}
	if (res.type == types.ALTERNATE)
	{
		return toRegexp(res.left, cb) + '|' + toRegexp(res.right, cb);
	}
	else
	{
		//console.log(res, res.type);
	}

	return res.text;
}

function _(b, cb)
{
	switch (b.type)
	{
		case types.CHARSET:
			return b.text;
		case types.POSITIVE_LOOKAHEAD:
			return '(?=' + toRegexp(b, cb) + ')';
		case types.NEGATIVE_LOOKAHEAD:
			return '(?!' + toRegexp(b, cb) + ')';
		case types.CAPTURE_GROUP:
			//console.log(b.body, b.type, b.body.type);
			return '(' + toRegexp(b, cb) + ')';
		case types.NON_CAPTURE_GROUP:
			return '(?:' + toRegexp(b, cb) + ')';
		case types.MATCH:
			return toRegexp(b, cb);
		case types.QUANTIFIED:
			//console.log(888, b, b.type);
			return _(b.body, cb) + toRegexp(b.quantifier, cb);
		case types.LITERAL:

			let text = b.text;

			text = cb(text);

			return text;
		default:
			break;
	}

	return b.toString();
}

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

export const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

export function regex_str(str: string)
{
	return str
		.replace(/(\W)/g, '\\$1')
		;
}

export function _word_zh(search: string, ret, flags?, skip?: string)
export function _word_zh(search: RegExp, ret, flags?, skip?: string)
export function _word_zh(search, ret, flags = 'ig', skip?: string)
{
	let s = replace_literal(search, function (text)
	{
		return _word_zh_core(text, skip);
	});

	// @ts-ignore
	flags = (s instanceof RegExp) ? s.flags : flags;

	return [s, ret, flags];
}

export function _word_zh_core(search: string, skip: string)
{
	return search.replace(/[\u4E00-\u9FFFの]/g, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let jt = StrUtil.jp2zht(char);
		let js = StrUtil.jp2zhs(char);

		let a =[
			char,
			...zhtw_convert.tw(char),
			...zhtw_convert.cn(char),
		];

		if (!skip || skip.indexOf(jt) == -1)
		{
			a = a.concat(...zhtw_convert.cn(jt));
		}
		if (!skip || skip.indexOf(js) == -1)
		{
			a = a.concat(...zhtw_convert.tw(js));
		}

		if (zhtw_convert.table_jp[char])
		{
			a = a.concat(zhtw_convert.table_jp[char]);
		}

		a = array_unique(a);

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export namespace zhtw_convert
{
	let _table = {
		'罗': '羅',
	};

	export const table_jp = {
		'の': [
			'之',
			'的',
		],
	};

	let _table_cn = Object.keys(_table)
		.reduce(function (a, b)
		{
			a[_table[b]] = b;

			return a;
		}, {})
	;

	export function tw(char): string[]
	{
		let a = [];

		if (_table[char])
		{
			a.push(_table[char])
		}

		a.push(cn2tw(char));

		return a;
	}

	export function cn(char): string[]
	{
		let a = [];

		if (_table_cn[char])
		{
			a.push(_table_cn[char])
		}

		a.push(tw2cn(char));

		return a;
	}
}
