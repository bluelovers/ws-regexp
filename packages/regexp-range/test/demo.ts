/**
 * Created by user on 2018/5/7/007.
 */

import matchRange, { TABLE_RANGE } from '..';
//import matchRange, { TABLE_RANGE } from 'regexp-range';

console.dir(TABLE_RANGE);

//console.log(matchRange);

console.dir(matchRange('⓪', '㊿'));
console.dir(matchRange('一', '十'));
console.dir(matchRange('零', '拾'));

console.dir(matchRange('二', '七', {
	createRegExpString: true,
}));
console.dir(matchRange('二', '七', {
	createRegExpString: true,
	createRegExpClass: true,
}));

console.dir(matchRange('壹', '什', {
	createRegExpString: true,
}));

console.dir(matchRange('壹', '什', {
	createRegExpString: true,
	findFirstOne: true,
}));

console.dir(matchRange('三', '五', {
	createRegExpString: true,
}));
