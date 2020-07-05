import { IChainInput, IChainInputObject, IChainInputArray } from '../types';
import cloneRegexp, { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';

export function handleChainInputCore2(row: IChainInput | IChainInputArray, options?: ICloneRegexpOptions): [RegExp, string | ((substring: string, ...args: string[]) => string)]
{
	let regexp: RegExp;
	let replaceValue: string | ((substring: string, ...args: string[]) => string);

	if (row instanceof RegExp)
	{
		regexp = row;
	}
	else if (Array.isArray(row))
	{
		([
			regexp,
			replaceValue,
		] = row);
	}
	else
	{
		({
			regexp,
			replaceValue,
		} = row);
	}

	return [regexp, replaceValue]
}


export function handleChainInputCore(row: IChainInput, options?: ICloneRegexpOptions): Required<IChainInputObject>
{
	let regexp: RegExp;
	let backref: number | string = 0;
	let replaceValue: string | ((substring: string, ...args: string[]) => string);

	if (row instanceof RegExp)
	{
		regexp = row;
	}
	else
	{
		({
			regexp,
			backref,
			replaceValue,
		} = row);
	}

	return {
		regexp,
		backref,
		replaceValue,
	}
}

export function handleChainInput(row: IChainInput, options: ICloneRegexpOptions)
{
	let ret = handleChainInputCore(row, options)

	ret.regexp = cloneRegexp(ret.regexp, options);

	return ret
}

export default handleChainInput
