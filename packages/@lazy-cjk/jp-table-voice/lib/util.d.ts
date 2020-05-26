/**
 * Created by user on 2020/5/27.
 */
import { ITableVoiceKeys } from './table';
import { ITableVoiceValues } from './types';
import { EnumTableVoice } from '../index';
export declare function _get(char: string | ITableVoiceKeys, idx: EnumTableVoice): string;
/**
 * 清濁音
 * [清音, 濁音, 半濁音]
 */
export declare function getVoiceAll(char: string | ITableVoiceKeys): ITableVoiceValues;
/**
 * 清音
 */
export declare function toVoice01(char: string | ITableVoiceKeys): string;
/**
 * 濁音
 */
export declare function toVoice02(char: string | ITableVoiceKeys): string;
/**
 * 半濁音
 */
export declare function toVoice03(char: string | ITableVoiceKeys): string;
