/**
 * Created by user on 2018/5/5/005.
 */
import { auto as zhTableAuto } from 'cjk-conv/lib/zh/table/index';
import { IOptions as IOptionsRegExp } from './core';
import { IOptions as IOptionsZhTable } from 'cjk-conv/lib/zh/table/index';
export declare function zhTableAutoGreedyTable(s: string, options?: IOptionsZhTable): string[];
export declare function _word_zh_core(search: string, skip?: string, zhTableFn?: typeof zhTableAuto, options?: IOptionsRegExp): string;
export declare function _word_zh_core2(search: string, skip?: string, zhTableFn?: typeof zhTableAuto, options?: IOptionsRegExp): string;
