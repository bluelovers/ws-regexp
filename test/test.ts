import { _word_zh_core } from '../lib/conv';
import ParserEventEmitter, { ParserEventEmitterEvent } from '../lib/event';
import cjkConv from 'cjk-conv';
import { local_range } from '../lib/local';

import * as util from 'util';

util.inspect.defaultOptions.colors = true;

let ev: ParserEventEmitter;

//ev = ParserEventEmitter.create('(?<=1)(?<!2)(?:3)(?=4)(?!5)u{1,2}u{1,}ix?y*d+.+[4-56]𠬠.\\b\b\\n\n\\r\r\u0001-\\u0002[\\n𠬠\\u0001-\\u0002](?:[5])', 'u');

//ev = ParserEventEmitter.create('(?<!魯)👧[^2👧👧👧🏻1]👧🏼🏽👧🏾👧🏿(?<=魯)(魔[象象象]|哥雷姆|哥雷魯|GOLEM|哥雷鲁|(?:[一-十]))(?=777)(?!666)', 'u');

ev = ParserEventEmitter.create('\\p{InAdlam}', 'u');

//ev = ParserEventEmitter.create('x+?y*?z?', 'u');

ev.on(ParserEventEmitterEvent.default, function (ast)
{
	//console.log(ast.start, ast.raw, ast);

//	return;

	//console.log(ParserEventEmitterEvent.default);

	ast.old_raw = ast.old_raw || ast.raw;
	ast.raw = _word_zh_core(ast.raw);

	//console.log(ast.raw);

	ev.emit(ParserEventEmitterEvent.change, ast);

});

ev.on(ParserEventEmitterEvent.class, function (ast, ...argv)
{
	//console.log(ast.start, ast.elements, 555, ...argv, 666);
});

ev.on(ParserEventEmitterEvent.class_range, function (ast, ...argv)
{
	//return;

//	console.log(ParserEventEmitterEvent.class_range);
//	console.dir(ast, {
//		colors: true,
//	});

	let s = ast.min.raw;
	let e = ast.max.raw;

	let t: string;

	for (let r of local_range)
	{
		let i = r.indexOf(s);
		let j = r.indexOf(e, i);

		if (i !== -1 && j !== -1)
		{
			//t = r.slice(i, j + 1).join('');

			ast.old_raw = ast.old_raw || ast.raw;
			ast.raw = r.slice(i, j + 1).join('');

			ev.emit(ParserEventEmitterEvent.change, ast);

//			console.log(ast);

			break;
		}
	}

});

ev.on(ParserEventEmitterEvent.class_uniset, function (ast)
{
	console.dir(ast);
});

ev.on(ParserEventEmitterEvent.uniset, function (ast)
{
	console.dir(ast);
});

console.dir(ev.astRegExpLiteral.pattern.elements, {
	colors: true,
	depth: 3,
});

console.log('--------------------------');

ev.resume();

//console.dir(ev.resume(), {
//	colors: true,
//});

//ev.changed = true;

console.log(777);

//console.dir([999, ev.toString(true)], {
//	colors: true,
//});

console.dir([999, ev.getSource()]);

console.dir(/\p{L}/.test('a'));
