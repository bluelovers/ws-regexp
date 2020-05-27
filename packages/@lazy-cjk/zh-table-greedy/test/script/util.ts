import Bluebird from 'bluebird';
import { join } from "path";
import CrossSpawn from 'cross-spawn-extra';

const __root = join(__dirname, '../..');

export async function tryBuild(includeSource?: boolean)
{
	console.log(`build start`);

	if (includeSource)
	{
		await CrossSpawn.async('yarn', [
			`run`,
			`build`,
		], {
			cwd: __root,
			stdio: 'inherit',
		})
		;

		//await Bluebird.delay(1000);
	}

	await CrossSpawn.async('tsc', [
		join(__root, 'lib', 'table.ts'),
	], {
		cwd: __root,
		stdio: 'inherit',
	})
	;

	//await Bluebird.delay(1000);

	await CrossSpawn.async('ts-node', [
		join(__root, 'lib', 'table.ts'),
	], {
		cwd: __root,
		stdio: 'inherit',
	})
	;

	//await Bluebird.delay(1000);

	console.log(`build end`);
}
