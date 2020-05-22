import { ITable } from './types';

export function removeSame(table: ITable)
{
	return Object.entries(table)
		.reduce(function (a, b)
		{
			let [k, v] = b;

			if (k != v)
			{
				a[k] = v;
			}

			return a;
		}, {} as ITable)
		;
}
