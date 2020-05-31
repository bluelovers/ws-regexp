"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2zhuyin_all = exports.char2zhuyin = exports.uni2zhuyin_all = exports.uni2zhuyin = exports.uni2zhuyin_table = void 0;
const char2uni_1 = require("./char2uni");
function uni2zhuyin_table() {
    return require('./cns/zhuyin/uni2zhuyin.json');
}
exports.uni2zhuyin_table = uni2zhuyin_table;
function uni2zhuyin(uni) {
    return uni2zhuyin_all(uni)[0];
}
exports.uni2zhuyin = uni2zhuyin;
function uni2zhuyin_all(uni) {
    return uni2zhuyin_table()[uni];
}
exports.uni2zhuyin_all = uni2zhuyin_all;
function char2zhuyin(char) {
    return uni2zhuyin(char2uni_1.char2uni(char));
}
exports.char2zhuyin = char2zhuyin;
function char2zhuyin_all(char) {
    return uni2zhuyin_all(char2uni_1.char2uni(char));
}
exports.char2zhuyin_all = char2zhuyin_all;
exports.default = uni2zhuyin;
//# sourceMappingURL=uni2zhuyin.js.map