import { ITABLE_MAIN } from './types';
import { IKanjiComparisonTable } from '@lazy-cjk/jp-table-comparison/lib/types';
export declare function _build_record(src: IKanjiComparisonTable): ITABLE_MAIN;
export declare function _build_table(ZHJP_TABLE: IKanjiComparisonTable, ZHJP_TABLE_SAFE: IKanjiComparisonTable): {
    TABLE: ITABLE_MAIN;
    TABLE_SAFE: ITABLE_MAIN;
};
