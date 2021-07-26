import { zhRegExp } from 'regexp-cjk';
import { createZhRegExpPlugin } from 'regexp-cjk-plugin-extra';
import { createZhRegExpCorePlugin } from 'regexp-cjk-plugin-escape-unicode-property';

/**
 * zhRegExp from all plugin enabled with unsafe options
 */
export const zhRegExpWithPluginEnabled = zhRegExp.use({
	onCore: [
		createZhRegExpCorePlugin({
			escapeAuto: true,
		}),
	],
	on: [
		createZhRegExpPlugin({
			autoVoice: true,
			autoLocale: true,
			autoDeburr: true,
			autoFullHalf: true,
		})
	],
	unsafe: true,
	greedyTable: 2,
});

export default zhRegExpWithPluginEnabled
