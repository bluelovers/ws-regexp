"use strict";
/**
 * Created by user on 2020/5/31.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyEmoji = exports._replaceEmoji = void 0;
const core_1 = require("./core");
const emoji_regex_1 = require("@lazy-cjk/emoji-regex");
function _replaceEmoji(word, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    return emoji_regex_1.replaceEmoji(word, (emoji) => {
        return emoji_regex_1.mapEmoji.get(emoji) + append;
    });
}
exports._replaceEmoji = _replaceEmoji;
function slugifyEmoji(word, options) {
    return core_1._core(_replaceEmoji(word), options);
}
exports.slugifyEmoji = slugifyEmoji;
//# sourceMappingURL=emoji.js.map