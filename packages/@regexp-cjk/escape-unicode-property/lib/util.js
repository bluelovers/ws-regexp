"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
const util_1 = require("@regexp-cjk/rewrite-pattern/lib/util");
const lodash_1 = require("lodash");
function handleOptions(options, flags) {
    return (0, util_1.handleOptions)((0, lodash_1.merge)({}, options, {
        unicodePropertyEscape: true,
        rewriteFlags: {
            unicode: true,
        },
    }), flags !== null && flags !== void 0 ? flags : 'u');
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=util.js.map