
export const REGEXP_TO_STRING_TAG = Object.prototype.toString.call(/a/) as string;

export function toHex(n: number, toUpperCase?: boolean)
{
	let s = n.toString(16).padStart(4, '0');
	return toUpperCase ? s.toUpperCase() : s;
}

/**
 * @code
 * console.log(core.toUnicode('𠮷')); // => \u{20bb7}
 * console.log(core.toUnicode('𠮷'.codePointAt(0)));
 *
 * console.log(core.toUnicode('𠮷', true)); // => \ud842\udfb7
 * console.log(core.toUnicode('𠮷'.codePointAt(0), true));
 *
 * /[𠮷]/u.test('𠮷')
 * /[\u{20bb7}]/u.test('𠮷')
 * /[\ud842\udfb7]/u.test('𠮷')
 */
export function toUnicode(charCode: number | string, noMerge?: boolean, wrap?: boolean)
{
	let s: string;

	if (typeof charCode == 'string')
	{
		s = charCode;
		charCode = s.codePointAt(0);
	}

	if (charCode > 0xffff && noMerge)
	{
		let p: number[];

		if (typeof s != 'string')
		{
			//s = String.fromCodePoint(charCode);
			p = surrogatePair(charCode);
		}
		else
		{
			p = [s.charCodeAt(0), s.charCodeAt(1)];
		}

		return p.map(function (n)
		{
			return _toUnicode(n, wrap);
		}).join('');
	}

	return _toUnicode(charCode, wrap);
}

export function _toUnicode(charCode: number, wrap?: boolean)
{
	let hex = toHex(charCode);
	return (wrap || hex.length > 4) ? `\\u{${hex}}` : `\\u${hex}`;
}

export function isDoubleUnicode(str: string)
{
	return str.charCodeAt(0) == str.codePointAt(0);
}

export function isRegExp<T extends RegExp>(r: T): T & RegExp
export function isRegExp(r: RegExp): r is RegExp
export function isRegExp(r): RegExp | null
export function isRegExp(r)
{
	if ((r instanceof RegExp) || Object.prototype.toString.call(r) === REGEXP_TO_STRING_TAG)
	{
		return r;
	}

	return null;
}

/**
 * @link https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
 * @link https://github.com/ikatyang/regexp-util/blob/7810ce61ff8becd728b745eb6d5c1ca76adfebe0/src/charset.ts#L289
 *
 * @code
 * surrogatePair('𠮷'.codePointAt(0)) // => { h: 55362, l: 57271 }
 * console.log('𠮷'.charCodeAt(0), '𠮷'.charCodeAt(1)) // => 55362 57271
 */
export function surrogatePair(codepoint: number)
{
	let h = Math.floor((codepoint - 0x10000) / 0x400) + 0xd800;
	let l = (codepoint - 0x10000) % 0x400 + 0xdc00;

	return Object.assign([h, l] as [number, number], {
		h,
		l,
	});
}

import * as self from './index';

export default self as Readonly<typeof self>;

Object.freeze(self);
