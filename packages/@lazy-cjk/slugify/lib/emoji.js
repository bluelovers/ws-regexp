"use strict";
/**
 * Created by user on 2020/5/31.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._replaceEmoji = _replaceEmoji;
exports.slugifyEmoji = slugifyEmoji;
const core_1 = require("./core");
const emoji_regex_1 = require("@lazy-cjk/emoji-regex");
function _replaceEmoji(word, options) {
    var _a;
    let append = (_a = options === null || options === void 0 ? void 0 : options.separator) !== null && _a !== void 0 ? _a : ' ';
    return (0, emoji_regex_1.replaceEmoji)(word, (emoji) => {
        return emoji_regex_1.mapEmoji.get(emoji) + append;
    });
}
function slugifyEmoji(word, options) {
    return (0, core_1._core)(_replaceEmoji(word), options);
}
//# sourceMappingURL=emoji.js.map