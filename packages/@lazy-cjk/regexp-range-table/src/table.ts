/**
 * Created by user on 2018/5/7/007.
 */

import { list_range as chinese, list_range2 as chinese2 } from './table/chinese';
import circle from './table/circle';

export const TABLE_RANGE = {
	chinese,
	chinese2,
	circle,
} as const;

export default TABLE_RANGE;
