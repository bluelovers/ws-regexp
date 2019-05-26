/**
 * Created by user on 2018/5/5/005.
 */

import { array_unique } from 'array-hyper-unique';
import { _re_cjk_conv as _re_cjk_conv2 } from 'regexp-helper/lib/cjk-conv';

export { array_unique }

/**
 * for regexp-cjk only
 */
export function _re_cjk_conv(flags?: string)
{
	return _re_cjk_conv2(flags, 'のと');
}
