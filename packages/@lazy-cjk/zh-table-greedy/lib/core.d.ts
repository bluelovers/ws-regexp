/**
 * Created by user on 2020/5/22.
 */
export declare function _greedyTableBuild(data: [RegExp, string][] | readonly (readonly [RegExp, string])[]): {
    _greedyTableCacheRegexp: readonly (readonly [RegExp, string])[];
    _greedyTableCacheMap: Map<string, readonly string[]>;
    _greedyTableCacheTest: RegExp;
};
