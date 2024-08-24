"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transliterate = transliterate;
exports.slugify = slugify;
const core_1 = require("./lib/core");
function transliterate(word, options) {
    options = (0, core_1.handleOptions)(options);
    options = {
        ...options,
    };
    options.separator = ' ';
    options.noSepBetweenZhChar = true;
    options.noStripOthers = true;
    return (0, core_1._core)(word, options);
}
function slugify(word, options) {
    options = (0, core_1.handleOptions)(options);
    return (0, core_1._core)(word, options);
}
exports.default = slugify;
//# sourceMappingURL=index.js.map