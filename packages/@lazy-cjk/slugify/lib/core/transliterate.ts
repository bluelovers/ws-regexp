/**
 * Created by user on 2020/6/2.
 */

import { IOptionsSlugify } from '../types';
import { _replaceEmoji } from '../emoji';
import { _replaceCjk } from '../cjk';
import _transliterate from '@sindresorhus/transliterate';
import { reNotPinyinChar } from '@regexp-cjk/regex-pinyin';

const reStrip = new RegExp(`[${reNotPinyinChar.source.replace(/^\[|\]$/g, '')}\u0020]+`, 'ug')

export function _text(word: string, options: IOptionsSlugify)
{
	if (options.emoji)
	{
		word = _replaceEmoji(word, options);
	}

	if (options.transliterate ?? true)
	{
		word = _transliterate(word);
	}

	if (options.cjk ?? true)
	{
		word = _replaceCjk(word, options);
	}

	if (!options.noStripOthers)
	{
		word = word
			.replace(reStrip, ' ')
		;
	}

	word = word
		.replace(/[\s\u00a0]/g, ' ')
	;

	return word
}
