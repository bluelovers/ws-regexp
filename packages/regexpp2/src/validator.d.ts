export declare namespace RegExpValidator {
    /**
     * The options for RegExpValidator construction.
     */
    interface Options {
        /**
         * The flag to disable Annex B syntax. Default is `false`.
         */
        strict?: boolean;
        /**
         * ECMAScript version. Default is `2018`.
         * - `2015` added `u` and `y` flags.
         * - `2018` added `s` flag, Named Capturing Group, Lookbehind Assertion,
         *   and Unicode Property Escape.
         */
        ecmaVersion?: 5 | 2015 | 2016 | 2017 | 2018;
        disableChkCharacterClassRange?: boolean;
        /**
         * A function that is called when the validator entered a RegExp literal.
         * @param start The 0-based index of the first character.
         */
        onLiteralEnter?(start: number): void;
        /**
         * A function that is called when the validator left a RegExp literal.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onLiteralLeave?(start: number, end: number): void;
        /**
         * A function that is called when the validator found flags.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param global `g` flag.
         * @param ignoreCase `i` flag.
         * @param multiline `m` flag.
         * @param unicode `u` flag.
         * @param sticky `y` flag.
         * @param dotAll `s` flag.
         */
        onFlags?(start: number, end: number, global: boolean, ignoreCase: boolean, multiline: boolean, unicode: boolean, sticky: boolean, dotAll: boolean): void;
        /**
         * A function that is called when the validator entered a pattern.
         * @param start The 0-based index of the first character.
         */
        onPatternEnter?(start: number): void;
        /**
         * A function that is called when the validator left a pattern.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onPatternLeave?(start: number, end: number): void;
        /**
         * A function that is called when the validator entered a disjunction.
         * @param start The 0-based index of the first character.
         */
        onDisjunctionEnter?(start: number): void;
        /**
         * A function that is called when the validator left a disjunction.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onDisjunctionLeave?(start: number, end: number): void;
        /**
         * A function that is called when the validator entered an alternative.
         * @param start The 0-based index of the first character.
         * @param index The 0-based index of alternatives in a disjunction.
         */
        onAlternativeEnter?(start: number, index: number): void;
        /**
         * A function that is called when the validator left an alternative.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param index The 0-based index of alternatives in a disjunction.
         */
        onAlternativeLeave?(start: number, end: number, index: number): void;
        /**
         * A function that is called when the validator entered an uncapturing group.
         * @param start The 0-based index of the first character.
         */
        onGroupEnter?(start: number): void;
        /**
         * A function that is called when the validator left an uncapturing group.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         */
        onGroupLeave?(start: number, end: number): void;
        /**
         * A function that is called when the validator entered a capturing group.
         * @param start The 0-based index of the first character.
         * @param name The group name.
         */
        onCapturingGroupEnter?(start: number, name: string | null): void;
        /**
         * A function that is called when the validator left a capturing group.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param name The group name.
         */
        onCapturingGroupLeave?(start: number, end: number, name: string | null): void;
        /**
         * A function that is called when the validator found a quantifier.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param min The minimum number of repeating.
         * @param max The maximum number of repeating.
         * @param greedy The flag to choose the longest matching.
         */
        onQuantifier?(start: number, end: number, min: number, max: number, greedy: boolean): void;
        /**
         * A function that is called when the validator entered a lookahead/lookbehind assertion.
         * @param start The 0-based index of the first character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onLookaroundAssertionEnter?(start: number, kind: "lookahead" | "lookbehind", negate: boolean): void;
        /**
         * A function that is called when the validator left a lookahead/lookbehind assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onLookaroundAssertionLeave?(start: number, end: number, kind: "lookahead" | "lookbehind", negate: boolean): void;
        /**
         * A function that is called when the validator found an edge boundary assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         */
        onEdgeAssertion?(start: number, end: number, kind: "start" | "end"): void;
        /**
         * A function that is called when the validator found a word boundary assertion.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the assertion.
         * @param negate The flag which represents that the assertion is negative.
         */
        onWordBoundaryAssertion?(start: number, end: number, kind: "word", negate: boolean): void;
        /**
         * A function that is called when the validator found a dot.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         */
        onAnyCharacterSet?(start: number, end: number, kind: "any"): void;
        /**
         * A function that is called when the validator found a character set escape.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         * @param negate The flag which represents that the character set is negative.
         */
        onEscapeCharacterSet?(start: number, end: number, kind: "digit" | "space" | "word", negate: boolean): void;
        /**
         * A function that is called when the validator found a Unicode proerty escape.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param kind The kind of the character set.
         * @param key The property name.
         * @param value The property value.
         * @param negate The flag which represents that the character set is negative.
         */
        onUnicodePropertyCharacterSet?(start: number, end: number, kind: "property", key: string, value: string | null, negate: boolean): void;
        /**
         * A function that is called when the validator found a character.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param value The code point of the character.
         */
        onCharacter?(start: number, end: number, value: number): void;
        /**
         * A function that is called when the validator found a backreference.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param ref The key of the referred capturing group.
         */
        onBackreference?(start: number, end: number, ref: number | string): void;
        /**
         * A function that is called when the validator entered a character class.
         * @param start The 0-based index of the first character.
         * @param negate The flag which represents that the character class is negative.
         */
        onCharacterClassEnter?(start: number, negate: boolean): void;
        /**
         * A function that is called when the validator left a character class.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param negate The flag which represents that the character class is negative.
         */
        onCharacterClassLeave?(start: number, end: number, negate: boolean): void;
        /**
         * A function that is called when the validator found a character class range.
         * @param start The 0-based index of the first character.
         * @param end The next 0-based index of the last character.
         * @param min The minimum code point of the range.
         * @param max The maximum code point of the range.
         */
        onCharacterClassRange?(start: number, end: number, min: number, max: number): void;
    }
}
/**
 * The regular expression validator.
 */
export declare class RegExpValidator {
    private readonly _options;
    private readonly _reader;
    private _uFlag;
    private _nFlag;
    private _lastIntValue;
    private _lastMinValue;
    private _lastMaxValue;
    private _lastStrValue;
    private _lastKeyValue;
    private _lastValValue;
    private _lastAssertionIsQuantifiable;
    private _numCapturingParens;
    private _groupNames;
    private _backreferenceNames;
    /**
     * Initialize this validator.
     * @param options The options of validator.
     */
    constructor(options?: RegExpValidator.Options);
    /**
     * Validate a regular expression literal. E.g. "/abc/g"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    validateLiteral(source: string, start?: number, end?: number): void;
    /**
     * Validate a regular expression flags. E.g. "gim"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    validateFlags(source: string, start?: number, end?: number): void;
    /**
     * Validate a regular expression pattern. E.g. "abc"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     */
    validatePattern(source: string, start?: number, end?: number, uFlag?: boolean): void;
    private get strict();
    private get ecmaVersion();
    private onLiteralEnter;
    private onLiteralLeave;
    private onFlags;
    private onPatternEnter;
    private onPatternLeave;
    private onDisjunctionEnter;
    private onDisjunctionLeave;
    private onAlternativeEnter;
    private onAlternativeLeave;
    private onGroupEnter;
    private onGroupLeave;
    private onCapturingGroupEnter;
    private onCapturingGroupLeave;
    private onQuantifier;
    private onLookaroundAssertionEnter;
    private onLookaroundAssertionLeave;
    private onEdgeAssertion;
    private onWordBoundaryAssertion;
    private onAnyCharacterSet;
    private onEscapeCharacterSet;
    private onUnicodePropertyCharacterSet;
    private onCharacter;
    private onBackreference;
    private onCharacterClassEnter;
    private onCharacterClassLeave;
    private onCharacterClassRange;
    private get source();
    private get index();
    private get currentCodePoint();
    private get nextCodePoint();
    private get nextCodePoint2();
    private get nextCodePoint3();
    private reset;
    private rewind;
    private advance;
    private eat;
    private eat2;
    private eat3;
    private raise;
    private eatRegExpBody;
    private pattern;
    private countCapturingParens;
    private disjunction;
    private alternative;
    private eatTerm;
    private eatAssertion;
    private eatQuantifier;
    private eatBracedQuantifier;
    private eatAtom;
    private eatDot;
    private eatReverseSolidusAtomEscape;
    private eatUncapturingGroup;
    private eatCapturingGroup;
    private eatExtendedAtom;
    private eatReverseSolidusFollowedByC;
    private eatInvalidBracedQuantifier;
    private eatSyntaxCharacter;
    private eatPatternCharacter;
    private eatExtendedPatternCharacter;
    private groupSpecifier;
    private eatGroupName;
    private eatRegExpIdentifierName;
    private eatRegExpIdentifierStart;
    private eatRegExpIdentifierPart;
    private eatAtomEscape;
    private eatBackreference;
    private eatKGroupName;
    private eatCharacterEscape;
    private eatCControlLetter;
    private eatZero;
    private eatControlEscape;
    private eatControlLetter;
    private eatRegExpUnicodeEscapeSequence;
    private eatIdentityEscape;
    private isValidIdentityEscape;
    private eatDecimalEscape;
    private eatCharacterClassEscape;
    private eatUnicodePropertyValueExpression;
    private eatUnicodePropertyName;
    private eatUnicodePropertyValue;
    private eatLoneUnicodePropertyNameOrValue;
    private eatCharacterClass;
    private classRanges;
    private eatClassAtom;
    private eatClassEscape;
    private eatClassControlLetter;
    private eatHexEscapeSequence;
    private eatDecimalDigits;
    private eatHexDigits;
    private eatLegacyOctalEscapeSequence;
    private eatOctalDigit;
    private eatFixedHexDigits;
}
