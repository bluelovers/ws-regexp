/**
 * Created by user on 2018/4/24/024.
 */

import XRegExp, { TokenScopeOption, TokenFlag, TokenOptions, TokenScope } from 'xregexp';
import { auto } from '@lazy-cjk/zh-table-list';
import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';
import { createXRegExp } from '@regexp-cjk/create-xregexp';
import { isXRegExp, X_REGEX_DATA } from '@regexp-cjk/is-xregexp';

export interface IOptions extends TokenOptions
{
	flags?: TokenOptions["flag"]
}

export { createXRegExp }
export { isXRegExp, X_REGEX_DATA }

const _CACHE = new WeakSet<typeof XRegExp>();

const REGEXP_TEST = _re_cjk_conv('u', 'のと㊥㊦㊤');

export function addSupportToXRegExp<T extends typeof XRegExp>(xr?: T, options: IOptions = {}): T
{
	// @ts-ignore
	xr = xr ?? XRegExp;

	if (isInstalled(xr))
	{
		console.warn(`this plugin already installed.`);
	}
	else
	{
		xr.addToken(REGEXP_TEST, (match, scope, flags) =>
			{
				let s = match[0];
				let a = auto(s);

				if (a.length > 1 || a[0] !== s)
				{
					return scope === 'class' ? a.join('') : '[' + a.join('') + ']';
				}
				else if (1)
				{
					return s;
				}

				throw new SyntaxError(`Invalid escape ${s}`);
			},
			{
				...options,
				scope: options.scope ?? 'default',
				//leadChar: '\\',
				//reparse: true,
				flag: options.flags ?? options.flag,
			},
		);

		_CACHE.add(xr);
	}

	return xr;
}

export { addSupportToXRegExp as install };

export function isInstalled<T extends typeof XRegExp>(xr?: T)
{
	return _CACHE.has(xr ?? XRegExp);
}

export default addSupportToXRegExp;
