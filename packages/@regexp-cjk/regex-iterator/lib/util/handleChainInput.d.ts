import { IChainInput } from '../types';
import { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';
export declare function handleChainInput(row: IChainInput, options: ICloneRegexpOptions): {
    regexp: RegExp;
    backref: string | number;
};
export default handleChainInput;
