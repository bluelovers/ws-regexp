/**
 * Created by user on 2018/5/7/007.
 */

import { matchRange as _matchRange, IOptions, getOptions, TABLE_RANGE, toRegExpString, fillRange } from './src/core';

function matchRange(from, to, options: IOptions & {
	createRegExpString: true,
}): string
function matchRange(from, to, options?: IOptions): string[]
function matchRange(...argv): string[] | string
{
	// @ts-ignore
	return _matchRange(...argv)
}

matchRange.matchRange = matchRange;
matchRange.getOptions = getOptions;
matchRange.toRegExpString = toRegExpString;
matchRange.TABLE_RANGE = TABLE_RANGE;
matchRange.fillRange = fillRange;

matchRange.default = matchRange;

// @ts-ignore
export = matchRange;
