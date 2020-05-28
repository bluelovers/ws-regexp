import { array_unique } from 'array-hyper-unique';
import { ITSArrayListMaybeReadonly } from 'ts-type';

export function _uniqueTable<T extends Record<string, ITSArrayListMaybeReadonly<string>>>(table_jp: T)
{
	Object.keys(table_jp)
		.forEach(function (key)
		{
			// @ts-ignore
			table_jp[key] = array_unique(table_jp[key]);
		})
	;

	return table_jp;
}

export function _buildTablePlus<T extends string, U extends string>(table_plus: Record<T, ITSArrayListMaybeReadonly<U>>): Record<U | T, string[]>
{
	Object.keys(table_plus)
		.forEach(function (key)
		{
			table_plus[key] = array_unique(table_plus[key]);

			table_plus[key].forEach(function (s)
			{
				table_plus[s] = table_plus[key];
			})
		})
	;

	// @ts-ignore
	return table_plus
}
