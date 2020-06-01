/**
 * Created by user on 2018/5/5/005.
 */
import { auto as zhTableAuto } from '@lazy-cjk/zh-table-list';
import { IOptions as IOptionsRegExp } from './core';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
export declare function zhTableAutoGreedyTable(s: string, options?: IOptionsZhTable): string[];
export declare function _word_zh_core(search: string, skip?: string, zhTableFn?: typeof zhTableAuto, options?: IOptionsRegExp): string;
export declare function _word_zh_core2(search: string, skip?: string, zhTableFn?: typeof zhTableAuto, options?: IOptionsRegExp): string;
