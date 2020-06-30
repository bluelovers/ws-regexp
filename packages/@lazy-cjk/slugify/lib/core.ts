/**
 * Created by user on 2020/5/31.
 */

import { IOptionsSlugify } from './types';
import deburr from 'lodash/deburr';
import upperFirst from 'lodash/upperFirst';
import upperCaseExtra from 'lodash/upperCase';
import { reNotPinyinChar } from '@regexp-cjk/regex-pinyin';
import { _text } from './core/transliterate';

const reDefaultSeparator = new RegExp(`${reNotPinyinChar}+`, 'ug')

export function handleOptions(options?: IOptionsSlugify)
{
	options = options || {};

	options.separatorRegexp = options.separatorRegexp ?? reDefaultSeparator;
	options.trimRegexp = options.trimRegexp ?? new RegExp(`^(?:${options.separatorRegexp.source})|(?:${options.separatorRegexp.source})$`, 'ugi');
	options.separator = options.separator ?? '-';
	options.transliterate = options.transliterate ?? true;

	return options
}

export function _coreCase(word: string, options?: IOptionsSlugify)
{
	options = options || {};

	if (options.upperCaseExtra)
	{
		word = upperCaseExtra(word)
	}

	if (options.lowerCaseExtra)
	{
		word = upperCaseExtra(word)
	}

	if (options.upperCase)
	{
		word = word.toUpperCase()
	}
	else
	{
		if (options.lowerCase)
		{
			word = word.toLowerCase()
		}

		if (options.upperFirst)
		{
			word = upperFirst(word)
		}
	}

	return word
}

export function _coreText(word: string, options?: IOptionsSlugify)
{
	word = _text(word, options);

	word = _coreCase(word, options);

	if (options.deburr)
	{
		word = deburr(word)
	}

	return word
}

export function _coreTextAfter(word: string, options?: IOptionsSlugify)
{

	word = _slice(word, options);
	word = _trim(word, options);

	return word
}

export function _core(word: string, options?: IOptionsSlugify)
{
	if (word === '')
	{
		return ''
	}

	options = handleOptions(options);

	word = _coreText(word, options)

	if (!options.noStripOthers)
	{
		word = word
			.replace(options.separatorRegexp, options.separator)
		;
	}

	word = _coreTextAfter(word, options)

	if (word === '' && !options.allowEmptyResult)
	{
		throw new RangeError(`result is empty`)
	}

	return word
}

export function _trim(word: string, options: IOptionsSlugify)
{
	return word
		.trim()
		.replace(options.trimRegexp, '')
	;
}

export function _slice(word: string, options: IOptionsSlugify)
{
	if (word.length && options.maxLength)
	{
		word = word.slice(0, options.maxLength);
	}

	word = _trim(word, options);

	return word
}
