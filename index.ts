import * as cloneRegexp from 'clone-regexp';

function execAll(inputRegExp: RegExp, input: string)
{
	let match: RegExpExecArray & string[] & {

		index: number,
		//input: string,

		groups?: {
			[k: string]: string,
		},

	};
	let matches = [] as (typeof match & {
		match: string,
		sub: string[],

	})[] & {
		readonly re: RegExp,
		readonly input: string,
	};

	let re: RegExp = cloneRegexp(inputRegExp);
	let isGlobal = re.global;

	while (match = re.exec(input))
	{
		delete match.input;

		matches.push(Object.assign(match, {
			match: match[0],
			sub: match.slice(1),
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

let _execAll = execAll as typeof execAll & {
	execAll(inputRegExp: RegExp, input: string): ReturnType<typeof execAll>,
	default(inputRegExp: RegExp, input: string): ReturnType<typeof execAll>,
};

_execAll.default = _execAll.execAll = execAll;

export = _execAll;
