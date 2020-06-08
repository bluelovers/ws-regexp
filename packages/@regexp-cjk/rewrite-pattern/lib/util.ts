/**
 * Created by user on 2020/6/8.
 */

import { defaults } from 'lodash';
import { IOptionsRewritePattern } from '../index';
import { rewriteFlags } from '../flags';

export function rewritePatternOptions(options?: IOptionsRewritePattern, flags?: string): IOptionsRewritePattern
{
	return defaults<IOptionsRewritePattern, IOptionsRewritePattern, IOptionsRewritePattern>({}, options, {
		dotAllFlag: true,
		lookbehind: true,
		namedGroup: true,
		useUnicodeFlag: flags?.includes?.('u'),
	})
}

export function handleOptions(options: IOptionsRewritePattern, flags?: string)
{
	flags = options?.flags ?? flags;

	if (options?.rewriteFlags)
	{
		flags = rewriteFlags(flags, options.rewriteFlags);
	}

	options = rewritePatternOptions(options, flags)

	return {
		options,
		flags,
	}
}
