/**
 * Created by user on 2018/5/7/007.
 */

import { matchRange, IOptions, getOptions, TABLE_RANGE, toRegExpString } from './src/core';

let _self1 = matchRange as typeof matchRange & {
	matchRange: typeof matchRange,
	getOptions: typeof getOptions,
	toRegExpString: typeof toRegExpString,
	TABLE_RANGE: typeof TABLE_RANGE,
};

let _self2 = _self1 as typeof _self1 & {
	default: typeof _self1,
};

_self2.matchRange = matchRange;
_self2.getOptions = getOptions;
_self2.toRegExpString = toRegExpString;
_self2.TABLE_RANGE = TABLE_RANGE;

_self2.default = _self2;

export = _self2;
