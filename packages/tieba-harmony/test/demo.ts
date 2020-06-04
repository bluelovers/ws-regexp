/**
 * Created by user on 2018/1/31/031.
 */

import { escape, getTable, unescape } from '../index';

let text: string;

text = `
废@物裸体果体我无法克制自己对她的不满，于是出声说道
废物裸（河）体果（蟹）体我无法克制自己对她的不满，于是出声说道
廢（·）物裸￥體果 體我無法克制自己對她的不滿，於是出聲說道

废物裸（河）（蟹）体果(和谐)体我无法克制自己对她的不满，于是出声说道
废（·）物裸体果体我无法?克制自己对她的不满，于是出声说道
廢物裸體果體我無法克制自己對她的不滿，於是出聲說道
`;

let s = escape(text);
let d = unescape(s);

console.log(s);
console.log(d);

if (0)
{
	let c = /([废廢])(?:@|（·?）|-|\/|\(\)|%|￥|_|\?|？|\||#|\$|[（\(](?:和谐|河蟹)[\)）]|（河）（蟹）|[（\(][河蟹]{1,2}[\)）]| |\.|[・。·])(物)/gi.exec(text);

	console.log(c);
}

console.log(getTable());
