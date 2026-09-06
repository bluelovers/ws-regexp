'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rewritePattern = require('regexpu-core');

// @ts-ignore
/**
 * The optional options argument recognizes the following properties:
 *
 * @see https://github.com/mathiasbynens/regexpu-core/tree/v4.8.0#readme
 */

/**
 * This function takes a string that represents a regular expression pattern as well as a string representing its flags, and returns an ES5-compatible version of the pattern.
 * @example
 * rewritePattern('foo.bar', 'u');
 * // → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])bar'
 *
 * rewritePattern('[\\u{1D306}-\\u{1D308}a-z]', 'u');
 * // → '(?:[a-z]|\\uD834[\\uDF06-\\uDF08])'
 *
 * rewritePattern('[\\u{1D306}-\\u{1D308}a-z]', 'ui');
 * // → '(?:[a-z\\u017F\\u212A]|\\uD834[\\uDF06-\\uDF08])'
 *
 * @example <caption>regexpu-core can rewrite non-ES6 regular expressions too, which is useful to demonstrate how their behavior changes once the u and i flags are added:</caption>
 * // In ES5, the dot operator only matches BMP symbols:
 * rewritePattern('foo.bar');
 * // → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF])bar'
 *
 * // But with the ES2015 `u` flag, it matches astral symbols too:
 * rewritePattern('foo.bar', 'u');
 * // → 'foo(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])bar'
 *
 * @see https://github.com/mathiasbynens/regexpu-core/tree/v4.8.0#readme
 */

function rewritePatternV4(...argv) {
  return _rewritePattern(...argv);
}

exports.default = rewritePatternV4;
exports.rewritePatternV4 = rewritePatternV4;
//# sourceMappingURL=index.cjs.development.cjs.map
