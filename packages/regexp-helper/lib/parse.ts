/**
 * Created by user on 2018/5/3/003.
 */

import support, { hasSupportFlag, FlagsName } from 'regexp-support';

export type IOptions = {
	allowNonNativeSlash?: boolean,
	allowNonNativeFlags?: boolean,
	throwError?: boolean,
}

export function parseRegularExpressionString(str: string, options: {
	allowNonNativeSlash?: boolean,
	allowNonNativeFlags?: boolean,
	throwError?: boolean,
} = {})
{
	let m = rRegularExpressionString(options).exec(str);
	if (m)
	{
		let [s, d, r, f] = m;

		return {
			source: typeof r !== 'undefined' ? r : '',
			flags: typeof f !== 'undefined' ? f : '',
			slash: d,
			input: str,
		};
	}
	else if (options.throwError)
	{
		throw new TypeError(`${str} not a regex like string`);
	}

	return null;
}

export function rRegularExpressionString(options: {
	allowNonNativeSlash?: boolean,
	allowNonNativeFlags?: boolean,
} = {})
{
	return new RegExp(`^(${options.allowNonNativeSlash ? '[\\/#$%]' : '\\/'})(..*)\\1([${options.allowNonNativeFlags ? 'a-zA-Z' : support.nativeFlags}]*)$`);
}

export default parseRegularExpressionString;
