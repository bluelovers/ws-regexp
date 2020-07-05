import { IReturnTypeEachCore } from '../types';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export declare function each<T extends RegExp = RegExp>(input: string, re: T, cb: (match: RegExpMatchArray, index: number, re: T, _: IReturnTypeEachCore<T>) => void, options?: ICloneRegexpOptionsCustom<T>): void;
export default each;
