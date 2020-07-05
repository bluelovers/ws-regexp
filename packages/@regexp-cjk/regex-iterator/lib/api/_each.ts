import { IReturnTypeEachCore } from '../types';
import cloneRegexp, { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';

export function* _each<T extends RegExp>(input: string, re: T, options: ICloneRegexpOptions<T> = {})
{
	let match: RegExpMatchArray;

	// @ts-ignore
	re = cloneRegexp(re, options);

	const isGlobal = re.global;
	let index = -1;

	while ((match = re.exec(input)) !== null)
	{
		index++;

		let {
			leftContext,
			rightContext,
		} = RegExp

		yield {
			match,
			re,
			index,
			data: {
				leftContext,
				rightContext,
			},
		} as IReturnTypeEachCore<T>

		if (isGlobal !== true)
		{
			break;
		}
	}
}

export default _each
