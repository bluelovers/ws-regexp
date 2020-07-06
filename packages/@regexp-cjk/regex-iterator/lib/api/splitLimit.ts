import _each from './_each';
import { ICloneRegexpOptionsCustom, ICloneRegexpOptions } from '@regexp-cjk/clone-regexp/lib/types';
import { IReturnTypeEachCore } from '../types';
import { greedySplit } from '../util/split/greedySplit';

function _pushNonEmpty(arr: string[], s: string, allowEmpty?: boolean)
{
	if (s !== '' || allowEmpty === true)
	{
		arr.push(s)
	}
}

export interface ISplitLimitOptions extends ICloneRegexpOptionsCustom
{
	useFullMatched?: boolean,
	excludeRest?: boolean,
	excludeSubMatched?: boolean,
	allowEmpty?: boolean,
	limit?: number,
	limitMode?: 0 | 1
}

export function splitLimit(input: string, separator: string | RegExp, limit?: number | ISplitLimitOptions, options?: ISplitLimitOptions): string[]
{
	if (typeof limit === 'object' && limit !== null)
	{
		options = limit;
		limit = options?.limit
	}

	if (limit === 0 || limit < 0 || isNaN(limit as any))
	{
		limit = void 0;
	}

	if (typeof separator === 'string')
	{
		return greedySplit(input, separator, limit as number)
	}

	options = options ?? {};

	let ret: string[] = []
	let lastIndex = 0;
	let lastString = '';

	(options as ICloneRegexpOptions).global = true;

	let { useFullMatched, allowEmpty, excludeSubMatched, limitMode } = options;
	useFullMatched = !!useFullMatched;
	allowEmpty = !!allowEmpty;
	excludeSubMatched = !!excludeSubMatched;

	let size = 0;

	let row: IReturnTypeEachCore;

	for (row of _each(input, separator, options))
	{
		let { match, re } = row;
		let s: string;

		s = input.slice(lastIndex, match.index)

		_pushNonEmpty(ret, lastString = s, allowEmpty);

		//console.log(lastIndex, re.lastIndex, match.index)

		if (checkLimit())
		{
			lastIndex = match.index;
			break;
		}

		lastIndex = re.lastIndex;

		if (excludeSubMatched !== true && match.length > 1)
		{
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

					if (checkLimit())
					{
						break;
					}
				}
			}

		}

		size++;

		if (checkLimit())
		{
			break;
		}
	}

	if (limit > 0)
	{
		if (!options.excludeRest)
		{
			let s = input.slice(lastIndex);

			/*
			console.dir(row)
			console.dir(ret)

			console.dir({
				size,
				length: ret.length,
				limit,
			})
			 */

			if (ret.length < limit)
			{
				_pushNonEmpty(ret, s, allowEmpty)
			}
			else
			{
				ret[ret.length-1] += s;
			}
		}
	}
	else
	{
		_pushNonEmpty(ret, input.slice(lastIndex), allowEmpty);
	}

	function checkLimit()
	{
		if (limitMode === 1)
		{
			//console.log(limitMode, size === limit)
			return (size === limit);
		}
		else
		{
			//console.log(limitMode, ret.length === limit)
			return ret.length === limit
		}
	}

	return ret;
}

export default splitLimit
