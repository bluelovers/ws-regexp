/// <reference lib="es2018.regexp" />
import _cloneRegexp = require('clone-regexp');

function execAll<T extends RegExp = RegExp>(inputRegExp: T | RegExp,
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

const _execAll = execAll;

import IExecAllOptions = execAll.IExecAllOptions;
import IMatches = execAll.IMatches;
import IExecAllRegExpExecArray = execAll.IExecAllRegExpExecArray;
import ICloneRegexp = execAll.ICloneRegexp;
import IMatchesRow = execAll.IMatchesRow;

namespace execAll
{
	export const SYMBOL = Symbol.for('execall');

	export function execall<T extends RegExp = RegExp>(inputRegExp: T | RegExp,
		input: string,
		options?: IExecAllOptions<T>,
	): IMatches<T>
	// @ts-ignore
	export function execall(...argv)
	{
		// @ts-ignore
		return _execAll(...argv)
	}

	export interface IExecAllOptions<T extends RegExp = RegExp>
	{
		resetLastIndex?: boolean,
		/**
		 * allow change cloneRegexp function
		 */
		cloneRegexp?: ICloneRegexp<T>,

		/**
		 * only use this when u know what u doing
		 */
		leftContext?: boolean,
		rightContext?: boolean,

		removeHiddenData?: boolean,
	}

	export interface ICloneRegexp<T extends RegExp = RegExp>
	{
		(inputRegExp: T | RegExp, ...argv): T
	}

	export interface IExecAllRegExpExecArray<T extends RegExp = RegExp> extends RegExpExecArray
	{

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

		[SYMBOL]: IMatches<T>
	}

	export interface IMatchesRow<T extends RegExp = RegExp> extends IExecAllRegExpExecArray<T>
	{
		match: string,
		sub: string[],

		leftContext?: string,
		rightContext?: string,
	}

	export type IMatches<T extends RegExp = RegExp> = IMatchesRow<T>[] & {
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
}

import SYMBOL = execAll.SYMBOL;

execAll.default = execAll;
// @ts-ignore
execAll.execall = execAll;

Object.defineProperty(execAll, "__esModule", { value: true });

export = execAll;
