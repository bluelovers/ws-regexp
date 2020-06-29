import { ITableJpKeys } from '../../lib/table';

export function getCachedKeys(data: {
	table_jp: Record<string, string[]>,
	table_plus: Record<string, string[]>,
})
{
	return {
		table_jp: Object.keys(data.table_jp),
		table_plus: Object.keys(data.table_plus),
	}
}
