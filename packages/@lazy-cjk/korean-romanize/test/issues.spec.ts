//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import romanize from '../lib/romanize';
import { EnumOptionsRomanizeMethod } from '../lib/types';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test.each([
		// https://github.com/bluelovers/ws-regexp/issues/1
		'ㄱㄱㅎ'
	])('%s', (input) => {
		let actual = romanize(input);

		expect(actual).toMatchSnapshot();

		actual = romanize(input, {
			method: EnumOptionsRomanizeMethod.RRT,
		});

		expect(actual).toMatchSnapshot();
	});

})
