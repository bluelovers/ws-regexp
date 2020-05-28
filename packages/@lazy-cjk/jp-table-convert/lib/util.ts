import { IKEY_FROM_TO } from './types';
import { TABLE_SAFE, TABLE } from './table';

export function _getdata(char: string, from: IKEY_FROM_TO, to: IKEY_FROM_TO, safe?: boolean): string
{
	if (safe)
	{
		return (TABLE_SAFE[from][char]) ? TABLE_SAFE[from][char][to] : null;
	}

	return (TABLE[from][char]) ? TABLE[from][char][to] : null;
}
