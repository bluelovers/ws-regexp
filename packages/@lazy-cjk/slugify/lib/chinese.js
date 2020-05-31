"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyCjk = exports._replaceCjk = void 0;
const cns_11643_1 = require("@lazy-cjk/cns-11643");
const core_1 = require("./core");
const transliteration_1 = require("transliteration");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const REGEXP_TEST = new RegExp(cjk_conv_1._re_cjk_conv('u').source, 'ug');
function _replaceCjk(text, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    return text.replace(REGEXP_TEST, (s) => {
        let n = transliteration_1.slugify(s);
        if (n === '') {
            n = cns_11643_1.char2pinyin_01(s)[0];
        }
        if (n) {
            return n + append;
        }
        return s;
    });
    /*
    return replaceChar(text, (s, c) =>
    {
        let n = _slugify(c);

        if (n === '')
        {
            n = char2pinyin_01(c)[0]
        }

        return n + append
    })
     */
}
exports._replaceCjk = _replaceCjk;
function slugifyCjk(word, options) {
    return core_1._core(_replaceCjk(word), options);
}
exports.slugifyCjk = slugifyCjk;
//# sourceMappingURL=chinese.js.map