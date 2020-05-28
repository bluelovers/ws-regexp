import { array_unique } from 'array-hyper-unique';
import { SAFE_MODE_CHAR as _SAFE_MODE_CHAR } from '../const';

export const SAFE_MODE_CHAR_MIN = array_unique(_SAFE_MODE_CHAR
	.slice()
	.concat([
		//'忧',
		//'脏',
		'划',
		'准',
		'发',
		'処',
		//'处',
		'處',
		//'憂',
		//'優',
		'餵',
		'炮',
		'砲',
		'奸',
		'姦',
		'鱷',
		'滷',
		'鑑',
		'發',
	]))
;

export { SAFE_MODE_CHAR_MIN as SAFE_MODE_CHAR }
