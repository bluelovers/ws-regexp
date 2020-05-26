import { array_unique } from 'array-hyper-unique';
import { ITableVoiceValues, IArrayOrReadonly } from './types';

export function _buildTablePlus<T extends string, U extends string>(table_plus: Record<T, IArrayOrReadonly<U>>): Record<U | T, ITableVoiceValues>
{
	Object.keys(table_plus)
		.forEach(function (key)
		{
			table_plus[key] = Object.freeze(array_unique(table_plus[key]));

			table_plus[key].forEach(function (s)
			{
				table_plus[s] = table_plus[key];
			})
		})
	;

	// @ts-ignore
	return table_plus
}
