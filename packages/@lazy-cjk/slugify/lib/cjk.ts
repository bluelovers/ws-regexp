import { replaceChar, char2pinyin_01 } from '@lazy-cjk/cns-11643';
import { IOptionsSlugify } from './types';
import { _core } from './core';
import { slugify as _slugify } from 'transliteration';
import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';
import romanize_jp from '@lazy-cjk/japanese/lib/romanize';
import { katakanaRegex, hiraganaRegex } from '@lazy-cjk/japanese/lib/data/kana';
import romanize_kr from '@lazy-cjk/korean-romanize';

const REGEXP_TEST = new RegExp(_re_cjk_conv('u').source, 'ug');

const REGEXP_TEST_JP = new RegExp('(?:(?:' + katakanaRegex.source + ')|(?:' + hiraganaRegex.source + '))+', 'ug');

export function _replaceCjk(text: string, options?: IOptionsSlugify)
{
	let append = options?.separator ?? ' ';

	text = text.replace(REGEXP_TEST, (s) =>
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
	});

	text = text.replace(REGEXP_TEST_JP, (s) =>
	{
		let n = romanize_jp(s);

		if (n !== '')
		{
			return n
		}

		return s
	});

	text = romanize_kr(text);

	return text
}

export function slugifyCjk(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceCjk(word), options)
}
