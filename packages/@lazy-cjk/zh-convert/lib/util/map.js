"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textMap4 = exports.textMap3 = exports.textMap2 = exports.textMap1 = exports.charMap = void 0;
const uni_string_1 = require("uni-string");
const const_1 = require("../const");
function charMap(s, table) {
    let t = table[s];
    return (typeof t === 'string') ? t : s;
}
exports.charMap = charMap;
function textMap1(text, table) {
    let toText = [];
    let len = text.length;
    for (let i = 0; i < len; i++) {
        toText[i] = charMap(text[i], table);
    }
    //console.log(toText.length, toText);
    return toText.join('');
}
exports.textMap1 = textMap1;
function textMap2(text, table) {
    let toText = uni_string_1.UString.split(text, '');
    let len = toText.length;
    for (let i = 0; i < len; i++) {
        toText[i] = charMap(toText[i], table);
    }
    //console.log(toText.length, toText);
    return toText.join('');
}
exports.textMap2 = textMap2;
function textMap3(text, table) {
    let toText = text.split(/(?:)/u);
    let len = toText.length;
    for (let i = 0; i < len; i++) {
        toText[i] = charMap(toText[i], table);
    }
    //console.log(toText.length, toText);
    return toText.join('');
}
exports.textMap3 = textMap3;
function textMap4(text, table) {
    return text.replace(const_1.REGEXP_TEST, function (s) {
        return charMap(s, table);
    });
}
exports.textMap4 = textMap4;
//# sourceMappingURL=map.js.map