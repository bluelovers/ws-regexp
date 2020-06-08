import {
	rewritePattern,
	rewritePatternCore,
	IOptionsRewritePatternCore,
	IOptionsRewritePattern,
} from '@regexp-cjk/rewrite-pattern';
import { handleOptions } from './lib/util';

export function hasUnicodePropertyPattern(source: string)
{
	return /\\[pP]\{[A-Z][\w=_]*}/.test(source)
}

export function isUnicodePropertyPattern(source: string)
{
	return /^\\[pP]\{[A-Z][\w=_]*}$/.test(source)
}

export interface IUnicodePropertyRegExpExecArray extends RegExpExecArray
{
	/**
	 * \\p{UnicodePropertyName=UnicodePropertyValue}
	 */
	0: string,
	/**
	 * [pP]
	 */
	1: string,
	/**
	 * UnicodePropertyName
	 */
	2: string,
	/**
	 * UnicodePropertyValue
	 */
	3?: string,
}

export function matchUnicodePropertyPattern(source: string): IUnicodePropertyRegExpExecArray
{
	return /\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/.exec(source) as any
}

export function replaceUnicodePropertyPattern(source: string,
	cb: (substring: string, p: string | 'P' | 'p', name: string, value?: string, ...any: any[]) => string,
)
{
	return source.replace(/\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/g, cb as any)
}

export function escapeUnicodePropertyPatternCore(source: string, flags?: string, options?: IOptionsRewritePatternCore)
{
	return rewritePatternCore(source, flags ?? 'u', {
		...options,
		unicodePropertyEscape: true,
	})
}

export function escapeUnicodePropertyPattern(source: string, flags?: string, options?: IOptionsRewritePattern)
{
	({ flags, options } = handleOptions(options, flags));

	return rewritePatternCore(source, flags, options)
}

export default escapeUnicodePropertyPattern
