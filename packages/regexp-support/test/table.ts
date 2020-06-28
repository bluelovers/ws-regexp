/**
 * Created by user on 2018/5/7/007.
 */

import { UNICODE_SCRIPTS_ALL, wrapToRegexName as wrapToRegexName2 } from '../lib/pattern/charset/unicode-script';
import { UNICODE, UNICODE_ALL, wrapToRegexName } from '../lib/pattern/charset/unicode';
import CACHE_BLOCKS from '../lib/pattern/cache/blocks';
import CACHE_CATEGORIES, { NAME_ALIAS } from '../lib/pattern/cache/categories';
import CACHE_PROPERTIES from '../lib/pattern/cache/properties';
import CACHE_SCRIPTS from '../lib/pattern/cache/scripts';

import * as util from "util";

util.inspect.defaultOptions.colors = true;

let tests = [

	'「',
	'…',
	'※',

	'？',
	'Ｖ',
	'５',

	//'!',

	'👧👧👧🏻',
	'🏽',

	'😀',

	'カタカナ',

	...('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')),

	'ማንዣበቢያ',
	'আমার',
	'ხომალდი',
	'летачко',
	'cánh',
	'中文字符',

	'لمو',

	"\n", ".", "\t", "\r", "\f",
	" ", "-", "!", "»", "›", "‹", "«",
	"ͳ", "Θ", "Σ", "Ϫ", "Ж", "ؤ",
	"༬", "༺", "༼", "ང", "⃓", "✄",
	"⟪", "や", "゙",
	"+", "→", "∑", "∢", "※", "⁉", "⧓", "⧻",
	"⑪", "⒄", "⒰", "ⓛ", "⓶",
	"\u0300" /* COMBINING GRAVE ACCENT, Mn */,
	"\u0BCD" /* TAMIL SIGN VIRAMA, Me */,
	"\u20DD" /* COMBINING ENCLOSING CIRCLE, Me */,
	"\u2166" /* ROMAN NUMERAL SEVEN, Nl */,

];

Object.keys(UNICODE_ALL)
	.forEach(function (name)
	{
		let k = wrapToRegexName(name);

		let r: RegExp;

		try
		{
			r = new RegExp(`^${k}+$`, 'u');
		}
		catch (e)
		{
			console.log(k, false);
			return;
		}

		//console.log(r);

		let ret = tests.find(function (text)
		{
			return r.test(text);
		});

		if (typeof ret != 'undefined')
		{
			console.log(r, ret, toHex(ret.codePointAt(0)));
		}

	})
;

Object.keys(UNICODE_SCRIPTS_ALL)
	.forEach(function (name)
	{
		let k = wrapToRegexName2(name);

		let r: RegExp;

		try
		{
			r = new RegExp(`^${k}+$`, 'u');
		}
		catch (e)
		{
			console.log(k, false);
			return;
		}

		//console.log(r);

		let ret = tests.find(function (text)
		{
			return r.test(text);
		});

		if (typeof ret != 'undefined')
		{
			console.log(r, ret, toHex(ret.codePointAt(0)));
		}

	})
;

function toHex(n: number)
{
	return n.toString(16).padStart(4, '0')
}
