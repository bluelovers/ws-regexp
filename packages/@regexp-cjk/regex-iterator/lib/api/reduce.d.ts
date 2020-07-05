import { IChainArray } from '../types';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export interface IOptionsReduceChain<T extends RegExp = RegExp> extends ICloneRegexpOptionsCustom<T> {
    allowFallbackToSource?: boolean;
}
export declare function _reduceCore(input: string, chain: IChainArray, options?: IOptionsReduceChain): Generator<string, void, unknown>;
export declare function reduce(input: string, chain: IChainArray, options?: IOptionsReduceChain): string[];
export default reduce;
