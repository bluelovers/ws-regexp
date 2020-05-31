"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyChinese = exports._replaceChinese = void 0;
const cns_11643_1 = require("@lazy-cjk/cns-11643");
const core_1 = require("./core");
const transliteration_1 = require("transliteration");
function _replaceChinese(text, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    return cns_11643_1.replaceChar(text, (s, c) => {
        let n = transliteration_1.slugify(c);
        if (n === '') {
            n = cns_11643_1.char2pinyin_01(c)[0];
        }
        return n + append;
    });
}
exports._replaceChinese = _replaceChinese;
function slugifyChinese(word, options) {
    return core_1._core(_replaceChinese(word), options);
}
exports.slugifyChinese = slugifyChinese;
//# sourceMappingURL=chinese.js.map