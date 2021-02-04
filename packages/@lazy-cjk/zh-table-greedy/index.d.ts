/**
 * Created by user on 2020/5/22.
 */
import { _greedyTableBuild } from './lib/core';
import { _greedyTableCacheTest, _greedyTableCacheMap, _greedyTableCacheRegexp } from './lib/table';
export { _greedyTableCacheTest, _greedyTableCacheMap, _greedyTableCacheRegexp };
export { _greedyTableBuild };
export declare function greedyTableTest(input: string): boolean;
export declare function greedyTableCharArray(char: string): readonly string[];
export declare function greedyTableReplace(input: string): string;
declare const _default: typeof import("./index");
export default _default;
