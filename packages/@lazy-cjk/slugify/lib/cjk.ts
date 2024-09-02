import { IOptionsSlugify } from './types';
import { _core } from './core';
import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';
import { romanize as romanize_jp } from '@lazy-cjk/japanese/lib/romanize';
import { katakanaRegex, hiraganaRegex } from '@lazy-cjk/japanese/lib/data/kana';
import { romanize as romanize_kr } from '@lazy-cjk/korean-romanize';
import { newZhPinyinFn } from './cjk/chinese';

const REGEXP_TEST = new RegExp(_re_cjk_conv('u').source, 'ug');

const REGEXP_TEST_JP = new RegExp('(?:(?:' + katakanaRegex.source + ')|(?:' + hiraganaRegex.source + '))+', 'ug');

export function _replaceCjk(text: string, options?: IOptionsSlugify)
{
	let append = options?.noSepBetweenZhChar ? '' : (options?.separator ?? ' ');

	const char2pinyin = newZhPinyinFn(options);

	text = text.replace(REGEXP_TEST, (s) =>
	{
		let n = char2pinyin(s);

		if (n?.length)
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

	text = romanize_kr(text, {
		ignoreUnSupported: options.ignoreUnSupported ?? true,
	});

	return text
}

export function slugifyCjk(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceCjk(word), options)
}
