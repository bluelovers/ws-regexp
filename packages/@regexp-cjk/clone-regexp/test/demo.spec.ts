import cloneRegexp from '../index';
import { IRegExpWithClone } from '../lib/types';

test(`default`, () =>
{
	let old = /./i;

	let actual = cloneRegexp(old, {
		global: true,
		ignoreCase: false,
	});

	expect(actual).toHaveProperty('source', old.source);

	expect(actual).toHaveProperty('flags', 'g');

	expect(actual).toMatchSnapshot();

});

test(`custom cloneRegexp`, () =>
{
	let old = /./i;

	let actual = cloneRegexp(old, {
		global: true,
		ignoreCase: false,
		cloneRegexp(re, options)
		{
			return /kkk/
		},
	});

	expect(actual).toHaveProperty('source', 'kkk');

	expect(actual).toHaveProperty('flags', '');

	expect(actual).toMatchSnapshot();

});

test(`re.clone`, () =>
{
	let old: IRegExpWithClone = /./i;

	old.clone = () => {
		return /kkk/m
	};

	let actual = cloneRegexp(old, {
		global: true,
		ignoreCase: false,
	});

	expect(actual).toHaveProperty('source', 'kkk');

	expect(actual).toHaveProperty('flags', 'm');

	expect(actual).toMatchSnapshot();

});
