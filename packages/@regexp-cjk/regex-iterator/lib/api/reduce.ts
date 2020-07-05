import { IChainArray } from '../types';
import { ICloneRegexpOptionsCustom, ICloneRegexpOptions } from '@regexp-cjk/clone-regexp/lib/types';
import { handleChainInput } from '../util/handleChainInput';
import { _each } from './_each';
import { handleChainRowResult, IHandleChainRowResultOptions } from '../util/handleChainRowResult';

export interface IOptionsReduceChain<T extends RegExp = RegExp> extends ICloneRegexpOptionsCustom<T>
{
	allowFallbackToSource?: boolean,
}

export function* _reduceCore(input: string, chain: IChainArray, options: IOptionsReduceChain = {})
{
	let { allowFallbackToSource } = options;

	chain = chain.slice();

	const _root = handleChainInput(chain.shift(), options);

	const options2: IOptionsReduceChain & ICloneRegexpOptions = {
		...options,
		global: false,
	};

	for (const m of _each(input, _root.regexp, options))
	{
		let str = handleChainRowResult(_root, m.match[0], m.match, options)

		if (chain.length > 0)
		{
			for (const row of chain)
			{
				let _sub = handleChainInput(row, options2)

				const match = str.match(_sub.regexp);

				str = handleChainRowResult(_sub, str, match, options2)
			}
		}

		yield str
	}
}

export function reduce(input: string, chain: IChainArray, options: IOptionsReduceChain = {})
{
	return [..._reduceCore(input, chain, options)]
}

export default reduce
