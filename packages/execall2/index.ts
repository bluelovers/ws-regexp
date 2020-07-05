/// <reference lib="es2018.regexp" />
import _cloneRegexp, { ICloneRegexp } from '@regexp-cjk/clone-regexp';

export * from './lib/types';

import { IExecAllOptions, IMatches, IMatchesRow, SYMBOL } from './lib/types';

export function execall<T extends RegExp = RegExp>(inputRegExp: T | RegExp,
	input: string,
	options?: IExecAllOptions<T>,
): IMatches<T>
{
	let match: IMatchesRow<T>;
	options = options || {};

	const { resetLastIndex = true, cloneRegexp, removeHiddenData } = options;

	const matches = [] as IMatches<T>;

	const re: T = _cloneRegexp<T>(inputRegExp as any, {
		// @ts-ignore
		cloneRegexp,
	});
	const isGlobal = re.global;

	if (resetLastIndex)
	{
		re.lastIndex = 0;
	}

	let lastIndex = re.lastIndex;

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

export { execall as execAll }

export default execall;

