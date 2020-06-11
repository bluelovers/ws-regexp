import emoji from 'emoji.json';
import { mapEmoji } from '../lib/table';
import { reEmoji } from '../lib/re';

describe(`emoji`, () =>
{
	emoji
		.forEach(({
			name,
			char,
		}) =>
		{

			test(name, () =>
			{

				let actual = mapEmoji.get(char);
				let expected = name

				expect(actual).toStrictEqual(expected);

				expect(char).toMatch(reEmoji);

				let m = reEmoji.exec(char);

				expect(char).toMatch(m[0]);

				//expect(actual).toBeInstanceOf(Date);
				//expect(actual).toMatchSnapshot();

			});

		})
	;

})
