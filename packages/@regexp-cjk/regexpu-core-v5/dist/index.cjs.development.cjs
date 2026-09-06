'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rewritePattern = require('regexpu-core');

// @ts-ignore
let EnumOptionsRegExpUCoreValueMode = /*#__PURE__*/function (EnumOptionsRegExpUCoreValueMode) {
  EnumOptionsRegExpUCoreValueMode["transform"] = "transform";
  EnumOptionsRegExpUCoreValueMode["parse"] = "parse";
  return EnumOptionsRegExpUCoreValueMode;
}({});

/**
 * These options can be set to false or 'transform'.
 * When using 'transform',
 * the corresponding features are compiled to older syntax that can run in older browsers.
 *
 * When using false (the default),
 * they are not compiled and they can be relied upon to compile more modern features.
 *
 * @see https://github.com/mathiasbynens/regexpu-core
 */

/**
 * @see https://github.com/mathiasbynens/regexpu-core
 */

/**
 * This function takes a string that represents a regular expression pattern as well as a string representing its flags, and returns an ES5-compatible version of the pattern.
 *
 * @see https://github.com/mathiasbynens/regexpu-core
 */

function rewritePatternV5(...argv) {
  return _rewritePattern(...argv);
}

exports.EnumOptionsRegExpUCoreValueMode = EnumOptionsRegExpUCoreValueMode;
exports.default = rewritePatternV5;
exports.rewritePatternV5 = rewritePatternV5;
//# sourceMappingURL=index.cjs.development.cjs.map
