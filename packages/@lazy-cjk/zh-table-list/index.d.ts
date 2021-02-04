/**
 * Created by user on 2018/6/10/010.
 */
import { IOptions } from './lib/types';
export * from './lib/types';
/**
 * 取出此漢字所對應的繁漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export declare const tw: (char: string, options?: IOptions) => string[];
/**
 * 取出此漢字所對應的簡漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export declare const cn: (char: string, options?: IOptions) => string[];
/**
 * 取出此漢字所對應的日漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
export declare const jp: (char: string, options?: IOptions) => string[];
/**
 * 自動取出此漢字所對應的簡繁日漢字
 *
 * @param {string} char
 * @param {IOptions} options
 * @returns {string[]}
 */
export declare function auto(char: string, options?: IOptions): string[];
declare const _default: typeof import("./index");
export default _default;
