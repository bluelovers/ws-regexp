export type IKanjiComparisonTable = [string[], string[], string[]][];
export type IPLUS_TABLE = [string, string, string][];
/**
 * teachKanjiComparison.json
 */
export type ITeachKanjiComparison = ITeachKanjiComparisonRecord[];
export type ITeachKanjiComparisonRecord = [ITeachKanjiComparisonSub, ITeachKanjiComparisonSub, ITeachKanjiComparisonSub];
export type ITeachKanjiComparisonSub = [string, ...string[]];
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
