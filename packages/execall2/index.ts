/// <reference lib="es2018.regexp" />
import _cloneRegexp from 'clone-regexp';

export * from './lib/types';

import { IExecAllOptions, IMatches, IMatchesRow, ICloneRegexp, SYMBOL } from './lib/types';

export function execAll<T extends RegExp = RegExp>(inputRegExp: T | RegExp,
	input: string,
	options?: IExecAllOptions<T>,
): IMatches<T>
{
	let match: IMatchesRow<T>;
	options = options || {};

	const { resetLastIndex = true, cloneRegexp = _cloneRegexp as ICloneRegexp<T>, removeHiddenData } = options;

	const matches = [] as IMatches<T>;

	const re = (cloneRegexp as ICloneRegexp<T>)(inputRegExp);
	const isGlobal = re.global;

	if (resetLastIndex)
	{
		re.lastIndex = 0;
	}

	let lastIndex = 0;

	let { rightContext, leftContext } = options;

	rightContext = !!rightContext;
	leftContext = !!leftContext;

	while (match = re.exec(input) as IMatchesRow<T>)
	{
		delete match.input;

		matches.push(Object.assign(match, <Partial<IMatchesRow<T>>>{
			match: match[0],
			sub: match.slice(1),

			// @ts-ignore
			leftContext: leftContext && RegExp.leftContext,
			// @ts-ignore
			rightContext: rightContext && RegExp.rightContext,

			[SYMBOL]: removeHiddenData ? null : matches,
		}));

		lastIndex = re.lastIndex;

		if (!isGlobal)
		{
			break;
		}
	}

	if (!removeHiddenData)
	{
		Object.defineProperties(matches, {
			re: {
				value: re,
				enumerable: false,
				configurable: false,
				writable: false,
			},

			input: {
				value: input,
				enumerable: false,
				configurable: false,
				writable: false,
			},

			lastIndex: {
				value: lastIndex,
				enumerable: false,
				configurable: false,
				writable: false,
			},
		});
	}

	return matches;
}

export default execAll;
