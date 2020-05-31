/**
 * Created by user on 2020/5/30.
 */
import { IOptionsSlugify } from './lib/types';
import { _core, handleOptions, _coreCase, _slice } from './lib/core';
import { _replaceEmoji } from './lib/emoji';
import { _replaceCjk } from './lib/chinese';
import _transliterate from '@sindresorhus/transliterate';

function _text(word: string, options: IOptionsSlugify)
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

	return word
}

export function transliterate(word: string, options?: IOptionsSlugify)
{
	options = handleOptions(options);
	options = {
		...options,
	}
	options.separator = ' ';

	word = _text(word, options);

	word = _coreCase(word, options);

	word = _slice(word, options);

	return word
		.replace(/\s+/g, ' ')
}

export function slugify(word: string, options?: IOptionsSlugify)
{
	options = handleOptions(options);

	word = _text(word, options);

	return _core(word, options)
}

export default slugify


