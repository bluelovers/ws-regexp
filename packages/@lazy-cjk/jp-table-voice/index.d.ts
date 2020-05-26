/**
 * Created by user on 2020/5/27.
 */
export * from './lib/core';
export * from './lib/util';
import { ITableVoiceKeys, table_voice } from './lib/table';
import { ITableVoiceValues } from './lib/types';
import { getVoiceAll } from './lib/util';
export { ITableVoiceKeys, table_voice };
export { ITableVoiceValues };
export declare const enum EnumTableVoice {
    /**
     * 清音
     */
    '01' = 0,
    /**
     * 濁音
     */
    '02' = 1,
    /**
     * 半濁音
     */
    '03' = 2
}
export default getVoiceAll;
