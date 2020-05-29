import char_list from './char_list';
import { char2uni, char2hex, uni2char, hex2char } from '../lib/char2uni';
import { char2pinyin_02 } from '../lib/uni2pinyin_02';
import { char2pinyin_01 } from '../lib/uni2pinyin_01';

describe(`char2pinyin_01`, () =>
{

	char_list
		.forEach(char =>
		{

			test(char, () =>
			{

				let arr = char2pinyin_01(char);

				expect(arr).toBeInstanceOf(Array);
				expect(arr).toMatchSnapshot();

			});

		})
	;

})

describe(`char2pinyin_02`, () =>
{

	char_list
		.forEach(char =>
		{

			test(char, () =>
			{

				let arr = char2pinyin_02(char);

				expect(arr).toBeInstanceOf(Array);
				expect(arr).toMatchSnapshot();

			});

		})
	;

})
