import { IChainArray } from '../types';
import { ICloneRegexpOptionsCustom, ICloneRegexpOptions } from '@regexp-cjk/clone-regexp/lib/types';
import { handleChainInput } from '../util/handleChainInput';
import { _each } from './_each';
import { handleChainRowResult } from '../util/handleChainRowResult';

export interface IOptionsReduceChain<T extends RegExp = RegExp> extends ICloneRegexpOptionsCustom<T>
{
	allowFallbackToSource?: boolean,
}

export function* _reduceCore(input: string, chain: IChainArray, options: IOptionsReduceChain = {})
{
	let { allowFallbackToSource } = options;

	chain = chain.slice();

	const { regexp: re, backref } = handleChainInput(chain.shift(), options);

	const options2: ICloneRegexpOptions = {
		...options,
		global: false,
	};

	for (const m of _each(input, re, options))
	{
		let str = handleChainRowResult({

			regexp: re,
			backref,

			match: m.match,

			allowFallbackToSource,
		}, m.match[0])

		if (chain.length > 0)
		{
			for (const row of chain)
			{
				let { regexp, backref } = handleChainInput(row, options2)

				const match = str.match(regexp);

				str = handleChainRowResult({
					regexp,
					backref,

					match,

					allowFallbackToSource,
				}, str)
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
