/**
 * Created by user on 2020/5/31.
 */

import uniCharMatchSource from './const/uniCharMatchSource';

const re_full_match = newCharMatchRegExp('u', (uniCharMatchSource) => `^${uniCharMatchSource}$`);
const re_replace = newCharMatchRegExp('ug', (uniCharMatchSource) => `(${uniCharMatchSource})`);

export function newCharMatchRegExp(flags: string = 'u', fn?: (uniCharMatchSource: string) => string)
{
	if (!flags.includes('u'))
	{
		flags += 'u';
	}

	return new RegExp(fn?.(uniCharMatchSource) ?? uniCharMatchSource, flags)
}

export function isExistsChar(char: string)
{
	return re_full_match.test(char)
}

export function replaceChar(input: string, fn: (...args: string[]) => string)
{
	return input.replace(re_replace, fn)
}

export function splitChar(input: string)
{
	return input.split(re_replace)
}
