"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2zhuyin = exports.uni2zhuyin = void 0;
const char2uni_1 = require("./char2uni");
function uni2zhuyin(uni) {
    return require('./cns/zhuyin/uni2zhuyin.json')[uni];
}
exports.uni2zhuyin = uni2zhuyin;
function char2zhuyin(char) {
    return uni2zhuyin(char2uni_1.char2uni(char));
}
exports.char2zhuyin = char2zhuyin;
exports.default = uni2zhuyin;
//# sourceMappingURL=uni2zhuyin.js.map