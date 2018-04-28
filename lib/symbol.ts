/**
 * Created by user on 2018/4/28/028.
 */

import { createRegExp, ITypeCreateRegExp } from './index';

export const REGEXP_SYMBOL = {

	species: false,
	match: false,
	replace: false,
	search: false,
	split: false,

};

// @ts-ignore
export function testSymbol<T>(RegExpClass: ITypeCreateRegExp<T> = RegExp)
{
	let r = createRegExp('', '', RegExpClass);

	return Object.keys(REGEXP_SYMBOL)
		.reduce(function (a, key)
		{

			a[key] = (Symbol[key] && Symbol[key] in r);

			return a;
		}, {} as typeof REGEXP_SYMBOL)
		;
}

import * as self from './symbol';
export default self;

