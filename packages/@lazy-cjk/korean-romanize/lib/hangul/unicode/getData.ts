// Unicode data for category "Letter (other)"

// @ts-ignore
import lo from 'unicode/category/Lo';

function snakeToCamel(str)
{
	return str.replace(/([-_][a-z])/g, group =>
		group
			.toUpperCase()
			.replace("-", "")
			.replace("_", ""),
	);
}

function clean(data)
{
	return Object.entries(data)
		.map(([key, value]) => ({
			[snakeToCamel(key)]:
				typeof value === "string" && value.trim() === "" ? undefined : value,
		}))
		.reduce((acc, item) => Object.assign(acc, item), {});
}

export function getDataFor(codePoint)
{
	const data = lo[codePoint];

	return clean(data);
}

export default getDataFor
