"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRegularExpressionString = exports.prototypeToFlagsArray = exports.prototypeToFlags = exports.isNativeFlags = exports.stripNonNativeFlags = exports.getNativeFlags = exports.nativeFlags = void 0;
__exportStar(require("regexp-helper-core"), exports);
const regexp_support_1 = __importDefault(require("regexp-support"));
const lib_1 = require("./lib");
Object.defineProperty(exports, "getNativeFlags", { enumerable: true, get: function () { return lib_1.getNativeFlags; } });
Object.defineProperty(exports, "stripNonNativeFlags", { enumerable: true, get: function () { return lib_1.stripNonNativeFlags; } });
Object.defineProperty(exports, "isNativeFlags", { enumerable: true, get: function () { return lib_1.isNativeFlags; } });
Object.defineProperty(exports, "prototypeToFlags", { enumerable: true, get: function () { return lib_1.prototypeToFlags; } });
Object.defineProperty(exports, "prototypeToFlagsArray", { enumerable: true, get: function () { return lib_1.prototypeToFlagsArray; } });
const parse_1 = require("./lib/parse");
Object.defineProperty(exports, "parseRegularExpressionString", { enumerable: true, get: function () { return parse_1.parseRegularExpressionString; } });
exports.nativeFlags = regexp_support_1.default.nativeFlags;
exports.default = exports;
//# sourceMappingURL=index.js.map