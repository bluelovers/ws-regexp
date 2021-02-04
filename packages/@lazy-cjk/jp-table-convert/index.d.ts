/**
 * Created by user on 2017/12/24/024.
 *
 * this module only do the char is exists in jp, zht, zhs
 * so don't use this module when u wanna fully zht <=> zhs
 *
 * 目前只支援 簡繁日漢字 並非全 cjk 漢字支援
 */
import { TABLE, TABLE_SAFE } from './lib/table';
export * from "./lib/types";
export * from "./lib/index";
import { ZHJP_TABLE, ZHJP_TABLE_SAFE } from "@lazy-cjk/jp-table-comparison";
import { IOptions } from './lib/types';
export { ZHJP_TABLE, ZHJP_TABLE_SAFE };
export { TABLE, TABLE_SAFE };
export declare const defaultOptions: IOptions;
declare const _default: typeof import("./index");
export default _default;
