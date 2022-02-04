// @ts-ignore
import _rewritePattern from 'regexpu-core';
import rewritePatternV4 from '../src/index';
import { inspect } from 'util';

(<Parameters<typeof rewritePatternV4>[]>[
	[
		'.',
	],
	[
		'.', '', {
		'dotAllFlag': true,
	},
	],
	[
		'.', 's', {
		'dotAllFlag': true,
	},
	],
	[
		'.', 'su', {
		'dotAllFlag': true,
	},
	],
	['[\\u{1D306}-\\u{1D308}a-z]', 'u'],
	['[\\u{1D306}-\\u{1D308}a-z]', 'ui'],
]).forEach(argv =>
{
	test(inspect(argv), () =>
	{

		let actual = rewritePatternV4(...argv);
		let expected = _rewritePattern(...argv);

		console.dir(actual);

		expect(actual).toStrictEqual(expected);

	});
});
