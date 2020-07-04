const X_REGEX_DATA = 'xregexp';

export { X_REGEX_DATA }

export type IXRegExpLike<R extends RegExp = RegExp> = R & {
	[X_REGEX_DATA]?: IXRegExpData
}

export interface IXRegExpData extends Record<any, any>
{
	captureNames?
	source: string,
	flags: string,
}

export function internalXRegExpData<T = IXRegExpLike>(xr: T)
{
	return xr[X_REGEX_DATA]
}

export function isXRegExp<T = IXRegExpLike>(xr: any): xr is T
{
	return !!(xr as IXRegExpLike)?.[X_REGEX_DATA];
}

export default isXRegExp
