"use strict";
/**
 * Created by user on 2020/5/30.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.uni2hex = exports.hex2char = exports.char2hex = exports.uni2char = exports.char2uni = void 0;
function char2uni(char) {
    return char.codePointAt(0);
}
exports.char2uni = char2uni;
function uni2char(uni) {
    return String.fromCodePoint(uni);
}
exports.uni2char = uni2char;
function char2hex(char) {
    return char2uni(char).toString(16);
}
exports.char2hex = char2hex;
function hex2char(hex) {
    return uni2char(parseInt(hex, 16));
}
exports.hex2char = hex2char;
function uni2hex(uni) {
    uni = parseInt(uni.toString());
    return uni.toString(16);
}
exports.uni2hex = uni2hex;
//# sourceMappingURL=char2uni.js.map