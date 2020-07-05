import { IChainInputObject } from '../types';

export interface IHandleChainRowResultOptions
{
	allowFallbackToSource?: boolean,
}

export function handleChainRowResult({
	regexp,
	backref,
}: Required<IChainInputObject>, str: string, match: RegExpMatchArray, {
	allowFallbackToSource
} : IHandleChainRowResultOptions)
{
	let ret: string;

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

				ret = match.groups[backref];
			}
			else if (!(backref in match))
			{
				throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid index referenced ${backref}`);
			}
			else
			{
				ret = match[backref]
			}
		}
		else
		{
			ret = match[0]
		}
	}

	if (typeof ret === 'undefined' && allowFallbackToSource)
	{
		ret = str
	}

	return ret;
}

export default handleChainRowResult
