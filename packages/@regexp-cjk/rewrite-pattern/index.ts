/**
 * Created by user on 2020/6/8.
 */

import _rewritePattern from 'regexpu-core';
import { rewriteFlags, IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
import { rewritePatternOptions, handleOptions } from './lib/util';

/**
 * The optional options argument recognizes the following properties:
 */
export interface IOptionsRewritePatternCore
{
	/**
	 * Setting this option to true enables support for the s (dotAll) flag.
	 */
	dotAllFlag?: boolean,

	/**
	 * Setting this option to true enables support for Unicode property escapes:
	 */
	unicodePropertyEscape?: boolean,

	/**
	 * Setting this option to true enables support for lookbehind assertions.
	 */
	lookbehind?: boolean,

	/**
	 * Setting this option to true enables support for named capture groups.
	 */
	namedGroup?: boolean,

	/**
	 * This option is a function that gets called when a named capture group is found.
	 * It receives two parameters:
	 * the name of the group, and its index.
	 */
	onNamedGroup?(name: string, index: number): void

	/**
	 * Setting this option to true enables the use of Unicode code point escapes of the form \u{…}.
	 * Note that in regular expressions,
	 * such escape sequences only work correctly when the ES2015 u flag is set.
	 * Enabling this setting often results in more compact output,
	 * although there are cases (such as \p{Lu}) where it actually increases the output size.
	 */
	useUnicodeFlag?: boolean,
}

export interface IOptionsRewritePattern extends IOptionsRewritePatternCore
{
	flags?: string,

	rewriteFlags?: IOptionsRewriteFlags,
}

export function rewritePatternCore(source: string, flags?: string, options?: IOptionsRewritePatternCore): string
{
	return _rewritePattern(source, flags, options)
}

export function rewritePattern(source: string, flags?: string, options?: IOptionsRewritePattern): string
{
	({ options, flags } = handleOptions(options, flags));

	return _rewritePattern(source, flags, options)
}

export function rewritePatternByRegExpCore(re: RegExp, options?: IOptionsRewritePattern): string
{
	return rewritePattern(re.source, options?.flags ?? re.flags, options)
}

export function rewritePatternByRegExp(re: RegExp, options?: IOptionsRewritePattern): string
{
	return rewritePattern(re.source, options?.flags ?? re.flags, options)
}

export function rewriteRegExpCore(re: RegExp, options?: IOptionsRewritePattern)
{
	let flags = options?.flags ?? re.flags;

	let source = _rewritePattern(re.source, flags, options)

	return new RegExp(source, flags)
}

export function rewriteRegExp(re: RegExp, options?: IOptionsRewritePattern)
{
	let flags: string;

	({ options, flags } = handleOptions(options, re.flags));

	let source = _rewritePattern(re.source, flags, options)

	return new RegExp(source, flags)
}

export default rewritePattern
