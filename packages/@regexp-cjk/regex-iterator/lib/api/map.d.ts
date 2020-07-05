import { ICallback } from '../types';
import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export declare function map<R = RegExpMatchArray, T extends RegExp = RegExp>(input: string, re: T, cb?: never, options?: ICloneRegexpOptionsCustom<T>): R[];
export declare function map<R, T extends RegExp = RegExp>(input: string, re: T, cb: ICallback<R, T>, options?: ICloneRegexpOptionsCustom<T>): R[];
export default map;
