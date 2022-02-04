// @ts-ignore
import _rewritePattern from 'regexpu-core';

/**
 * The optional options argument recognizes the following properties:
 *
 * @see https://github.com/mathiasbynens/regexpu-core/tree/v4.8.0#readme
 */
export interface IOptionsRegExpUCoreV4
{
	/**
	 * Setting this option to true enables support for the s (dotAll) flag.
	 * @example
	 * rewritePattern('.');
	 * // → '[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF]'
	 *
	 * rewritePattern('.', '', {
	 *   'dotAllFlag': true
	 * });
	 * // → '[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF]'
	 *
	 * rewritePattern('.', 's', {
	 *   'dotAllFlag': true
	 * });
	 * // → '[\\0-\\uFFFF]'
	 *
	 * rewritePattern('.', 'su', {
	 *   'dotAllFlag': true
	 * });
	 * // → '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
	 */
	dotAllFlag?: boolean,

	/**
	 * Setting this option to true enables support for Unicode property escapes:
	 * @example
	 * rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
	 *   'unicodePropertyEscape': true
	 * });
	 * // → '(?:\\uD811[\\uDC00-\\uDE46])'
	 */
	unicodePropertyEscape?: boolean,

	/**
	 * Setting this option to true enables support for lookbehind assertions.
	 * @example
	 * rewritePattern('(?<=.)a', '', {
	 *   'lookbehind': true
	 * });
	 * // → '(?<=[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF])a'
	 */
	lookbehind?: boolean,

	/**
	 * Setting this option to true enables support for named capture groups.
	 * @example
	 * rewritePattern('(?<name>.)\k<name>', '', {
	 *   'namedGroup': true
	 * });
	 * // → '(.)\1'
	 */
	namedGroup?: boolean,

	/**
	 * This option is a function that gets called when a named capture group is found.
	 * It receives two parameters:
	 * the name of the group, and its index.
	 */
	onNamedGroup?(name: string, index: number): void,

	/**
	 * Setting this option to true enables the use of Unicode code point escapes of the form \u{…}.
	 * Note that in regular expressions,
	 * such escape sequences only work correctly when the ES2015 u flag is set.
	 * Enabling this setting often results in more compact output,
	 * although there are cases (such as \p{Lu}) where it actually increases the output size.
	 * @example
	 * rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
	 *   'unicodePropertyEscape': true,
	 *   'useUnicodeFlag': true
	 * });
	 * // → '[\\u{14400}-\\u{14646}]'
	 */
	useUnicodeFlag?: boolean,
}

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
 */
export function rewritePatternV4(pattern: string, flags?: string, options?: IOptionsRegExpUCoreV4): string
export function rewritePatternV4(...argv: any[]): string
{
	return _rewritePattern(...argv)
}

export default rewritePatternV4;
