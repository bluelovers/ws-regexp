
export function handleChainRowResult({
	regexp,
	backref,
	match,
	allowFallbackToSource,
}: {
	regexp: RegExp,
	backref: number | string;
	match: RegExpMatchArray,
	allowFallbackToSource: boolean,
}, str: string)
{
	let value: string;

	if (match !== null && typeof match !== 'undefined')
	{
		if (backref)
		{
			const isNamedBackref = isNaN(backref as any);

			if (isNamedBackref)
			{
				if (!(backref in match.groups))
				{
					throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid named capture referenced '${backref}'`);
				}

				value = match.groups[backref];
			}
			else if (!(backref in match))
			{
				throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid index referenced ${backref}`);
			}
			else
			{
				value = match[backref]
			}
		}
		else
		{
			value = match[0]
		}
	}

	if (typeof value === 'undefined' && allowFallbackToSource)
	{
		value = str
	}

	return value;
}

export default handleChainRowResult
