import { IPLUS_TABLE, ITeachKanjiComparison, IKanjiComparisonTable } from './types';
export declare function fixPlusTable<T extends string[][]>(table: T): T;
export declare function _jpTableCmparisonBuildPre(table: {
    TABLE?: IKanjiComparisonTable;
    PLUS_TABLE: IPLUS_TABLE;
    PLUS_TABLE_SAFE: IPLUS_TABLE;
    teachKanjiComparison: ITeachKanjiComparison;
}, options?: {
    skip?: string[];
    skip_00?: string[];
}): {
    TABLE: IKanjiComparisonTable;
    TABLE_SAFE: IKanjiComparisonTable;
    PLUS_TABLE: IPLUS_TABLE;
    PLUS_TABLE_SAFE: IPLUS_TABLE;
};
export declare function _jpTableCmparisonBuild(table: {
    TABLE?: IKanjiComparisonTable;
    PLUS_TABLE: IPLUS_TABLE;
    PLUS_TABLE_SAFE: IPLUS_TABLE;
    teachKanjiComparison: ITeachKanjiComparison;
}, options?: {
    skip?: string[];
    skip_00?: string[];
}): {
    TABLE: IKanjiComparisonTable;
    TABLE_SAFE: IKanjiComparisonTable;
    PLUS_TABLE: IPLUS_TABLE;
    PLUS_TABLE_SAFE: IPLUS_TABLE;
};
export declare function addNew(table: IKanjiComparisonTable, jp: any, zht: any, zhs: any): IKanjiComparisonTable;
