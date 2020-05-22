/**
 * Created by user on 2018/7/24/024.
 */

import path from 'path';
import * as PackageJson from '../package.json';
// @ts-ignore
import { async as crossSpawn } from 'cross-spawn-extra';
// @ts-ignore
import gitRoot from 'git-root2';

(async () =>
{
	const project_root = path.join(__dirname, '..');

	let gitroot: string;

	// @ts-ignore
	gitroot = gitRoot(__dirname);

	if (!gitroot || path.relative(gitroot, project_root))
	{
		console.warn(`no git exists`);
		return;
	}

	let options = {
		cwd: project_root,
		stdio: 'inherit',
	};

	let msg = `npm publish ${PackageJson.version}`;

	await crossSpawn('git', [
		'commit',
		'-a',
		'-m',
		msg,
	], options);

	await new Promise(function (done)
	{
		setTimeout(done, 500);
	});

	await crossSpawn('git', [
		'tag',
		'-a',
		PackageJson.version,
		'-m',
		msg,
	], options);

})().catch(e => console.error(e));
