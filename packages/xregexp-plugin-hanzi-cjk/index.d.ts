/**
 * Created by user on 2018/4/24/024.
 */
import XRegExp, { TokenOptions } from 'xregexp';
import createXRegExp from '@regexp-cjk/create-xregexp';
import { isXRegExp, X_REGEX_DATA } from '@regexp-cjk/is-xregexp';
export interface IOptions extends TokenOptions {
    flags?: TokenOptions["flag"];
}
export { createXRegExp };
export { isXRegExp, X_REGEX_DATA };
export declare function addSupportToXRegExp<T extends typeof XRegExp>(xr?: T, options?: IOptions): T;
export { addSupportToXRegExp as install };
export declare function isInstalled<T extends typeof XRegExp>(xr?: T): boolean;
export default addSupportToXRegExp;
