//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { handleRomanizeOptionsAndTable, romanize } from '../lib/romanize';
import { EnumRomanizationConfigsKeys } from '../lib/types';

beforeAll(async () =>
{

});

let word = `不支援 𠮷𠬠𡬶𫗭𣛙𢎐 ...這類字🍔\t🍕\t🍖\t🍗\t🍘\t🍙\t🍚\t🍛[Pixiv] Judo ユフォリア (5026941)(呉マサヒロ)] 高飛車な生徒会長をアプリで従順調教 ☆﹐﹑veevee˚ㆍ ㅔㅣ ㅑㅣㅗ므ㅛㅕㅇㅁ ㅇㅜㅇ ㅏㅏ Whiskers ˶˃ᆺ˂˶`;

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	// @see https://github.com/bluelovers/ws-regexp/issues/2
	test(`ignoreUnSupported`, () =>
	{

		let actual = romanize(word, {
			ignoreUnSupported: true,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`configPreset`, () =>
	{
		expect(handleRomanizeOptionsAndTable()).toMatchSnapshot();

		expect(handleRomanizeOptionsAndTable(EnumRomanizationConfigsKeys.traditional_hepburn)).toMatchSnapshot();

		expect(handleRomanizeOptionsAndTable({
			configPreset: EnumRomanizationConfigsKeys.traditional_hepburn,
		})).toMatchSnapshot();
	});

})
