import char_list from './char_list';
import { char2uni, uni2char, char2hex, hex2char } from '../lib/char2uni';

describe(`char / uni / hex`, () =>
{

	char_list
		.forEach(char =>
		{

			test(char, () =>
			{

				let uni = char2uni(char);
				let hex = char2hex(char);

				expect(uni2char(uni)).toStrictEqual(char);
				expect(hex2char(hex)).toStrictEqual(char);

			});

		})
	;

})
