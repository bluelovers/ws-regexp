"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyCjk = exports._replaceCjk = void 0;
const cns_11643_1 = require("@lazy-cjk/cns-11643");
const core_1 = require("./core");
const transliteration_1 = require("transliteration");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const romanize_1 = __importDefault(require("@lazy-cjk/japanese/lib/romanize"));
const kana_1 = require("@lazy-cjk/japanese/lib/data/kana");
const korean_romanize_1 = __importDefault(require("@lazy-cjk/korean-romanize"));
const REGEXP_TEST = new RegExp(cjk_conv_1._re_cjk_conv('u').source, 'ug');
const REGEXP_TEST_JP = new RegExp('(?:(?:' + kana_1.katakanaRegex.source + ')|(?:' + kana_1.hiraganaRegex.source + '))+', 'ug');
function _replaceCjk(text, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    text = text.replace(REGEXP_TEST, (s) => {
        let n = transliteration_1.slugify(s);
        if (n === '') {
            n = cns_11643_1.char2pinyin_01(s)[0];
        }
        if (n) {
            return n + append;
        }
        return s;
    });
    text = text.replace(REGEXP_TEST_JP, (s) => {
        let n = romanize_1.default(s);
        if (n !== '') {
            return n;
        }
        return s;
    });
    text = korean_romanize_1.default(text);
    return text;
}
exports._replaceCjk = _replaceCjk;
function slugifyCjk(word, options) {
    return core_1._core(_replaceCjk(word), options);
}
exports.slugifyCjk = slugifyCjk;
//# sourceMappingURL=cjk.js.map