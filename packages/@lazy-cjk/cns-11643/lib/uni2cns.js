"use strict";
/**
 * Created by user on 2020/5/30.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.uni2cns = void 0;
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
exports.default = uni2cns;
//# sourceMappingURL=uni2cns.js.map