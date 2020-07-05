import { IChainInput } from '../types';
import cloneRegexp, { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';

export function handleChainInput(row: IChainInput, options: ICloneRegexpOptions)
{
	let regexp: RegExp;
	let backref: number | string = 0;

	if (row instanceof RegExp)
	{
		regexp = row;
	}
	else
	{
		regexp = row.regexp;
		backref = row.backref;
	}

	regexp = cloneRegexp(regexp, options);

	return {
		regexp,
		backref,
	}
}

export default handleChainInput
