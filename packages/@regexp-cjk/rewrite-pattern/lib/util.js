"use strict";
/**
 * Created by user on 2020/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = exports.rewritePatternOptions = void 0;
const lodash_1 = require("lodash");
const rewrite_flags_1 = require("@regexp-cjk/rewrite-flags");
function rewritePatternOptions(options, flags) {
    var _a;
    return (0, lodash_1.defaults)({}, options, {
        dotAllFlag: true,
        lookbehind: true,
        namedGroup: true,
        useUnicodeFlag: (_a = flags === null || flags === void 0 ? void 0 : flags.includes) === null || _a === void 0 ? void 0 : _a.call(flags, 'u'),
    });
}
exports.rewritePatternOptions = rewritePatternOptions;
function handleOptions(options, flags) {
    var _a;
    flags = (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : flags;
    if (options === null || options === void 0 ? void 0 : options.rewriteFlags) {
        flags = (0, rewrite_flags_1.rewriteFlags)(flags, options.rewriteFlags);
    }
    options = rewritePatternOptions(options, flags);
    delete options.flags;
    return {
        options,
        flags,
    };
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=util.js.map