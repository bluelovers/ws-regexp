/**
 * Created by user on 2019/7/26.
 */
import { IKEY_FROM_TO } from '@lazy-cjk/jp-table-convert/lib/types';
export interface IOptions {
    safe?: boolean;
    includeSelf?: boolean;
}
export declare function _fromA2B(char: string, from: IKEY_FROM_TO, to: IKEY_FROM_TO, options?: IOptions): string[];
export declare function jp2zht(char: string, options?: IOptions): string[];
export declare function jp2zhs(char: string, options?: IOptions): string[];
export declare function zht2jp(char: string, options?: IOptions): string[];
export declare function zhs2jp(char: string, options?: IOptions): string[];
export declare function zh2jp(char: string, options?: IOptions): string[];
export declare function jp2zh(char: string, options?: IOptions): string[];
export declare function lazyAll(char: string, options?: IOptions): string[];
declare const _default: typeof import("./index");
export default _default;
