const assert = require('assert');
const m = require('../index');

try
{
	let r = m(/(\d+)/, '$200 and $400');
	const f = r[0];
	assert.strictEqual(f.match, '200');
	assert.strictEqual(f.sub[0], '200');
	assert.strictEqual(f.index, 1);
	assert.strictEqual(m(/\d+/g, '$200 and $400')[1].match, '400');
	assert.strictEqual(m(/\d+/g, 'unicorn').length, 0);

	let ks = Object.keys(r);
	let os = Object.getOwnPropertyNames(r);

	console.dir({
		keys: ks,
		getOwnPropertyNames: os,
	});

	assert.strictEqual(ks.every(v => v === ('' + (v | 0))), true);
	assert.strictEqual(os.every(v => v === ('' + (v | 0))), false);

	assert.notStrictEqual(ks, os);

	let s = r.input;
	// @ts-ignore
	r.input += '123';
	assert.strictEqual(r.input, s);

	let i = r.lastIndex;
	// @ts-ignore
	r.lastIndex += 123;
	assert.strictEqual(r.lastIndex, i);

	console.log('test ok');
}
catch (e)
{
	console.error(e);
}
