import { escape, unescape } from '../index';

const text = `
废@物裸体果体我无法克制自己对她的不满，于是出声说道
废物裸（河）体果（蟹）体我无法克制自己对她的不满，于是出声说道
廢（·）物裸￥體果 體我無法克制自己對她的不滿，於是出聲說道

废物裸（河）（蟹）体果(和谐)体我无法克制自己对她的不满，于是出声说道
废（·）物裸体果体我无法?克制自己对她的不满，于是出声说道
廢物裸體果體我無法克制自己對她的不滿，於是出聲說道
`;

test(`escape`, () =>
{

	let actual = escape(text);

	expect(actual).toMatchSnapshot();

});

test(`escape`, () =>
{

	let s = escape(text);
	let actual = unescape(s);

	expect(actual).toMatchSnapshot();

});
