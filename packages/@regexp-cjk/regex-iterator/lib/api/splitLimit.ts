import _each from './_each';
import { ICloneRegexpOptionsCustom, ICloneRegexpOptions } from '@regexp-cjk/clone-regexp/lib/types';

function greedySplit(str: string, separator: string | RegExp, limit?: number)
{
	const result = str.split(separator, limit);
	if (result.length === limit)
	{
		let length = 0;
		if (typeof separator === 'string')
		{
			length = result.join(separator).length;
		}
		else
		{
			length = result.reduce((l, x, i) =>
			{
				let separatorLength = 0;
				if (i + 1 < limit)
				{
					separatorLength = str.slice(l).match(separator).shift().length;
				}
				return l + x.length + separatorLength;
			}, 0);
		}
		result[limit - 1] += str.slice(length);
	}
	return result;
}

function _pushNonEmpty(arr: string[], s: string, allowEmpty?: boolean)
{
	if (s !== '' || allowEmpty === true)
	{
		arr.push(s)
	}
}

export function splitLimit(input: string, separator: string | RegExp, limit?: number, options: ICloneRegexpOptionsCustom & {
	useFullMatched?: boolean,
	excludeRest?: boolean,
	allowEmpty?: boolean,
} = {}): string[]
{
	if (typeof separator === 'string')
	{
		return greedySplit(input, separator, limit)
	}

	let ret: string[] = []
	let lastIndex = 0;
	let lastString = '';

	(options as ICloneRegexpOptions).global = true;

	let { useFullMatched, allowEmpty } = options;
	useFullMatched = !!useFullMatched;
	allowEmpty = !!allowEmpty;

	for (let row of _each(input, separator, options))
	{
		let { match, re } = row;
		let s: string;

		s = input.slice(lastIndex, match.index)

		_pushNonEmpty(ret, lastString = s, allowEmpty);

		//console.log(lastIndex, re.lastIndex, match.index)

		lastIndex = re.lastIndex;

		if (match.length > 1)
		{
			lastIndex = re.lastIndex;

			if (useFullMatched === true)
			{
				s = match[0];

				_pushNonEmpty(ret, lastString = s, allowEmpty);
			}
			else
			{
				for (s of match.slice(1))
				{
					_pushNonEmpty(ret, lastString = s, allowEmpty);

					if (ret.length === limit)
					{
						break;
					}
				}
			}

		}

		if (ret.length === limit)
		{
			break;
		}
	}

	if (limit > 0)
	{
		if (!options.excludeRest)
		{
			ret[ret.length-1] += input.slice(lastIndex);
		}
	}
	else
	{
		_pushNonEmpty(ret, input.slice(lastIndex), allowEmpty);
	}

	return ret;
}

export default splitLimit
