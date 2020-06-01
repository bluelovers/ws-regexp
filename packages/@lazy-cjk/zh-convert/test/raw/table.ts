import { ITable } from '../../lib/types';
import { table_cn2tw as _table_cn2tw, table_tw2cn as _table_tw2cn } from '@lazy-cjk/zh-convert-table/table';
import { table_cn2tw_plus, table_tw2cn_plus } from '@lazy-cjk/zh-convert-table/table_plus';

export let table_cn2tw: ITable = Object.assign({}, _table_cn2tw, table_cn2tw_plus);

export let table_tw2cn: ITable = Object.assign({}, _table_tw2cn, table_tw2cn_plus);
