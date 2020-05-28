import { ITSArrayListMaybeReadonly } from 'ts-type';
export declare function _uniqueTable<T extends Record<string, ITSArrayListMaybeReadonly<string>>>(table_jp: T): T;
export declare function _buildTablePlus<T extends string, U extends string>(table_plus: Record<T, ITSArrayListMaybeReadonly<U>>): Record<U | T, string[]>;
