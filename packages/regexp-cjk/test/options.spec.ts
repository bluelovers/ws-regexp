import zhRegExp from '../index';
import { SymDefaults } from '../lib/core';

test(`defaultFlags`, () =>
{

	const flags = 'u';

	let ro = zhRegExp.use({
		flags,
	});

	let actual = new ro(/k/).flags;
	let expected = flags;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

	expect(new ro(/k/)).toMatchSnapshot();

});

test(`當 flags != '' 時 使用 flags`, () =>
{

	const flags = 'u';

	let ro = zhRegExp.use({
		flags,
	});

	let actual = new ro(/k/, 'g').flags;
	let expected = 'g';

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

	expect(new ro(/k/, 'g')).toMatchSnapshot();

});

test(`當 flags = '' 時 使用 defaultFlags`, () =>
{

	const flags = 'u';

	let ro = zhRegExp.use({
		flags,
	});

	let r = new ro(/k/, '');

	let actual = r.flags;
	let expected = flags;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

	expect(r).toMatchSnapshot();
	expect(r).toBeInstanceOf(zhRegExp);

});

test(`當使用於 zhRegExp.use 內時 自動將 flags 轉換為 defaultFlags`, () =>
{

	const flags = 'u';

	let ro = zhRegExp.use({
		flags,
	});

	let actual = ro[SymDefaults];
	let expected = flags;

	expect(actual.defaultFlags).toStrictEqual(expected);
	expect(actual.flags).toBeUndefined();

	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});
