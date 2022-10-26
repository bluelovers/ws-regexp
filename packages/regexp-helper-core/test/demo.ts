/**
 * Created by user on 2018/5/7/007.
 */

import * as util from "util";
import { toHex, surrogatePair, unicodeUnEscape, unicodeEscape, toUnicode } from '../src/index';

util.inspect.defaultOptions.colors = true;

console.dir(toUnicode('𠮷'));
console.dir(toUnicode('𠮷'.codePointAt(0)));

console.dir(toUnicode('𠮷', true));
console.dir(toUnicode('𠮷'.codePointAt(0), true));

console.dir(/[𠮷]/u.test('𠮷'));
console.dir(/[\u{20bb7}]/u.test('𠮷'));
console.dir(/[\ud842\udfb7]/u.test('𠮷'));

console.dir(['\ud842\udfb7', toHex('\ud842\udfb7'.codePointAt(0))]);

console.dir(surrogatePair('𠮷'.codePointAt(0)));

console.dir('𠮷'.charCodeAt(0), '𠮷'.charCodeAt(1));

console.dir('\uffff'.codePointAt(0));
console.dir(toHex('𠮷'.codePointAt(0)));

console.dir(unicodeUnEscape('\\u{20bb7}'));
console.dir(unicodeUnEscape(toUnicode('𠮷')));

console.dir(unicodeEscape('𠮷\n123'));

console.dir(unicodeUnEscape('\\u{48}\\u{65}\\u{6c}\\u{6c}\\u{6f}\\u{20}\\u{77}\\u{6f}\\u{72}\\u{6c}\\u{64}'));
