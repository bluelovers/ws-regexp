/**
 * Created by user on 2018/4/24/024.
 */
import * as XRegExp from 'xregexp';
export declare type IOptions = {
    scope?: string;
    flags?: string;
};
export declare const _CACHE: Set<any>;
export declare const X_REGEX_DATA = "xregexp";
export declare function addSupportToXRegExp<T extends typeof XRegExp>(xr?: T, options?: IOptions): T & typeof XRegExp;
export declare function isXRegExp<T extends RegExp & {
    [X_REGEX_DATA];
}>(xr: T): boolean;
export declare function createXRegExp(pattern: string | RegExp | XRegExp, flags?: string, xr?: XRegExp): any;
export declare const install: typeof addSupportToXRegExp;
export declare function isInstalled<T extends typeof XRegExp>(xr?: T): boolean;
export default addSupportToXRegExp;
