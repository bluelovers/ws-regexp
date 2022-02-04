"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyCjk = exports._replaceCjk = void 0;
const tslib_1 = require("tslib");
const core_1 = require("./core");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const romanize_1 = tslib_1.__importDefault(require("@lazy-cjk/japanese/lib/romanize"));
const kana_1 = require("@lazy-cjk/japanese/lib/data/kana");
const korean_romanize_1 = tslib_1.__importDefault(require("@lazy-cjk/korean-romanize"));
const chinese_1 = require("./cjk/chinese");
const REGEXP_TEST = new RegExp((0, cjk_conv_1._re_cjk_conv)('u').source, 'ug');
const REGEXP_TEST_JP = new RegExp('(?:(?:' + kana_1.katakanaRegex.source + ')|(?:' + kana_1.hiraganaRegex.source + '))+', 'ug');
function _replaceCjk(text, options) {
    var _a;
    let append = (options === null || options === void 0 ? void 0 : options.noSepBetweenZhChar) ? '' : ((_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ');
    const char2pinyin = (0, chinese_1.newZhPinyinFn)(options);
    text = text.replace(REGEXP_TEST, (s) => {
        let n = char2pinyin(s);
        if (n === null || n === void 0 ? void 0 : n.length) {
            return n + append;
        }
        return s;
    });
    text = text.replace(REGEXP_TEST_JP, (s) => {
        let n = (0, romanize_1.default)(s);
        if (n !== '') {
            return n;
        }
        return s;
    });
    text = (0, korean_romanize_1.default)(text);
    return text;
}
exports._replaceCjk = _replaceCjk;
function slugifyCjk(word, options) {
    return (0, core_1._core)(_replaceCjk(word), options);
}
exports.slugifyCjk = slugifyCjk;
//# sourceMappingURL=cjk.js.map