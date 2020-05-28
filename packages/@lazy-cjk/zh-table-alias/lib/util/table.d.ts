/**
 * Created by user on 2020/5/29.
 */
import { ITSArrayListMaybeReadonly } from 'ts-type';
export declare function _mergeTable<T extends string, U extends string>(table_jp: Record<T, ITSArrayListMaybeReadonly<string>>, table_plus: Record<U, ITSArrayListMaybeReadonly<string>>): Record<U | T, string[]>;
