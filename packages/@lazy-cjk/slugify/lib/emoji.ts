/**
 * Created by user on 2020/5/31.
 */

import emoji from 'emoji.json';
import escapeStringRegexp from 'escape-string-regexp';
import { IOptionsSlugify } from './types';
import { _core } from './core';

export const listSupportedEmoji: [RegExp, string][] = emoji
	.map(({ char, name }) => [new RegExp(`${escapeStringRegexp(char)}`, 'ug'), name])
;

export const reSupportedEmoji = new RegExp(listSupportedEmoji.map(ls => ls[0].source).join('|'), 'ug');

export function _replaceEmoji(word: string, options?: IOptionsSlugify)
{
	let append = options?.separator ?? ' ';

	listSupportedEmoji
		.forEach(([s, r]) =>
		{
			word = word.replace(s, r + append)
		})
	;

	return word
}

export function slugifyEmoji(word: string, options?: IOptionsSlugify)
{
	return _core(_replaceEmoji(word), options)
}
