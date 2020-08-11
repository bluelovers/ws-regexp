
import { table_jp_core as table_jp_core_raw } from './raw/raw';
import { table_jp_core } from '../lib/table/raw';

import { table_plus_core as table_plus_core_raw } from './raw/raw';
import { table_plus_core } from '../lib/table/raw';

describe(`table_jp_core.raw`, () =>
{

	Object.entries(table_jp_core_raw)
		// @ts-ignore
		.forEach(([k, v]: [string, any[]]) => {

			test(k, () =>
			{

				let actual = v.filter(r => r !== k);

				expect(actual.length).toBeGreaterThanOrEqual(1);

			});

		})
	;

})

describe(`table_jp_core`, () =>
{

	Object.entries(table_jp_core)
		// @ts-ignore
		.forEach(([k, v]: [string, any[]]) => {

			test(k, () =>
			{

				let actual = v.filter(r => r !== k);

				expect(actual.length).toBeGreaterThanOrEqual(1);

			});

		})
	;

})

describe(`table_plus_core.raw`, () =>
{

	Object.entries(table_plus_core_raw)
		// @ts-ignore
		.forEach(([k, v]: [string, any[]]) => {

			test(k, () =>
			{

				let actual = v.filter(r => r !== k);

				expect(actual.length).toBeGreaterThanOrEqual(1);

			});

		})
	;

})

describe(`table_plus_core`, () =>
{

	Object.entries(table_plus_core)
		// @ts-ignore
		.forEach(([k, v]: [string, any[]]) => {

			test(k, () =>
			{

				let actual = v.filter(r => r !== k);

				expect(actual.length).toBeGreaterThanOrEqual(1);

			});

		})
	;

})
