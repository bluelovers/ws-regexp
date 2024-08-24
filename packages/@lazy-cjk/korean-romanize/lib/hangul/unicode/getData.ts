// Unicode data for category "Letter (other)"

// @ts-ignore
import lo from 'unicode/category/Lo';

function snakeToCamel(str: string)
{
	return str.replace(/([-_][a-z])/g, group =>
		group
			.toUpperCase()
			.replace("-", "")
			.replace("_", ""),
	);
}

function clean(data: Record<string, string>)
{
	return Object.entries(data)
		.map(([key, value]) => ({
			[snakeToCamel(key)]:
				typeof value === "string" && value.trim() === "" ? undefined : value,
		}))
		.reduce((acc, item) => Object.assign(acc, item), {} as Record<string, string>);
}

export function getUnicodeDataFor(codePoint: number)
{
	// @ts-ignore
	const data: Record<string, string> = lo[codePoint];

	return clean(data);
}

export default getUnicodeDataFor
