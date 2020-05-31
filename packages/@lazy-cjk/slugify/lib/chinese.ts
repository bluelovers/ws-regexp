import { replaceChar, char2pinyin_01 } from '@lazy-cjk/cns-11643';
import { IOptionsSlugify } from './types';
import { _core } from './core';
import { slugify as _slugify } from 'transliteration';

export function _replaceChinese(text: string, options?: IOptionsSlugify)
{
	let append = options?.separator ?? ' ';

	return replaceChar(text, (s, c) =>
	{
		let n = _slugify(c);

		if (n === '')
		{
			n = char2pinyin_01(c)[0]
		}

		return n + append
	})
}

export function slugifyChinese(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceChinese(word), options)
}
