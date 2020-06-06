export declare function resetCacheMap(): {
    cacheMap: Map<string, string>;
    _get(s: string): string;
};
export declare function getCacheMap(): Map<string, string>;
export declare function sortBySlugify(s1: string, s2: string): number;
export default sortBySlugify;
