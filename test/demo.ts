/**
 * Created by user on 2018/5/7/007.
 */

import * as util from "util";
import core from '..';
import { toHex, surrogatePair } from '../index';

util.inspect.defaultOptions.colors = true;

console.log(core.toUnicode('𠮷'));
console.log(core.toUnicode('𠮷'.codePointAt(0)));

console.log(core.toUnicode('𠮷', true));
console.log(core.toUnicode('𠮷'.codePointAt(0), true));

console.log(/[𠮷]/u.test('𠮷'));
console.log(/[\u{20bb7}]/u.test('𠮷'));
console.log(/[\ud842\udfb7]/u.test('𠮷'));

console.log(666, '\ud842\udfb7', toHex('\ud842\udfb7'.codePointAt(0)));

console.dir(surrogatePair('𠮷'.codePointAt(0)));

console.log('𠮷'.charCodeAt(0), '𠮷'.charCodeAt(1));

console.log('\uffff'.codePointAt(0));
console.log(toHex('𠮷'.codePointAt(0)));
