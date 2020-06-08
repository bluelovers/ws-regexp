/**
 * Created by user on 2020/6/8.
 */

import { rewritePattern, rewritePatternCore } from '../index';
import { rewriteFlags } from '../flags';
import _rewritePattern from 'regexpu-core';
import regjsparser from 'regjsparser';

console.dir(rewritePattern('(?<=.)a', '', {
	'lookbehind': true
}))

console.log(rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
	'unicodePropertyEscape': true,
//	'useUnicodeFlag': false
}))

console.log(rewritePattern('[\\u{14400}-\\u{14646}]', 'u', {
//	'unicodePropertyEscape': true,
	'useUnicodeFlag': false
}))


console.log(777, rewriteFlags({
	dotAll: true,
	sticky: true,
	multiline: true,
	global: true,
	ignoreCase: true,
	unicode: true,
}))


console.log(new RegExp('', 'uigmys').flags)

let source: string;

console.log(/((?<name>.)\k<name>)/.exec('22'))

console.log(rewritePattern(/((?<name>.)\k<name>\1)/.source, '', {
	namedGroup: false,
}))

//source = regjsparser.parse(`(?<name>.)`, '', {
//	namedGroups: true,
//})
//
//console.dir(source)

console.dir(/((?<name>.)\k<name>)/.source)
