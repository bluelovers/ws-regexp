import { ITableVoiceValues, IArrayOrReadonly } from './types';
export declare function _buildTablePlus<T extends string, U extends string>(table_plus: Record<T, IArrayOrReadonly<U>>): Record<U | T, ITableVoiceValues>;
