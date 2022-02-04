// @ts-ignore
import _rewritePattern from 'regexpu-core';
import rewritePatternV5 from '../src/index';
import { inspect } from 'util';

(<Parameters<typeof rewritePatternV5>[]>[

	[
		'\\u{ab}', '', {
		unicodeFlag: 'transform',
	},
	],

	[
		'\\u{ab}', 'u', {
		unicodeFlag: 'transform',
	},
	],

	[
		'.', '', {
		dotAllFlag: 'transform',
	},
	],

	[
		'.', 's', {
		dotAllFlag: 'transform',
	},
	],

	[
		'.', 'su', {
		dotAllFlag: 'transform',
	},
	],

	[
		'\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
		unicodePropertyEscapes: 'transform',
	},
	],

	[
		'\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
		unicodeFlag: 'transform',
		unicodePropertyEscapes: 'transform',
	},
	],

	[
		'(?<name>.)\\k<name>', '', {
		namedGroups: "transform",
	},
	],

	[
		'First_Name: (?<firstname>\\w+), Last_Name: (?<lastname>\\w+)', '', {

	},
	],

	[
		'First_Name: (?<firstname>\\w+), Last_Name: (?<lastname>\\w+)', '', {
namedGroups: "transform",
	},
	],

	[
		'First_Name: (?<firstname>\\w+), Last_Name: (?<lastname>\\w+)\\k<firstname>', '', {
namedGroups: "transform",
	},
	],

	[
		'[\\p{Emoji}&&\\p{ASCII}]', 'u', {
		unicodeSetsFlag: 'transform',
	},
	],

	[
		'[^[a-h]&&[f-z]]', 'v', {
		unicodeSetsFlag: 'transform',
	},
	],

	[
		'[^[a-h]&&[f-z]]', 'v', {
		unicodeSetsFlag: 'transform',
		unicodeFlag: 'transform',
	},
	],

]).forEach(argv =>
{
	test(inspect(argv), () =>
	{

		let actual = rewritePatternV5(...argv);
		let expected = _rewritePattern(...argv);

		console.dir(actual);

		expect(actual).toStrictEqual(expected);

		expect({
			actual,
			changed: actual !== argv[0],
		}).toMatchSnapshot();

	});
});
