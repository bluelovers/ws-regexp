import { _re_cjk_conv } from 'regexp-helper/lib/cjk-conv';
import { array_unique } from 'array-hyper-unique';

export const defaultOptions = Object.freeze({
	safe: true,
});

export const REGEXP_TEST = _re_cjk_conv('ug');

export const SAFE_MODE_CHAR = array_unique([
	'后',
	'里',
	'餵',
	'志',
	'布',
	'佈',
	'系',
	'繫',
	'梁',
	'樑',
	'衝',
	'沖',
	'谷',
	'穀',
	'注',
	'克',
]);
