/**
 * Created by user on 2018/5/3/003.
 */

import support, { hasSupportFlag, FlagsName } from 'regexp-support';

const REGEXP_TO_STRING_TAG = support.objectStringTag as string;

export function isRegExp<T extends RegExp>(r: T): T & RegExp
export function isRegExp(r: RegExp): r is RegExp
export function isRegExp(r): RegExp | null
export function isRegExp(r)
{
	if ((r instanceof RegExp) || Object.prototype.toString.call(r) === REGEXP_TO_STRING_TAG)
	{
		return r;
	}

	return null;
}

export default isRegExp;
