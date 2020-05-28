import { TABLE, TABLE_SAFE } from '../table';
import { _build_table } from '../core';
import { ZHJP_TABLE, ZHJP_TABLE_SAFE } from '@lazy-cjk/jp-table-comparison';

export function init(overwrite?: boolean)
{
	if (!overwrite)
	{
		return {
			TABLE,
			TABLE_SAFE,
		};
	}

	return _build_table(ZHJP_TABLE, ZHJP_TABLE_SAFE);
}
