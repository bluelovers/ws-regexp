/**
 * Created by user on 2018/5/7/007.
 */

import { listRawToRange } from '../util';

export const list_range_raw = [
	[
		[0x2160, 0x2160 + 12],
	],
	[
		[0x2170, 0x2170 + 12],
	],
];

export const list_range = listRawToRange(list_range_raw);

export default list_range;
