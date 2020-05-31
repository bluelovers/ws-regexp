/**
 * Created by user on 2020/5/31.
 */

import { IOptionsSlugify } from './types';
import deburr from 'lodash/deburr';
import upperFirst from 'lodash/upperFirst';
import upperCaseExtra from 'lodash/upperCase';

export function handleOptions(options?: IOptionsSlugify)
{
	options = options || {};

	options.separatorRegexp = options.separatorRegexp ?? /[^\w\d]+/g;
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

export function _core(word: string, options?: IOptionsSlugify)
{
	if (word === '')
	{
		return ''
	}

	options = handleOptions(options);

	if (options.deburr)
	{
		word = deburr(word)
	}

	word = _trim(word, options);

	word = _coreCase(word, options);

	word = word
		.replace(options.separatorRegexp, options.separator)
	;

	word = _slice(word, options);

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
