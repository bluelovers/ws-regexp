import { IFrom2To, IOptions } from './types';
/**
 * only 只將 日文漢字 => 轉為繁漢字
 * @type {IFrom2To}
 */
export declare const jp2zht: IFrom2To;
/**
 * only 只將 日文漢字 => 轉為簡漢字
 * @type {IFrom2To}
 */
export declare const jp2zhs: IFrom2To;
/**
 * only 簡漢字 => 轉為日漢字
 * @type {IFrom2To}
 */
export declare const zhs2jp: IFrom2To;
/**
 * only 只將 繁漢字 => 轉為日文漢字
 * @type {IFrom2To}
 */
export declare const zht2jp: IFrom2To;
/**
 * only 只將簡繁日 當中共通的 繁漢字 => 轉為簡漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
export declare const zht2zhs: IFrom2To;
/**
 * only 只將簡繁日 當中共通的 簡漢字 => 轉為繁漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
export declare const zhs2zht: IFrom2To;
/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias cjk2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export declare function zh2jp(str: any, options?: IOptions): string;
/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias zh2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export declare const cjk2jp: typeof zh2jp;
/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為繁體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export declare function cjk2zht(str: any, options?: IOptions): string;
/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為簡體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
export declare function cjk2zhs(str: any, options?: IOptions): string;
declare const _default: typeof import("./index");
export default _default;
