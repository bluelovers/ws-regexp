"use strict";
/**
 * Created by user on 2020/5/31.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBits = exports.getBit = void 0;
const tslib_1 = require("tslib");
// Get nth bit from buffer
const big_js_1 = tslib_1.__importDefault(require("big.js"));
function getBit(buffer, position) {
    let byteIndex = Math.floor(position / 8);
    let byte = buffer[byteIndex] || 0;
    return !!(byte & (1 << (7 - position % 8)));
}
exports.getBit = getBit;
// Get bits of buffer from a to b
function getBits(buffer, from, length) {
    let ret = new big_js_1.default(0);
    for (let ptr = from; ptr < from + length; ptr++) {
        ret = ret.times(2);
        if (getBit(buffer, ptr)) {
            ret = ret.plus(1);
        }
    }
    return ret;
}
exports.getBits = getBits;
//# sourceMappingURL=numbers.js.map