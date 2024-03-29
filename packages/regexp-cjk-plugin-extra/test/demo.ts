/**
 * Created by user on 2019/5/28.
 */

import zhRegExp, { IOptions } from 'regexp-cjk';
import createZhRegExpPlugin, { IZhRegExpPluginOptions } from 'regexp-cjk-plugin-extra';

let options: IZhRegExpPluginOptions = {
	autoDeburr: true,
	autoFullHalf: true,
	autoLocale: true,
	autoVoice: true,
};

let re = new zhRegExp(/déjà vu/ui, {
	on: [
		createZhRegExpPlugin(options)
	],
});

let word = `deja vu`;

console.log(re, word, re.test(word));
