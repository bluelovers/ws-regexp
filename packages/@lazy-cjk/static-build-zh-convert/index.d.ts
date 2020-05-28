/**
 * Created by user on 2020/5/29.
 */
import tableCn2TwDebug from './data/table_cn2tw.debug';
import tableTw2CnDebug from './data/table_tw2cn.debug';
import table_cn2tw from './data/table_cn2tw';
import table_tw2cn from './data/table_tw2cn';
export * from './types';
import { IStaticDebugJSON, ITable } from './types';
export { tableCn2TwDebug, tableTw2CnDebug, table_cn2tw, table_tw2cn, };
declare const _default: {
    tableCn2TwDebug: IStaticDebugJSON;
    tableTw2CnDebug: IStaticDebugJSON;
    table_cn2tw: ITable;
    table_tw2cn: ITable;
};
export default _default;
