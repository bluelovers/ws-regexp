import { IReturnTypeEachCore} from '../types';
import { _each } from './_each';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';

export function each<T extends RegExp = RegExp>(input: string,
	re: T,
	cb: (match: RegExpMatchArray, index: number, re: T, _: IReturnTypeEachCore<T>) => void,
	options: ICloneRegexpOptionsCustom<T> = {},
)
{
	for (const m of _each(input, re, options))
	{
		cb(m.match, m.index, m.re, m)
	}
}

export default each
