import { IChainInputObject } from '../types';
export interface IHandleChainRowResultOptions {
    allowFallbackToSource?: boolean;
}
export declare function handleChainRowResult({ regexp, backref, }: Required<IChainInputObject>, str: string, match: RegExpMatchArray, { allowFallbackToSource }: IHandleChainRowResultOptions): string;
export default handleChainRowResult;
