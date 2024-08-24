"use strict";
/**
 * Created by user on 2020/5/30.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2uni = char2uni;
exports.uni2char = uni2char;
exports.char2hex = char2hex;
exports.hex2char = hex2char;
exports.uni2hex = uni2hex;
function char2uni(char) {
    return char.codePointAt(0);
}
function uni2char(uni) {
    return String.fromCodePoint(uni);
}
function char2hex(char) {
    return char2uni(char).toString(16);
}
function hex2char(hex) {
    return uni2char(parseInt(hex, 16));
}
function uni2hex(uni) {
    uni = parseInt(uni.toString());
    return uni.toString(16);
}
//# sourceMappingURL=char2uni.js.map