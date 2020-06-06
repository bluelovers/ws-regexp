/**
 * Created by user on 2020/5/29.
 */

import { IOptions } from './lib/types';
import { fixOptions } from './lib/min/util';
import tableTw2CnDebugSafe from '@lazy-cjk/static-build-zh-convert/data/table_tw2cn.debug.safe';
import { tw2cn, cn2tw } from './index';
import tableCn2TwDebugSafe from '@lazy-cjk/static-build-zh-convert/data/table_cn2tw.debug.safe';

export * from './lib/types';

/**
 * 以不造成歧異的字典表來取代
 */
export function tw2cn_min(text: string, options: IOptions = {}, ...argv)
{
	options = fixOptions(options, tableTw2CnDebugSafe);

	return tw2cn(text, options, ...argv);
}

/**
 * 以不造成歧異的字典表來取代
 */
export function cn2tw_min(text: string, options: IOptions = {}, ...argv)
{
	options = fixOptions(options, tableCn2TwDebugSafe);

	return cn2tw(text, options, ...argv);
}

export default {
	tw2cn_min,
	cn2tw_min,
}
