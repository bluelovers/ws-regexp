/**
 * Created by user on 2020/6/27.
 */

import { wsPkgDepsListableRecord } from 'ws-pkg-list';
import wsChanged from '@yarn-tool/ws-changed';
import { findUpDepsAllDeep } from '@yarn-tool/find-deps';
import Bluebird from 'bluebird';
import crossSpawnExtra from 'cross-spawn-extra';

export default (async () => {

	let record = wsPkgDepsListableRecord()

	const listChanged = wsChanged()

	const cwd = listChanged.cwd;

	let list = listChanged.changed.concat(listChanged.staged).map(row => row.name)

	let list2 = findUpDepsAllDeep(list, record);

	let list3 = list2.reduce((a, b) => {

		a.push(b[0])

		return a
	}, [] as string[])

	console.log(list2)

	if (list3.includes('cjk-conv'))
	{
		let cp = await crossSpawnExtra.async('lerna', [
			`run`,
			`--scope`,
			`cjk-conv`,
			`--concurrency`,
			1,
			`prepublishOnly`,
		], {
			cwd,
			stdio: 'inherit',
		})

		if (cp.exitCode)
		{
			process.exit(cp.exitCode)
		}
	}

	let cp = await crossSpawnExtra.async('lerna', [
		`run`,
		...list3.map(v => `--scope=${v}`),
		`--concurrency`,
		1,
		`prepublishOnly:lerna`,
	], {
		cwd,
		stdio: 'inherit',
	})

	if (cp.exitCode)
	{
		process.exit(cp.exitCode)
	}

})();
