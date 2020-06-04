/**
 * Created by user on 2018/5/30/030.
 */

import { array_unique } from 'array-hyper-unique';
import { arrCjk } from '@lazy-cjk/zh-table-list/list';

/**
 * 會變成 **
 * @type {string[]}
 */
export const star = arrCjk([
	'下流',
	'下賤',
	'你媽',
	'卖比',
	'口射',
	'奴隶',
	'奴隷',
	'妹死',
	'娘比',
	'娼妇',
	'娼妓',
	'娼婦',
	//'尼玛',
	'尼馬',
	'废物',
	'強奸',
	'強姦',
	'强奸',
	'性奴',
	'我靠',
	'法克',
	'混蛋',
	'玛的',
	'畜生',
	'白痴',
	'笨蛋',
	'蠢货',
	'被操',
	'裸体',
	'賤人',
	'馬的',
	'麻痹',
	'麻痺',
	'傢伙',
	'家伙',
	'蠢蛋',
]);

star.sort();

/**
 * 被吞
 * @type {string[]}
 */
export const block = arrCjk([
	'尼玛',
]);

block.sort();

export const data = array_unique([
	...star,
	...block,
]);

data.sort();

export const sep = [
	'圌',
	'圝',
	'吅',
	'（和谐）',
	'（河蟹）',
];

export default exports as typeof import('./tieba');
