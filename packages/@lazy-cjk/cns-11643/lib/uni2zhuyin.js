"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uni2zhuyin_table = uni2zhuyin_table;
exports.uni2zhuyin = uni2zhuyin;
exports.uni2zhuyin_all = uni2zhuyin_all;
exports.char2zhuyin = char2zhuyin;
exports.char2zhuyin_all = char2zhuyin_all;
const char2uni_1 = require("./char2uni");
function uni2zhuyin_table() {
    return require('./cns/zhuyin/uni2zhuyin.json');
}
function uni2zhuyin(uni) {
    return uni2zhuyin_all(uni)[0];
}
function uni2zhuyin_all(uni) {
    return uni2zhuyin_table()[uni];
}
function char2zhuyin(char) {
    return uni2zhuyin((0, char2uni_1.char2uni)(char));
}
function char2zhuyin_all(char) {
    return uni2zhuyin_all((0, char2uni_1.char2uni)(char));
}
exports.default = uni2zhuyin;
//# sourceMappingURL=uni2zhuyin.js.map