/**
 * Created by user on 2020/6/8.
 */

import { rewriteFlags, IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
import { rewritePatternOptions, handleOptions } from './lib/util';
import { rewritePatternV4, IOptionsRegExpUCoreV4 } from '@regexp-cjk/regexpu-core-v4';

export interface IOptionsRewritePatternCore extends IOptionsRegExpUCoreV4
{

}

export interface IOptionsRewritePattern extends IOptionsRewritePatternCore
{
	flags?: string,

	rewriteFlags?: IOptionsRewriteFlags,
}

export function rewritePatternCore(source: string, flags?: string, options?: IOptionsRewritePatternCore): string
{
	return rewritePatternV4(source, flags, options)
}

export function rewritePattern(source: string, flags?: string, options?: IOptionsRewritePattern): string
{
	({ options, flags } = handleOptions(options, flags));

	return rewritePatternV4(source, flags, options)
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

	let source = rewritePatternV4(re.source, flags, options)

	return new RegExp(source, flags)
}

export function rewriteRegExp(re: RegExp, options?: IOptionsRewritePattern)
{
	let flags: string;

	({ options, flags } = handleOptions(options, re.flags));

	let source = rewritePatternV4(re.source, flags, options)

	return new RegExp(source, flags)
}

export default rewritePattern
