"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRegularExpressionString = exports.prototypeToFlagsArray = exports.prototypeToFlags = exports.isNativeFlags = exports.stripNonNativeFlags = exports.getNativeFlags = exports.nativeFlags = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("regexp-helper-core"), exports);
const regexp_support_1 = require("regexp-support");
const lib_1 = require("./lib");
Object.defineProperty(exports, "getNativeFlags", { enumerable: true, get: function () { return lib_1.getNativeFlags; } });
Object.defineProperty(exports, "stripNonNativeFlags", { enumerable: true, get: function () { return lib_1.stripNonNativeFlags; } });
Object.defineProperty(exports, "isNativeFlags", { enumerable: true, get: function () { return lib_1.isNativeFlags; } });
Object.defineProperty(exports, "prototypeToFlags", { enumerable: true, get: function () { return lib_1.prototypeToFlags; } });
Object.defineProperty(exports, "prototypeToFlagsArray", { enumerable: true, get: function () { return lib_1.prototypeToFlagsArray; } });
const parse_1 = require("./lib/parse");
Object.defineProperty(exports, "parseRegularExpressionString", { enumerable: true, get: function () { return parse_1.parseRegularExpressionString; } });
exports.nativeFlags = regexp_support_1.support.nativeFlags;
exports.default = exports;
//# sourceMappingURL=index.js.map