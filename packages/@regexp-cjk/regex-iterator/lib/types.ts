/// <reference lib="es2018.regexp" />

declare global
{
	interface RegExpConstructor
	{
		leftContext: string,
		rightContext: string,
	}
}

export interface IReturnTypeEachCore<T extends RegExp = RegExp>
{
	match: RegExpMatchArray;
	re: T;
	index: number;
	data: Pick<typeof RegExp, 'leftContext' | 'rightContext'>;
}

export type ICallback<R = void, T extends RegExp = RegExp> = (match: RegExpMatchArray, index: number, re: T, _: IReturnTypeEachCore<T>) => R

export interface IChainArrayElement
{
	/**
	 * The `RegExp` to use.
	 */
	regexp: RegExp;
	/**
	 * The specific backreference.
	 */
	backref?: number | string;
}

export type IChainInput = IChainArrayElement | RegExp;

export type IChainArray = IChainInput[];
