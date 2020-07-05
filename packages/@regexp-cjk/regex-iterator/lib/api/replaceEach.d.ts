import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
import { IChainInputObject, IChainInputArray } from '../types';
import { ITSRequiredPick } from 'ts-type';
export declare function replaceEach(input: string, chain: (ITSRequiredPick<IChainInputObject, 'regexp' | 'replaceValue'> | IChainInputArray)[], options?: ICloneRegexpOptionsCustom): string;
export default replaceEach;
