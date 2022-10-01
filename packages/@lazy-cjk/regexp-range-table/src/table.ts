import { list_range as chinese, list_range2 as chinese2 } from './table/chinese';
import { list_range as circle } from './table/circle';
import { list_range as roman } from './table/roman';

export const TABLE_RANGE = {
	chinese,
	chinese2,
	circle,
} as const;

export const TABLE_RANGE_ALL = {
	chinese,
	chinese2,
	circle,
	roman,
} as const;

export default TABLE_RANGE;
