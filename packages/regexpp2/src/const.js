"use strict";
/**
 * Created by user on 2019/5/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumError = exports.EnumEcmaVersion = exports.EnumKindCharacterSet = exports.EnumKindAssertion = exports.EnumTypeNode = void 0;
var EnumTypeNode;
(function (EnumTypeNode) {
    /**
     * The root node.
     */
    EnumTypeNode["RegExpLiteral"] = "RegExpLiteral";
    /**
     * The pattern.
     */
    EnumTypeNode["Pattern"] = "Pattern";
    /**
     * The disjunction.
     * E.g. `a|b`
     */
    EnumTypeNode["Disjunction"] = "Disjunction";
    /**
     * The uncapturing group.
     * E.g. `(?:ab)`
     */
    EnumTypeNode["Group"] = "Group";
    /**
     * The capturing group.
     * E.g. `(ab)`, `(?<name>ab)`
     */
    EnumTypeNode["CapturingGroup"] = "CapturingGroup";
    /**
     * The lookaround assertion.
     */
    EnumTypeNode["LookaroundAssertion"] = "Assertion";
    /**
     * The lookahead assertion.
     * E.g. `(?=ab)`, `(?!ab)`
     */
    EnumTypeNode["LookaheadAssertion"] = "Assertion";
    /**
     * The lookbehind assertion.
     * E.g. `(?<=ab)`, `(?<!ab)`
     */
    EnumTypeNode["LookbehindAssertion"] = "Assertion";
    /**
     * The quantifier.
     * E.g. `a?`, `a*`, `a+`, `a{1,2}`, `a??`, `a*?`, `a+?`, `a{1,2}?`
     */
    EnumTypeNode["Quantifier"] = "Quantifier";
    /**
     * The character class.
     * E.g. `[ab]`, `[^ab]`
     */
    EnumTypeNode["CharacterClass"] = "CharacterClass";
    /**
     * The character class.
     * E.g. `[a-b]`
     */
    EnumTypeNode["CharacterClassRange"] = "CharacterClassRange";
    /**
     * The assertion.
     */
    EnumTypeNode["Assertion"] = "Assertion";
    /**
     * The boundary assertion.
     */
    EnumTypeNode["BoundaryAssertion"] = "Assertion";
    /**
     * The edge boundary assertion.
     * E.g. `^`, `$`
     */
    EnumTypeNode["EdgeAssertion"] = "Assertion";
    /**
     * The word bondary assertion.
     * E.g. `\b`, `\B`
     */
    EnumTypeNode["WordBoundaryAssertion"] = "Assertion";
    /**
     * The character set.
     */
    EnumTypeNode["CharacterSet"] = "CharacterSet";
    /**
     * The dot.
     * E.g. `.`
     */
    EnumTypeNode["AnyCharacterSet"] = "CharacterSet";
    /**
     * The character class escape.
     * E.g. `\d`, `\s`, `\w`, `\D`, `\S`, `\W`
     */
    EnumTypeNode["EscapeCharacterSet"] = "CharacterSet";
    /**
     * The unicode property escape.
     * E.g. `\p{ASCII}`, `\P{ASCII}`, `\p{Script=Hiragana}`
     */
    EnumTypeNode["UnicodePropertyCharacterSet"] = "CharacterSet";
    /**
     * The character.
     * This includes escape sequences which mean a character.
     * E.g. `a`, `あ`, `✿`, `\x65`, `\u0065`, `\u{65}`, `\/`
     */
    EnumTypeNode["Character"] = "Character";
    /**
     * The backreference.
     * E.g. `\1`, `\k<name>`
     */
    EnumTypeNode["Backreference"] = "Backreference";
    /**
     * The flags.
     */
    EnumTypeNode["Flags"] = "Flags";
})(EnumTypeNode = exports.EnumTypeNode || (exports.EnumTypeNode = {}));
var EnumKindAssertion;
(function (EnumKindAssertion) {
    EnumKindAssertion["LookaheadAssertion"] = "lookahead";
    EnumKindAssertion["LookbehindAssertion"] = "lookbehind";
    EnumKindAssertion["EdgeAssertion_Start"] = "start";
    EnumKindAssertion["EdgeAssertion_End"] = "end";
    EnumKindAssertion["WordBoundaryAssertion"] = "word";
})(EnumKindAssertion = exports.EnumKindAssertion || (exports.EnumKindAssertion = {}));
var EnumKindCharacterSet;
(function (EnumKindCharacterSet) {
    EnumKindCharacterSet["AnyCharacterSet"] = "any";
    EnumKindCharacterSet["EscapeCharacterSet_Digit"] = "digit";
    EnumKindCharacterSet["EscapeCharacterSet_Space"] = "space";
    EnumKindCharacterSet["EscapeCharacterSet_Word"] = "word";
    EnumKindCharacterSet["UnicodePropertyCharacterSet"] = "property";
})(EnumKindCharacterSet = exports.EnumKindCharacterSet || (exports.EnumKindCharacterSet = {}));
var EnumEcmaVersion;
(function (EnumEcmaVersion) {
    EnumEcmaVersion[EnumEcmaVersion["v5"] = 5] = "v5";
    EnumEcmaVersion[EnumEcmaVersion["v2015"] = 2015] = "v2015";
    EnumEcmaVersion[EnumEcmaVersion["v2016"] = 2016] = "v2016";
    EnumEcmaVersion[EnumEcmaVersion["v2017"] = 2017] = "v2017";
    EnumEcmaVersion[EnumEcmaVersion["v2018"] = 2018] = "v2018";
})(EnumEcmaVersion = exports.EnumEcmaVersion || (exports.EnumEcmaVersion = {}));
var EnumError;
(function (EnumError) {
    EnumError["UnknownError"] = "UnknownError";
    EnumError["AssertionError"] = "AssertionError";
})(EnumError = exports.EnumError || (exports.EnumError = {}));
exports.default = exports;
//# sourceMappingURL=const.js.map