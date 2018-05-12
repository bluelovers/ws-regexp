import * as cloneRegexp from 'clone-regexp';

const S = Symbol.for('execall');

function execAll(inputRegExp: RegExp, input: string)
{
	let match: RegExpExecArray & string[] & {

		index: number,
		//input: string,

		groups?: {
			[k: string]: string,
		},

	};

	type IMatches = (typeof match & {
		match: string,
		sub: string[],

	})[] & {
		readonly re: RegExp,
		readonly input: string,
	};

	let matches = [] as IMatches;

	let re: RegExp = cloneRegexp(inputRegExp);
	let isGlobal = re.global;

	while (match = re.exec(input))
	{
		delete match.input;

		matches.push(Object.assign(match, {
			match: match[0],
			sub: match.slice(1),

			[S]: matches,
		}));

		if (!isGlobal)
		{
			break;
		}
	}

	Object.defineProperties(matches, {
		re: {
			value: re,
			enumerable: false,
			configurable: true,
		},

		input: {
			value: input,
			enumerable: false,
			configurable: true,
		},
	});

	return matches;
}

// @ts-ignore
let _execAll = execAll as typeof execAll & {
	execall(inputRegExp: RegExp, input: string): ReturnType<typeof execAll>,
	default(inputRegExp: RegExp, input: string): ReturnType<typeof execAll>,

	SYMBOL: symbol,
};

_execAll.SYMBOL = S;
_execAll.default = _execAll.execall = execAll;

export = _execAll;
