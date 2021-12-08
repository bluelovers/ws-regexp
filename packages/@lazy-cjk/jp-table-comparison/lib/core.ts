import { IPLUS_TABLE, ITeachKanjiComparison, IKanjiComparisonTable } from './types';
import { array_unique, array_unique_overwrite } from 'array-hyper-unique';
import { trimWithZeroWidth } from 'zero-width';

export function fixPlusTable<T extends string[][]>(table: T): T
{
	return table
		.map(row => {
			return row
				.map(s => {
					if (typeof s === 'string')
					{
						return trimWithZeroWidth(s)
					}
					return s
				})
		}) as T
	;
}

export function _jpTableCmparisonBuildPre(table: {
	TABLE?: IKanjiComparisonTable,
	PLUS_TABLE: IPLUS_TABLE,
	PLUS_TABLE_SAFE: IPLUS_TABLE,
	teachKanjiComparison: ITeachKanjiComparison,
}, options?: {
	skip?: string[],
	skip_00?: string[],
})
{
	const skip = options?.skip ?? [];
	const skip_00 = options?.skip_00 ?? [];

	let { TABLE = [] as IKanjiComparisonTable, PLUS_TABLE, PLUS_TABLE_SAFE } = table;

	PLUS_TABLE = fixPlusTable(PLUS_TABLE);
	PLUS_TABLE_SAFE = fixPlusTable(PLUS_TABLE_SAFE);

	PLUS_TABLE.forEach(function ([jp, zht, zhs])
	{
		addNew(TABLE, jp, zht, zhs);
	});

	TABLE = array_unique(TABLE.concat(table.teachKanjiComparison.filter(function (row)
	{
		if (skip_00.includes(row[0][0]))
		{
			return false;
		}

		return true;
	})));

	TABLE = TABLE.filter(function (v)
	{
		let [jp, zht, zhs] = v;

		if ((jp[0] == zht[0] && jp[0] == zhs[0]) || (skip.includes(jp[0]) || skip.includes(zht[0]) || skip.includes(zhs[0])))
		{
			return false;
		}

		return true;
	});

	const TABLE_SAFE: IKanjiComparisonTable = [];

	PLUS_TABLE_SAFE.forEach(function ([jp, zht, zhs])
	{
		addNew(TABLE, jp, zht, zhs);
		addNew(TABLE_SAFE, jp, zht, zhs);
	});

	return {
		TABLE,
		TABLE_SAFE,
		PLUS_TABLE,
		PLUS_TABLE_SAFE,
	}
}

export function _jpTableCmparisonBuild(table: {
	TABLE?: IKanjiComparisonTable,
	PLUS_TABLE: IPLUS_TABLE,
	PLUS_TABLE_SAFE: IPLUS_TABLE,
	teachKanjiComparison: ITeachKanjiComparison,
}, options?: {
	skip?: string[],
	skip_00?: string[],
})
{
	let {
		TABLE,
		TABLE_SAFE,
		PLUS_TABLE,
		PLUS_TABLE_SAFE,
	} = _jpTableCmparisonBuildPre(table, options)

	let cache = [];

	for (let i in TABLE)
	{
		if (cache.includes(i))
		{
			continue;
		}

		let [jp, zht, zhs] = TABLE[i];

		let _do = true;
		let j;

		for (j in TABLE)
		{
			if (j == i)
			{
				continue;
			}

			let [jp2, zht2, zhs2] = TABLE[j];

			if (zht.includes(zht2[0]))
			{
				_do = false;
				break;
			}

			if (zhs.includes(zhs2[0]))
			{
				_do = false;
				break;
			}
		}

		if (!_do)
		{
			cache.push(i);
			cache.push(j);

			//console.log(jp, zht, zhs);
		}
		else
		{
			TABLE_SAFE.push(TABLE[i]);
		}
	}

	array_unique_overwrite(TABLE);
	array_unique_overwrite(TABLE_SAFE);
	array_unique_overwrite(PLUS_TABLE);
	array_unique_overwrite(PLUS_TABLE_SAFE);

	return {
		TABLE,
		TABLE_SAFE,
		PLUS_TABLE,
		PLUS_TABLE_SAFE,
	}
}

export function addNew(table: IKanjiComparisonTable, jp, zht, zhs): IKanjiComparisonTable
{
	jp = Array.isArray(jp) ? jp : [jp];
	zht = Array.isArray(zht) ? zht : [zht];
	zhs = Array.isArray(zhs) ? zhs : [zhs];

	table.push([
		jp,
		zht,
		zhs,
	]);

	return table;
}
