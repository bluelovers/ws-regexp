import { IXRegExpLike } from '@regexp-cjk/is-xregexp';
import XRegExp from 'xregexp';
export declare function createXRegExp<T = IXRegExpLike>(pattern: string | RegExp | IXRegExpLike, flags?: string, xr?: typeof XRegExp): T;
export default createXRegExp;
