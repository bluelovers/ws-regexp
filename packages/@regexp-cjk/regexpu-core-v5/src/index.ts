// @ts-ignore
import _rewritePattern from 'regexpu-core';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export const enum EnumOptionsRegExpUCoreValueMode
{
	transform = 'transform',
	parse = 'parse',
}

export type IOptionsValue01 = false | ITSTypeAndStringLiteral<EnumOptionsRegExpUCoreValueMode.transform>;

export type IOptionsValue02 = ITSTypeAndStringLiteral<EnumOptionsRegExpUCoreValueMode.parse> | IOptionsValue01;

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
export interface IOptionsRegExpUCoreV5Stable
{
	/**
	 * The u flag, enabling support for Unicode code point escapes in the form \u{...}.
	 * @example
	 * rewritePattern('\\u{ab}', '', {
	 *   unicodeFlag: 'transform'
	 * });
	 * // → '\\u{ab}'
	 *
	 * rewritePattern('\\u{ab}', 'u', {
	 *   unicodeFlag: 'transform'
	 * });
	 * // → '\\xAB'
	 */
	unicodeFlag?: IOptionsValue01,

	/**
	 * dotAllFlag - The s (dotAll) flag.
	 *
	 * @see https://github.com/mathiasbynens/es-regexp-dotall-flag
	 *
	 * @example
	 * rewritePattern('.', '', {
	 *   dotAllFlag: 'transform'
	 * });
	 * // → '[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uFFFF]'
	 *
	 * rewritePattern('.', 's', {
	 *   dotAllFlag: 'transform'
	 * });
	 * // → '[\\0-\\uFFFF]'
	 *
	 * rewritePattern('.', 'su', {
	 *   dotAllFlag: 'transform'
	 * });
	 * // → '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
	 */
	dotAllFlag?: IOptionsValue01,

	/**
	 * unicodePropertyEscapes - Unicode property escapes.
	 *
	 * By default they are compiled to Unicode code point escapes of the form \u{...}.
	 * If the unicodeFlag option is set to 'transform' they often result in larger output,
	 * although there are cases (such as \p{Lu}) where it actually decreases the output size.
	 *
	 * @see https://github.com/mathiasbynens/regexpu-core/blob/main/property-escapes.md
	 *
	 * @example
	 * rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
	 *   unicodePropertyEscapes: 'transform'
	 * });
	 * // → '[\\u{14400}-\\u{14646}]'
	 *
	 * rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
	 *   unicodeFlag: 'transform',
	 *   unicodePropertyEscapes: 'transform'
	 * });
	 * // → '(?:\\uD811[\\uDC00-\\uDE46])'
	 */
	unicodePropertyEscapes?: IOptionsValue01,

	/**
	 * namedGroups - Named capture groups.
	 *
	 * @see https://github.com/tc39/proposal-regexp-named-groups
	 *
	 * When using namedGroups: 'transform',
	 * regexpu-core only takes care of the syntax:
	 *
	 * you will still need a runtime wrapper around the regular expression to populate the .groups property of RegExp.prototype.match()'s result.
	 *
	 * If you are using regexpu-core via Babel, it's handled automatically.
	 *
	 * @example
	 * rewritePattern('(?<name>.)\\k<name>', '', {
	 *   namedGroup: "transform"
	 * });
	 * // → '(.)\1'
	 */
	namedGroups?: IOptionsValue01,
}

/**
 * These options can be set to false, 'parse' and 'transform'.
 * When using 'transform', the corresponding features are compiled to older syntax that can run in older browsers.
 *
 * When using 'parse',
 * they are parsed and left as-is in the output pattern. When using false (the default), they result in a syntax error if used.
 *
 * Once these features become stable (when the proposals are accepted as part of ECMAScript),
 * they will be parsed by default and thus 'parse' will behave like false.
 */
export interface IOptionsRegExpUCoreV5Experimental
{
	/**
	 * unicodeSetsFlag - The v (unicodeSets) flag
	 *
	 * @see https://github.com/tc39/proposal-regexp-set-notation
	 *
	 * By default, patterns with the v flag are transformed to patterns with the u flag. If you want to downlevel them more you can set the unicodeFlag: 'transform' option.
	 *
	 * @example
	 * rewritePattern('[\\p{Emoji}&&\\p{ASCII}]', 'u', {
	 *   unicodeSetsFlag: 'transform'
	 * });
	 * // → '[#\*0-9]'
	 *
	 * rewritePattern('[^[a-h]&&[f-z]]', 'v', {
	 *   unicodeSetsFlag: 'transform'
	 * });
	 * // → '[^f-h]' (to be used with /u)
	 *
	 * rewritePattern('[^[a-h]&&[f-z]]', 'v', {
	 *   unicodeSetsFlag: 'transform',
	 *   unicodeFlag: 'transform'
	 * });
	 * // → '(?:(?![f-h])[\s\S])' (to be used without /u)
	 */
	unicodeSetsFlag?: IOptionsValue02,


}

export interface IOptionsRegExpUCoreV5Miscellaneous
{
	/**
	 * This option is a function that gets called when a named capture group is found.
	 * It receives two parameters:
	 * the name of the group, and its index.
	 *
	 * @example
	 * rewritePattern('(?<name>.)\\k<name>', '', {
	 *   onNamedGroup(name, index) {
	 *     console.log(name, index);
	 *     // → 'name', 1
	 *   }
	 * });
	 */
	onNamedGroup?(name: string, index: number): void,
}

/**
 * @see https://github.com/mathiasbynens/regexpu-core
 */
export interface IOptionsRegExpUCoreV5 extends IOptionsRegExpUCoreV5Stable, IOptionsRegExpUCoreV5Experimental, IOptionsRegExpUCoreV5Miscellaneous
{

}

/**
 * This function takes a string that represents a regular expression pattern as well as a string representing its flags, and returns an ES5-compatible version of the pattern.
 *
 * @see https://github.com/mathiasbynens/regexpu-core
 */
export function rewritePatternV5(pattern: string, flags?: string, options?: IOptionsRegExpUCoreV5): string
export function rewritePatternV5(...argv: any[]): string
{
	return _rewritePattern(...argv)
}

export default rewritePatternV5;
