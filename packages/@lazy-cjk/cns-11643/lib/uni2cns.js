"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2cns = exports.uni2cns = void 0;
const char2uni_1 = require("./char2uni");
function uni2cns(uni) {
    uni = parseInt(uni.toString());
    if (uni >= 983040) {
        return require('./cns/unicode/uni2cns.15.json')[uni];
    }
    else if (uni >= 131072) {
        return require('./cns/unicode/uni2cns.2.json')[uni];
    }
    return require('./cns/unicode/uni2cns.bmp.json')[uni];
}
exports.uni2cns = uni2cns;
function char2cns(char) {
    return uni2cns(char2uni_1.char2uni(char));
}
exports.char2cns = char2cns;
exports.default = uni2cns;
//# sourceMappingURL=uni2cns.js.map