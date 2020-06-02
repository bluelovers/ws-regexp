/**
 * Created by user on 2020/6/2.
 */

import { IOptionsSlugify } from '../types';
import { _replaceEmoji } from '../emoji';
import { _replaceCjk } from '../cjk';
import _transliterate from '@sindresorhus/transliterate';

export function _text(word: string, options: IOptionsSlugify)
{
	if (options.emoji)
	{
		word = _replaceEmoji(word, options);
	}

	if (options.cjk ?? true)
	{
		word = _replaceCjk(word, options);
	}

	if (options.transliterate ?? true)
	{
		word = _transliterate(word);
	}

	word = word
		.replace(/[^\w\d ]+/g, ' ')
		.replace(/\s+/g, ' ')
	;

	return word
}
