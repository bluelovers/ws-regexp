import * as _cloneRegexp from 'clone-regexp';

const S = Symbol.for('execall');

export interface IExecAllOptions<T extends RegExp = RegExp>
{
	resetLastIndex?: boolean,
	/**
	 * allow change cloneRegexp function
	 */
	cloneRegexp?: ICloneRegexp<T>,
}

export interface ICloneRegexp<T extends RegExp = RegExp>
{
	(inputRegExp: T | RegExp, ...argv): T
}

export type IExecAllRegExpExecArray<T extends RegExp = RegExp> = RegExpExecArray & string[] & {

	/**
	 * The 0-based index of the match in the string.
	 */
	index: number,
	//input: string,

	/**
	 * es2018
	 */
	groups?: {
		[k: string]: string,
	},

	//[S]: IMatches<T>
};

export type IMatches<T extends RegExp = RegExp> = (IExecAllRegExpExecArray<T> & {
	match: string,
	sub: string[],
})[] & {
	/**
	 * regular expressions
	 *
	 * @readonly
	 */
	readonly re: T,
	/**
	 * regular expressions that contains the string against which a regular expression is matched.
	 *
	 * @readonly
	 */
	readonly input: string,
	/**
	 * last matched index
	 *
	 * @readonly
	 */
	readonly lastIndex: number,
};

function execAll<T extends RegExp = RegExp>(inputRegExp: T | RegExp, input: string, options?: IExecAllOptions<T>): IMatches<T>
{
	let match: IExecAllRegExpExecArray<T>;

	options = options || {};

	const cloneRegexp: ICloneRegexp<T> = options.cloneRegexp || _cloneRegexp;

	let matches = [] as IMatches<T>;

	let re = cloneRegexp(inputRegExp);
	let isGlobal = re.global;

	if (options.resetLastIndex)
	{
		re.lastIndex = 0;
	}

	let lastIndex = 0;

	// @ts-ignore
	while (match = re.exec(input))
	{
		delete match.input;

		matches.push(Object.assign(match, {
			match: match[0],
			sub: match.slice(1),

			[S]: matches,
		}));

		lastIndex = re.lastIndex;

		if (!isGlobal)
		{
			break;
		}
	}

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

	return matches;
}

// @ts-ignore
let _execAll = execAll as typeof execAll & {
	execall<T extends RegExp = RegExp>(inputRegExp: T | RegExp, input: string, options?: IExecAllOptions): IMatches<T>,
	default<T extends RegExp = RegExp>(inputRegExp: T | RegExp, input: string, options?: IExecAllOptions): IMatches<T>,

	SYMBOL: typeof S,
};

export { S as SYMBOL }
export { _execAll as execall }
// @ts-ignore
export default _execAll

_execAll.SYMBOL = S;
// @ts-ignore
_execAll.default = _execAll.execall = execAll;

Object.defineProperty(_execAll, "__esModule", { value: true });

// @ts-ignore
export = _execAll;
