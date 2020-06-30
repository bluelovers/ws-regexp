"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newZhPinyinFn = void 0;
const uni2pinyin_01_1 = require("@lazy-cjk/cns-11643/lib/uni2pinyin_01");
const uni2pinyin_02_1 = require("@lazy-cjk/cns-11643/lib/uni2pinyin_02");
const types_1 = require("@lazy-cjk/cns-11643/lib/types");
const transliteration_1 = require("transliteration");
function newZhPinyinFn(options) {
    var _a;
    let chineseOptions = (_a = options === null || options === void 0 ? void 0 : options.chineseOptions) !== null && _a !== void 0 ? _a : {};
    let { useTransliteration, pinyinMode, pinyinType } = chineseOptions;
    if (typeof useTransliteration === 'undefined' && typeof pinyinMode === 'undefined' && typeof pinyinType === 'undefined') {
        useTransliteration = true;
    }
    const char2pinyinMode = pinyinMode ? uni2pinyin_01_1.char2pinyin_01 : uni2pinyin_02_1.char2pinyin_02;
    if (typeof pinyinType !== 'number' || !(pinyinType in types_1.EnumPinyinType)) {
        pinyinType = types_1.EnumPinyinType.han;
    }
    const char2pinyin = (s) => char2pinyinMode(s)[pinyinType];
    if (useTransliteration) {
        return (s) => {
            if (s === null || s === void 0 ? void 0 : s.length) {
                let n = transliteration_1.slugify(s);
                if (n === '') {
                    n = char2pinyin(s);
                }
                if (n === null || n === void 0 ? void 0 : n.length) {
                    return n;
                }
                return;
            }
            return s;
        };
    }
    return (s) => {
        if (s === null || s === void 0 ? void 0 : s.length) {
            let n = char2pinyin(s);
            if (n === null || n === void 0 ? void 0 : n.length) {
                return n;
            }
            return;
        }
        return s;
    };
}
exports.newZhPinyinFn = newZhPinyinFn;
//# sourceMappingURL=chinese.js.map