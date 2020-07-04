import { IXRegExpLike, isXRegExp } from '@regexp-cjk/is-xregexp';
import XRegExp from 'xregexp';

export function createXRegExp<T = IXRegExpLike>(pattern: string | RegExp | IXRegExpLike, flags?: string, xr: typeof XRegExp = XRegExp): T
{
	if (typeof pattern === 'string')
	{
		return xr(pattern, flags) as any;
	}
	else if (isXRegExp(pattern))
	{
		return xr(pattern) as any;
	}

	return xr(pattern.source, typeof flags == 'string' ? flags : pattern.flags) as any;
}

export default createXRegExp
