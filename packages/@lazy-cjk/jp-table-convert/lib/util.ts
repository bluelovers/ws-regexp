import { IKEY_FROM_TO } from './types';
import { TABLE_SAFE, TABLE } from './table';

export function _getdata(char: string, from: IKEY_FROM_TO, to: IKEY_FROM_TO, safe?: boolean): string
{
	return (safe ? TABLE_SAFE : TABLE)[from][char]?.[to];
}
