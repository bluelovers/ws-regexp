"use strict";
/**
 * Created by user on 2020/5/31.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyEmoji = exports._replaceEmoji = exports.reSupportedEmoji = exports.listSupportedEmoji = void 0;
const emoji_json_1 = __importDefault(require("emoji.json"));
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
const core_1 = require("./core");
exports.listSupportedEmoji = emoji_json_1.default
    .map(({ char, name }) => [new RegExp(`${escape_string_regexp_1.default(char)}`, 'ug'), name]);
exports.reSupportedEmoji = new RegExp(exports.listSupportedEmoji.map(ls => ls[0].source).join('|'), 'ug');
function _replaceEmoji(word, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    exports.listSupportedEmoji
        .forEach(([s, r]) => {
        word = word.replace(s, r + append);
    });
    return word;
}
exports._replaceEmoji = _replaceEmoji;
function slugifyEmoji(word, options) {
    return core_1._core(_replaceEmoji(word), options);
}
exports.slugifyEmoji = slugifyEmoji;
//# sourceMappingURL=emoji.js.map