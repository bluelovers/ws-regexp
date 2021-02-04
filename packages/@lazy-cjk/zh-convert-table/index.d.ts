/**
 * Created by user on 2020/5/22.
 */
import { ITable } from './lib/types';
export { ITable };
import { wiki_s2t, wiki_t2s, wiki_s2t_v2, wiki_t2s_v2 } from './wikipedia';
import { table_cn2tw, table_tw2cn } from './table';
export { wiki_s2t, wiki_t2s, wiki_s2t_v2, wiki_t2s_v2 };
export { table_cn2tw, table_tw2cn };
declare const _default: typeof import("./index");
export default _default;
