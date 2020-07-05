import { IReturnTypeEachCore } from '../types';
import cloneRegexp from '@regexp-cjk/clone-regexp';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';

export function* _each<T extends RegExp>(input: string, re: T, options: ICloneRegexpOptionsCustom<T> = {})
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
