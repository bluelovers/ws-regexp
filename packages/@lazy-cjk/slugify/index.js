"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.transliterate = void 0;
const core_1 = require("./lib/core");
function transliterate(word, options) {
    options = core_1.handleOptions(options);
    options = {
        ...options,
    };
    options.separator = ' ';
    options.noSepBetweenZhChar = true;
    options.noStripOthers = true;
    return core_1._core(word, options);
}
exports.transliterate = transliterate;
function slugify(word, options) {
    options = core_1.handleOptions(options);
    return core_1._core(word, options);
}
exports.slugify = slugify;
exports.default = slugify;
//# sourceMappingURL=index.js.map