import { IReturnTypeEachCore } from '../types';
import { ICloneRegexpOptions } from '@regexp-cjk/clone-regexp';
export declare function _each<T extends RegExp>(input: string, re: T, options?: ICloneRegexpOptions<T>): Generator<IReturnTypeEachCore<T>, void, unknown>;
export default _each;
