import assert from "assert";
import { array_unique } from 'array-hyper-unique';

export function printArray<T>(arrayTable: T[], level?: number)
{
	assert(Array.isArray(arrayTable));

	let ls = [] as string[];

	let prepend = `\t`.repeat(level | 0)

	for (const v of arrayTable)
	{
		ls.push(`${prepend}\t${JSON.stringify(v)},`);
	}

	return ls;
}

export function printRecord<T extends Record<any, any>>(data: T, level?: number)
{
	let ls = [] as string[];

	let prepend = `\t`.repeat(level | 0)

	for (const k in data)
	{
		ls.push(`${prepend}\t${JSON.stringify(k)}: ${JSON.stringify(data[k])},`);
	}

	return ls;
}

export function printTypeKeys(data: any[])
{
	return array_unique(data)
		.map(v => `'${v}'`)
		.join(' | ')
}
