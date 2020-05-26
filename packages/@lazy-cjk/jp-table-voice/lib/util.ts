/**
 * Created by user on 2020/5/27.
 */
import { ITableVoiceKeys, table_voice } from './table';
import { ITableVoiceValues } from './types';
import { EnumTableVoice } from '../index';

export function _get(char: string | ITableVoiceKeys, idx: EnumTableVoice): string
{
	if (!char.length)
	{
		throw new TypeError(`char: '${char}', not valid`)
	}
	else if (idx !== EnumTableVoice['01'] && idx !== EnumTableVoice['02'] && idx !== EnumTableVoice['03'])
	{
		throw new TypeError(`char: '${char}', not valid`)
	}

	if (table_voice[char])
	{
		return table_voice[char][idx]
	}
}


/**
 * 清濁音
 * [清音, 濁音, 半濁音]
 */
export function getVoiceAll(char: string | ITableVoiceKeys): ITableVoiceValues
{
	return table_voice[char]
}

/**
 * 清音
 */
export function toVoice01(char: string | ITableVoiceKeys): string
{
	return _get(char, EnumTableVoice['01'])
}

/**
 * 濁音
 */
export function toVoice02(char: string | ITableVoiceKeys): string
{
	return _get(char, EnumTableVoice['02'])
}

/**
 * 半濁音
 */
export function toVoice03(char: string | ITableVoiceKeys): string
{
	return _get(char, EnumTableVoice['03'])
}
