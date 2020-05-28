import { ITABLE_MAIN, ITABLE, KEY_JP, KEY_ZHT, KEY_ZHS, ITABLESUB, IKEY_FROM_TO } from './types';
import { IKanjiComparisonTable } from '@lazy-cjk/jp-table-comparison/lib/types';

export function _build_record(src: IKanjiComparisonTable): ITABLE_MAIN
{
	let to = {} as ITABLE_MAIN;
	to[KEY_JP] = {} as ITABLE;
	to[KEY_ZHT] = {} as ITABLE;
	to[KEY_ZHS] = {} as ITABLE;

	src.forEach(function (vrow)
	{
		let [jp, zht, zhs] = vrow;

		let k: IKEY_FROM_TO = KEY_JP;
		for (let c of jp)
		{
			if (!c || to[k][c])
			{
				continue;
			}

			to[k][c] = to[k][c] || {} as ITABLESUB;

			to[k][c][k] = c;
			to[k][c][KEY_ZHT] = zht[0];
			to[k][c][KEY_ZHS] = zhs[0];
		}

		k = KEY_ZHT;
		for (let c of zht)
		{
			if (!c || to[k][c])
			{
				continue;
			}

			to[k][c] = to[k][c] || {} as ITABLESUB;

			to[k][c][KEY_JP] = jp[0];
			to[k][c][k] = c;
			to[k][c][KEY_ZHS] = zhs[0];
		}

		k = KEY_ZHS;
		for (let c of zhs)
		{
			if (!c || to[k][c])
			{
				continue;
			}

			to[k][c] = to[k][c] || {} as ITABLESUB;

			to[k][c][KEY_JP] = jp[0];
			to[k][c][KEY_ZHT] = zht[0];
			to[k][c][k] = c;
		}
	});

	return to;
}

export function _build_table(ZHJP_TABLE: IKanjiComparisonTable, ZHJP_TABLE_SAFE: IKanjiComparisonTable)
{
	const TABLE = _build_record(ZHJP_TABLE);
	const TABLE_SAFE = _build_record(ZHJP_TABLE_SAFE);

	return {
		TABLE,
		TABLE_SAFE,
	}
}
