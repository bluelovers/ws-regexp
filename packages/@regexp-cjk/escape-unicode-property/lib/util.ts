import { IOptionsRewritePattern } from '@regexp-cjk/rewrite-pattern';
import { handleOptions as _handleOptions } from '@regexp-cjk/rewrite-pattern/lib/util';
import { merge } from 'lodash';

export function handleOptions(options: IOptionsRewritePattern, flags?: string)
{
	return _handleOptions(merge({}, options, {
		unicodePropertyEscape: true,
		rewriteFlags: {
			unicode: true,
		},
	}), flags ?? 'u');
}
