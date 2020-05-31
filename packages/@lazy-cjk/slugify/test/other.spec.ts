import slugify from '../index';

import emoji from 'emoji.json';

describe(`emoji`, () =>
{

	emoji
		.forEach(({ char, name }) =>
		{

			test(`${char} ${name}`, () =>
			{

				let actual = slugify(char, {
					emoji: true,
				});

				expect(actual).not.toStrictEqual(char);

			});

		})
	;

})
