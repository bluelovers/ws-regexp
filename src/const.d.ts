/**
 * Created by user on 2019/5/9.
 */
export declare const enum EnumTypeNode {
    /**
     * The root node.
     */
    RegExpLiteral = "RegExpLiteral",
    /**
     * The pattern.
     */
    Pattern = "Pattern",
    /**
     * The disjunction.
     * E.g. `a|b`
     */
    Disjunction = "Disjunction",
    /**
     * The uncapturing group.
     * E.g. `(?:ab)`
     */
    Group = "Group",
    /**
     * The capturing group.
     * E.g. `(ab)`, `(?<name>ab)`
     */
    CapturingGroup = "CapturingGroup",
    /**
     * The lookaround assertion.
     */
    LookaroundAssertion = "Assertion",
    /**
     * The lookahead assertion.
     * E.g. `(?=ab)`, `(?!ab)`
     */
    LookaheadAssertion = "Assertion",
    /**
     * The lookbehind assertion.
     * E.g. `(?<=ab)`, `(?<!ab)`
     */
    LookbehindAssertion = "Assertion",
    /**
     * The quantifier.
     * E.g. `a?`, `a*`, `a+`, `a{1,2}`, `a??`, `a*?`, `a+?`, `a{1,2}?`
     */
    Quantifier = "Quantifier",
    /**
     * The character class.
     * E.g. `[ab]`, `[^ab]`
     */
    CharacterClass = "CharacterClass",
    /**
     * The character class.
     * E.g. `[a-b]`
     */
    CharacterClassRange = "CharacterClassRange",
    /**
     * The assertion.
     */
    Assertion = "Assertion",
    /**
     * The boundary assertion.
     */
    BoundaryAssertion = "Assertion",
    /**
     * The edge boundary assertion.
     * E.g. `^`, `$`
     */
    EdgeAssertion = "Assertion",
    /**
     * The word bondary assertion.
     * E.g. `\b`, `\B`
     */
    WordBoundaryAssertion = "Assertion",
    /**
     * The character set.
     */
    CharacterSet = "CharacterSet",
    /**
     * The dot.
     * E.g. `.`
     */
    AnyCharacterSet = "CharacterSet",
    /**
     * The character class escape.
     * E.g. `\d`, `\s`, `\w`, `\D`, `\S`, `\W`
     */
    EscapeCharacterSet = "CharacterSet",
    /**
     * The unicode property escape.
     * E.g. `\p{ASCII}`, `\P{ASCII}`, `\p{Script=Hiragana}`
     */
    UnicodePropertyCharacterSet = "CharacterSet",
    /**
     * The character.
     * This includes escape sequences which mean a character.
     * E.g. `a`, `あ`, `✿`, `\x65`, `\u0065`, `\u{65}`, `\/`
     */
    Character = "Character",
    /**
     * The backreference.
     * E.g. `\1`, `\k<name>`
     */
    Backreference = "Backreference",
    /**
     * The flags.
     */
    Flags = "Flags"
}
export declare type EnumKindLookAssertion = EnumKindAssertion.LookaheadAssertion | EnumKindAssertion.LookbehindAssertion;
export declare type EnumKindEdgeAssertion = EnumKindAssertion.EdgeAssertion_Start | EnumKindAssertion.EdgeAssertion_End;
export declare const enum EnumKindAssertion {
    LookaheadAssertion = "lookahead",
    LookbehindAssertion = "lookbehind",
    EdgeAssertion_Start = "start",
    EdgeAssertion_End = "end",
    WordBoundaryAssertion = "word"
}
export declare type EnumKindEscapeCharacterSet = EnumKindCharacterSet.EscapeCharacterSet_Digit | EnumKindCharacterSet.EscapeCharacterSet_Space | EnumKindCharacterSet.EscapeCharacterSet_Word;
export declare const enum EnumKindCharacterSet {
    AnyCharacterSet = "any",
    EscapeCharacterSet_Digit = "digit",
    EscapeCharacterSet_Space = "space",
    EscapeCharacterSet_Word = "word",
    UnicodePropertyCharacterSet = "property"
}
export declare const enum EnumEcmaVersion {
    v5 = 5,
    v2015 = 2015,
    v2016 = 2016,
    v2017 = 2017,
    v2018 = 2018
}
export declare const enum EnumError {
    UnknownError = "UnknownError",
    AssertionError = "AssertionError"
}
declare const _default: typeof import("./const");
export default _default;
