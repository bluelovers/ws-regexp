import { IReturnTypeEachCore } from '../types';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export declare function _each<T extends RegExp>(input: string, re: T, options?: ICloneRegexpOptionsCustom<T>): Generator<IReturnTypeEachCore<T>, void, unknown>;
export default _each;
