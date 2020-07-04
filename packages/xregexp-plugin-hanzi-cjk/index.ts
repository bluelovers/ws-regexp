/**
 * Created by user on 2018/4/24/024.
 */

import * as XRegExp from 'xregexp';
import cjkConv from 'cjk-conv';

export type IOptions = {
	scope?: string,
	flags?: string,
};

export const _CACHE = new Set();
export const X_REGEX_DATA = 'xregexp';

export function addSupportToXRegExp<T extends typeof XRegExp>(xr: T = XRegExp,
	options: IOptions = {}
): T & typeof XRegExp
{
	if (xr === null)
	{
		xr = XRegExp;
	}

	if (isInstalled(xr))
	{
		console.warn(`this plugin already installed.`);
	}
	else
	{
		xr.addToken(/[\u4E00-\u9FFFの]/, (match, scope) =>
			{
				//console.log(match, scope);

				let a = cjkConv.zhTable.auto(match[0]);

//				console.log(match, scope, a);

				if (a.length)
				{
					return scope == 'class' ? a.join('') : '[' + a.join('') + ']';
				}
				else if (1)
				{
					return match[0];
				}

				throw new SyntaxError(`Invalid escape ${match[0]}`);
			},
			{
				scope: options.scope || 'default',
				//leadChar: '\\',
				//reparse: true,

				// @ts-ignore
				flag: options.flags || undefined,
			}
		);

		_CACHE.add(xr);
	}

	return xr;
}

export function isXRegExp<T extends RegExp & {
	[X_REGEX_DATA],
}>(xr: T)
{
	return xr[X_REGEX_DATA] ? true : false;
}

export function createXRegExp(pattern: string | RegExp | XRegExp, flags?: string, xr: XRegExp = XRegExp)
{
	if (typeof pattern == 'string')
	{
		return xr(pattern, flags);
	}
	else if (isXRegExp(pattern))
	{
		return xr(pattern);
	}

	return xr(pattern.source, typeof flags == 'string' ? flags : pattern.flags);
}

export const install = addSupportToXRegExp;

export function isInstalled<T extends typeof XRegExp>(xr: T = XRegExp)
{
	if (xr === null)
	{
		xr = XRegExp;
	}

	return _CACHE.has(xr);
}

export default addSupportToXRegExp;
