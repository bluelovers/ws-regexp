import _m0 = require('../');

test(`import check`, () =>
{

	let actual = Object.keys(_m0);

	expect(actual).toMatchSnapshot();

});

test(`import default check`, () =>
{

	expect(_m0.default).toStrictEqual(_m0.getVoiceAll);

});

test(`EnumTableVoice`, () =>
{

	// @ts-ignore
	expect(_m0.EnumTableVoice).toMatchSnapshot();

});
