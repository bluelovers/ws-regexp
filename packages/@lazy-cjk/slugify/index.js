"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.transliterate = void 0;
const core_1 = require("./lib/core");
const transliterate_1 = require("./lib/core/transliterate");
function transliterate(word, options) {
    options = core_1.handleOptions(options);
    options = {
        ...options,
    };
    options.separator = ' ';
    word = transliterate_1._text(word, options);
    word = core_1._coreCase(word, options);
    word = core_1._slice(word, options);
    return word
        .replace(/\s+/g, ' ');
}
exports.transliterate = transliterate;
function slugify(word, options) {
    options = core_1.handleOptions(options);
    word = transliterate_1._text(word, options);
    return core_1._core(word, options);
}
exports.slugify = slugify;
exports.default = slugify;
//# sourceMappingURL=index.js.map