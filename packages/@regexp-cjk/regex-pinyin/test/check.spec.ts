import { zhuyin2pinyin_01_table, IZhuyin2PinyinTable, zhuyin2pinyin_02_table } from '@lazy-cjk/cns-11643';
import isPinyinLike from '../index';

describe(`zhuyin2pinyin_01_table`, () =>
{

	_setupTest(zhuyin2pinyin_01_table())

})

describe(`zhuyin2pinyin_02_table`, () =>
{

	_setupTest(zhuyin2pinyin_02_table())

})

function _setupTest(table: IZhuyin2PinyinTable)
{
	Object.entries(table)
		.forEach(([zhuyin, row]) => {

			describe(zhuyin, () =>
			{

				Object.values(row)
					.forEach(pinyin => {

						test(pinyin, () =>
						{

							let actual = isPinyinLike(pinyin);

							expect(actual).toBeTruthy();

						});

					})

			})

		})
	;
}
