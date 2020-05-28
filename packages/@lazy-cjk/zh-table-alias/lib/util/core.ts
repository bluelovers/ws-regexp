import { ISimpleTable } from '../types';

export function _update(target: ISimpleTable, source: ISimpleTable): ISimpleTable
{
	target = Object.keys(source)
		.reduce(function (a, b)
		{
			a[source[b]] = b;

			return a;
		}, {})
	;

	return target;
}

export function _get(arr: string[], value: string | string[], ...values: Array<string | string[]>): string[]
{
	let ret: string[] = []
		.concat(value)
		.concat(...values)
		.filter(function (v)
		{
			return v;
		})
	;

	//ret.length && ret.sort();

	return ret;
}

