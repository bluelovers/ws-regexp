"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = _get;
exports.getVoiceAll = getVoiceAll;
exports.toVoice01 = toVoice01;
exports.toVoice02 = toVoice02;
exports.toVoice03 = toVoice03;
/**
 * Created by user on 2020/5/27.
 */
const table_1 = require("./table");
function _get(char, idx) {
    if (!char.length) {
        throw new TypeError(`char: '${char}', not valid`);
    }
    else if (idx !== 0 /* EnumTableVoice['01'] */ && idx !== 1 /* EnumTableVoice['02'] */ && idx !== 2 /* EnumTableVoice['03'] */) {
        throw new TypeError(`char: '${char}', not valid`);
    }
    if (table_1.table_voice[char]) {
        return table_1.table_voice[char][idx];
    }
}
/**
 * 清濁音
 * [清音, 濁音, 半濁音]
 */
function getVoiceAll(char) {
    return table_1.table_voice[char];
}
/**
 * 清音
 */
function toVoice01(char) {
    return _get(char, 0 /* EnumTableVoice['01'] */);
}
/**
 * 濁音
 */
function toVoice02(char) {
    return _get(char, 1 /* EnumTableVoice['02'] */);
}
/**
 * 半濁音
 */
function toVoice03(char) {
    return _get(char, 2 /* EnumTableVoice['03'] */);
}
//# sourceMappingURL=util.js.map