/**
 * Created by user on 2020/5/29.
 */

import tableCn2TwDebug from './data/table_cn2tw.debug';
import tableTw2CnDebug from './data/table_tw2cn.debug';
import table_cn2tw from './data/table_cn2tw';
import table_tw2cn from './data/table_tw2cn';

export * from './types';
export * from './table';
export * from './debug';

export default exports as typeof import('./index')
