import { IChainInput, IChainInputObject, IChainInputArray } from '../types';
import { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';
export declare function handleChainInputCore2(row: IChainInput | IChainInputArray, options?: ICloneRegexpOptions): [RegExp, string | ((substring: string, ...args: string[]) => string)];
export declare function handleChainInputCore(row: IChainInput, options?: ICloneRegexpOptions): Required<IChainInputObject>;
export declare function handleChainInput(row: IChainInput, options: ICloneRegexpOptions): Required<IChainInputObject>;
export default handleChainInput;
