/**
 * Created by user on 2018/5/5/005.
 */
import { IOptions } from 'cjk-conv/lib/zh/table/index';
import zhTable = require('cjk-conv/lib/zh/table/index');
import { IOptions as IOptionsRegExp } from '..';
export declare function zhTableAutoGreedyTable(s: string, options?: IOptions): string[];
export declare function _word_zh_core(search: string, skip?: string, zhTableFn?: typeof zhTable.auto, options?: IOptionsRegExp): string;
export declare function _word_zh_core2(search: string, skip?: string, zhTableFn?: typeof zhTable.auto, options?: IOptionsRegExp): string;
declare const _default: typeof import("./conv");
export default _default;
