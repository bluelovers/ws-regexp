/**
 * Created by user on 2020/5/30.
 */
import { IOptionsSlugify } from './lib/types';
import { _core, handleOptions, _coreCase, _slice, _coreText, _coreTextAfter } from './lib/core';
import { _text } from './lib/core/transliterate';

export function transliterate(word: string, options?: IOptionsSlugify)
{
	options = handleOptions(options);
	options = {
		...options,
	}
	options.separator = ' ';
	options.noSepBetweenZhChar = true;
	options.noStripOthers = true;

	return _core(word, options)
}

export function slugify(word: string, options?: IOptionsSlugify)
{
	options = handleOptions(options);

	return _core(word, options)
}

export default slugify


