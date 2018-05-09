const assert = require('assert');
const m = require('../index');

try
{
	const f = m(/(\d+)/, '$200 and $400')[0];
	assert.strictEqual(f.match, '200');
	assert.strictEqual(f.sub[0], '200');
	assert.strictEqual(f.index, 1);
	assert.strictEqual(m(/\d+/g, '$200 and $400')[1].match, '400');
	assert.strictEqual(m(/\d+/g, 'unicorn').length, 0);
	console.log('test ok');
}
catch (e)
{
	console.error(e);
}
