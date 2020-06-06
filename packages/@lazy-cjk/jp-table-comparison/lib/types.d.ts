export declare type IKanjiComparisonTable = [string[], string[], string[]][];
export declare type IPLUS_TABLE = [string, string, string][];
/**
 * teachKanjiComparison.json
 */
export declare type ITeachKanjiComparison = ITeachKanjiComparisonRecord[];
export declare type ITeachKanjiComparisonRecord = [ITeachKanjiComparisonSub, ITeachKanjiComparisonSub, ITeachKanjiComparisonSub];
export declare type ITeachKanjiComparisonSub = [string, ...string[]];
/**
 * teachKanjiComparison.cache.json
 * teachKanjiComparison.cache2.json
 */
export interface ITeachKanjiComparisonCache {
    jp: ITeachKanjiComparisonCacheRecord;
    zht: ITeachKanjiComparisonCacheRecord;
    zhs: ITeachKanjiComparisonCacheRecord;
}
export interface ITeachKanjiComparisonCacheRecord extends Record<string, ITeachKanjiComparisonCacheSub> {
}
export interface ITeachKanjiComparisonCacheSub {
    jp: string;
    zht: string;
    zhs: string;
}
