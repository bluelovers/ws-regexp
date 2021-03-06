function _requireResolve(name)
{
	let result;

	try
	{
		const { requireResolveExtra, requireResolveCore } = require('@yarn-tool/require-resolve');

		const tsdx_path = requireResolveExtra('tsdx').result;

		result = requireResolveCore(name, {
			includeGlobal: true,
			includeCurrentDirectory: true,
			paths: [
				tsdx_path,
			],
		})
	}
	catch (e)
	{

	}

	return result || require.resolve(name)
}

/**
 * @type { import('@jest/types').Config.InitialOptions }
 */
module.exports = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testEnvironment: 'node',
	//testMatch: ['**/*.test.ts', '**/*.spec.ts'],
	testMatch: void 0,
	testRegex: ['\\.(tests?|spec)\\.(ts|tsx)$'],
	//testRunner: 'jest-circus/runner',
	setupFilesAfterEnv: [
		//"jest-chain",
		//"jest-extended",
		//"jest-extended-extra",
		//"jest-num-close-with",
	],
	transform: {
		'.(ts|tsx)$': _requireResolve('ts-jest'),
	},
	verbose: true,
	/**
	 * if didn't set `coverageProvider` to `v8`
	 * with `collectCoverage` `true`, nodejs debug point maybe will fail
	 */
	coverageProvider: 'v8',
	collectCoverage: false,
}
