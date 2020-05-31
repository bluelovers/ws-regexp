import { replaceChar, char2pinyin_01 } from '@lazy-cjk/cns-11643';
import { IOptionsSlugify } from './types';
import { _core } from './core';
import { slugify as _slugify } from 'transliteration';
import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';

const REGEXP_TEST = new RegExp(_re_cjk_conv('u').source, 'ug');

export function _replaceCjk(text: string, options?: IOptionsSlugify)
{
	let append = options?.separator ?? ' ';

	return text.replace(REGEXP_TEST, (s) =>
	{
		let n = _slugify(s);

		if (n === '')
		{
			n = char2pinyin_01(s)[0]
		}

		if (n)
		{
			return n + append
		}

		return s
	})

	/*
	return replaceChar(text, (s, c) =>
	{
		let n = _slugify(c);

		if (n === '')
		{
			n = char2pinyin_01(c)[0]
		}

		return n + append
	})
	 */
}

export function slugifyCjk(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceCjk(word), options)
}
