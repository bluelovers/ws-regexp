/**
 * Created by user on 2020/5/31.
 */

import { IOptionsSlugify } from './types';
import { _core } from './core';
import { mapEmoji, replaceEmoji } from '@lazy-cjk/emoji-regex';

export function _replaceEmoji(word: string, options?: IOptionsSlugify)
{
	let append = options?.separator ?? ' ';

	return replaceEmoji(word, (emoji) => {
		return mapEmoji.get(emoji) + append
	})
}

export function slugifyEmoji(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceEmoji(word), options)
}
