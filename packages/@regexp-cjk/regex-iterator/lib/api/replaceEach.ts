import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
import { IChainArray, IChainInputObject, IChainInputArray } from '../types';
import { handleChainInputCore, handleChainInputCore2 } from '../util/handleChainInput';
import { ITSRequiredPick } from 'ts-type';

export function replaceEach(input: string,
	chain: (ITSRequiredPick<IChainInputObject, 'regexp' | 'replaceValue'> | IChainInputArray)[],
	options: ICloneRegexpOptionsCustom = {},
)
{
	for (let row of chain)
	{
		let [
			regexp,
			value,
		] = handleChainInputCore2(row, options);

		input = input.replace(regexp, value as any)
	}

	return input;
}

export default replaceEach
