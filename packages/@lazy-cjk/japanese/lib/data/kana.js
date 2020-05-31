"use strict";
/**
 * Created by user on 2020/5/31.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialKatakanizationTable = exports.specialHiraganizationTable = exports.hiraganaRegex = exports.katakanaRegex = void 0;
exports.katakanaRegex = new RegExp('(' +
    '[' +
    '\\u30a1-\\u30f4' + // ァ～ヴ
    '\\u30f7-\\u30fa' + // ヷ～ヺ
    '\\u30fd-\\u30ff' + // ヽ～ヿ
    '\\u31f0-\\u31ff' + // ㇰ～ㇿ
    ']' +
    '|' +
    '\\ud869\\udf08\\u3099' + // 𪜈゙
    '|' +
    '\\ud869\\udf08' + // 𪜈
    '|' +
    '\\ud82c\\udc00' + // 𛀀
    ')', 'g');
exports.hiraganaRegex = new RegExp('(' +
    '[' +
    '\\u3041-\\u3094' + // ぁ～ゔ
    '\\u309d-\\u309f' + // ゝ～ゟ
    ']' +
    '|' +
    '\\ud82c\\udc01' + // 𛀁
    ')', 'g');
exports.specialHiraganizationTable = {
    'ヿ': 'こと',
    '𪜈': 'とも',
    '𪜈゙': 'ども',
    'ヷ': 'わ゙',
    'ヸ': 'ゐ゙',
    'ヹ': 'ゑ゙',
    'ヺ': 'を゙',
    '𛀀': 'え',
    'ㇰ': 'く',
    'ㇱ': 'し',
    'ㇲ': 'す',
    'ㇳ': 'と',
    'ㇴ': 'ぬ',
    'ㇵ': 'は',
    'ㇶ': 'ひ',
    'ㇷ': 'ふ',
    'ㇸ': 'へ',
    'ㇹ': 'ほ',
    'ㇺ': 'む',
    'ㇻ': 'ら',
    'ㇼ': 'り',
    'ㇽ': 'る',
    'ㇾ': 'れ',
    'ㇿ': 'ろ',
};
exports.specialKatakanizationTable = {
    'ゟ': 'ヨリ',
    '𛀁': 'エ',
};
//# sourceMappingURL=kana.js.map