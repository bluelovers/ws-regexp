/**
 * Created by user on 2018/9/1/001.
 */

import novelPatternSplit = require('../');

let tests = [
	`(女佣|女僕)`,
	`女佣|女僕`,
	`(?:女佣|女僕)`,
];

tests.forEach(function (input)
{
	let ret1 = novelPatternSplit(input);
	let ret2 = novelPatternSplit(input, {
		allowCapturingGroup: true,
	});

	console.dir({
		ret1,
		ret2,
	}, {
		depth: null,
		colors: true,
	});
});
