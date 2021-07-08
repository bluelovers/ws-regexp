"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpValidator = void 0;
const reader_1 = require("./reader");
const regexp_syntax_error_1 = require("./regexp-syntax-error");
const unicode_1 = require("./unicode");
function isSyntaxCharacter(cp) {
    return (cp === unicode_1.CircumflexAccent ||
        cp === unicode_1.DollarSign ||
        cp === unicode_1.ReverseSolidus ||
        cp === unicode_1.FullStop ||
        cp === unicode_1.Asterisk ||
        cp === unicode_1.PlusSign ||
        cp === unicode_1.QuestionMark ||
        cp === unicode_1.LeftParenthesis ||
        cp === unicode_1.RightParenthesis ||
        cp === unicode_1.LeftSquareBracket ||
        cp === unicode_1.RightSquareBracket ||
        cp === unicode_1.LeftCurlyBracket ||
        cp === unicode_1.RightCurlyBracket ||
        cp === unicode_1.VerticalLine);
}
function isRegExpIdentifierStart(cp) {
    return (0, unicode_1.isIdStart)(cp) || cp === unicode_1.DollarSign || cp === unicode_1.LowLine;
}
function isRegExpIdentifierPart(cp) {
    return ((0, unicode_1.isIdContinue)(cp) ||
        cp === unicode_1.DollarSign ||
        cp === unicode_1.LowLine ||
        cp === unicode_1.ZeroWidthNonJoiner ||
        cp === unicode_1.ZeroWidthJoiner);
}
function isUnicodePropertyNameCharacter(cp) {
    return (0, unicode_1.isLatinLetter)(cp) || cp === unicode_1.LowLine;
}
function isUnicodePropertyValueCharacter(cp) {
    return isUnicodePropertyNameCharacter(cp) || (0, unicode_1.isDecimalDigit)(cp);
}
function isValidUnicodeProperty(name, value) {
    //eslint-disable-next-line no-prototype-builtins
    return unicode_1.PropertyData.hasOwnProperty(name) && unicode_1.PropertyData[name].has(value);
}
function isValidUnicodePropertyName(name) {
    return unicode_1.PropertyData.$LONE.has(name);
}
/**
 * The regular expression validator.
 */
class RegExpValidator {
    /**
     * Initialize this validator.
     * @param options The options of validator.
     */
    constructor(options) {
        this._reader = new reader_1.Reader();
        this._uFlag = false;
        this._nFlag = false;
        this._lastIntValue = 0;
        this._lastMinValue = 0;
        this._lastMaxValue = 0;
        this._lastStrValue = "";
        this._lastKeyValue = "";
        this._lastValValue = "";
        this._lastAssertionIsQuantifiable = false;
        this._numCapturingParens = 0;
        this._groupNames = new Set();
        this._backreferenceNames = new Set();
        this._options = options || {};
    }
    /**
     * Validate a regular expression literal. E.g. "/abc/g"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    validateLiteral(source, start = 0, end = source.length) {
        this._uFlag = this._nFlag = false;
        this.reset(source, start, end);
        this.onLiteralEnter(start);
        if (this.eat(unicode_1.Solidus) && this.eatRegExpBody() && this.eat(unicode_1.Solidus)) {
            const flagStart = this.index;
            const uFlag = source.indexOf("u", flagStart) !== -1;
            this.validateFlags(source, flagStart, end);
            this.validatePattern(source, start + 1, flagStart - 1, uFlag);
        }
        else if (start >= end) {
            this.raise("Empty");
        }
        else {
            const c = String.fromCodePoint(this.currentCodePoint);
            this.raise(`Unexpected character '${c}'`);
        }
        this.onLiteralLeave(start, end);
    }
    /**
     * Validate a regular expression flags. E.g. "gim"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     */
    validateFlags(source, start = 0, end = source.length) {
        const existingFlags = new Set();
        let global = false;
        let ignoreCase = false;
        let multiline = false;
        let sticky = false;
        let unicode = false;
        let dotAll = false;
        for (let i = start; i < end; ++i) {
            const flag = source.charCodeAt(i);
            if (existingFlags.has(flag)) {
                this.raise(`Duplicated flag '${source[i]}'`);
            }
            existingFlags.add(flag);
            if (flag === unicode_1.LatinSmallLetterG) {
                global = true;
            }
            else if (flag === unicode_1.LatinSmallLetterI) {
                ignoreCase = true;
            }
            else if (flag === unicode_1.LatinSmallLetterM) {
                multiline = true;
            }
            else if (flag === unicode_1.LatinSmallLetterU && this.ecmaVersion >= 2015) {
                unicode = true;
            }
            else if (flag === unicode_1.LatinSmallLetterY && this.ecmaVersion >= 2015) {
                sticky = true;
            }
            else if (flag === unicode_1.LatinSmallLetterS && this.ecmaVersion >= 2018) {
                dotAll = true;
            }
            else {
                this.raise(`Invalid flag '${source[i]}'`);
            }
        }
        this.onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll);
    }
    /**
     * Validate a regular expression pattern. E.g. "abc"
     * @param source The source code to validate.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     */
    validatePattern(source, start = 0, end = source.length, uFlag = false) {
        this._uFlag = uFlag && this.ecmaVersion >= 2015;
        this._nFlag = uFlag && this.ecmaVersion >= 2018;
        this.reset(source, start, end);
        this.pattern();
        if (!this._nFlag &&
            this.ecmaVersion >= 2018 &&
            this._groupNames.size > 0) {
            this._nFlag = true;
            this.rewind(start);
            this.pattern();
        }
    }
    // #region Delegate for Options
    get strict() {
        return Boolean(this._options.strict || this._uFlag);
    }
    get ecmaVersion() {
        return this._options.ecmaVersion || 2018;
    }
    onLiteralEnter(start) {
        if (this._options.onLiteralEnter) {
            this._options.onLiteralEnter(start);
        }
    }
    onLiteralLeave(start, end) {
        if (this._options.onLiteralLeave) {
            this._options.onLiteralLeave(start, end);
        }
    }
    onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll) {
        if (this._options.onFlags) {
            this._options.onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll);
        }
    }
    onPatternEnter(start) {
        if (this._options.onPatternEnter) {
            this._options.onPatternEnter(start);
        }
    }
    onPatternLeave(start, end) {
        if (this._options.onPatternLeave) {
            this._options.onPatternLeave(start, end);
        }
    }
    onDisjunctionEnter(start) {
        if (this._options.onDisjunctionEnter) {
            this._options.onDisjunctionEnter(start);
        }
    }
    onDisjunctionLeave(start, end) {
        if (this._options.onDisjunctionLeave) {
            this._options.onDisjunctionLeave(start, end);
        }
    }
    onAlternativeEnter(start, index) {
        if (this._options.onAlternativeEnter) {
            this._options.onAlternativeEnter(start, index);
        }
    }
    onAlternativeLeave(start, end, index) {
        if (this._options.onAlternativeLeave) {
            this._options.onAlternativeLeave(start, end, index);
        }
    }
    onGroupEnter(start) {
        if (this._options.onGroupEnter) {
            this._options.onGroupEnter(start);
        }
    }
    onGroupLeave(start, end) {
        if (this._options.onGroupLeave) {
            this._options.onGroupLeave(start, end);
        }
    }
    onCapturingGroupEnter(start, name) {
        if (this._options.onCapturingGroupEnter) {
            this._options.onCapturingGroupEnter(start, name);
        }
    }
    onCapturingGroupLeave(start, end, name) {
        if (this._options.onCapturingGroupLeave) {
            this._options.onCapturingGroupLeave(start, end, name);
        }
    }
    onQuantifier(start, end, min, max, greedy) {
        if (this._options.onQuantifier) {
            this._options.onQuantifier(start, end, min, max, greedy);
        }
    }
    onLookaroundAssertionEnter(start, kind, negate) {
        if (this._options.onLookaroundAssertionEnter) {
            this._options.onLookaroundAssertionEnter(start, kind, negate);
        }
    }
    onLookaroundAssertionLeave(start, end, kind, negate) {
        if (this._options.onLookaroundAssertionLeave) {
            this._options.onLookaroundAssertionLeave(start, end, kind, negate);
        }
    }
    onEdgeAssertion(start, end, kind) {
        if (this._options.onEdgeAssertion) {
            this._options.onEdgeAssertion(start, end, kind);
        }
    }
    onWordBoundaryAssertion(start, end, kind, negate) {
        if (this._options.onWordBoundaryAssertion) {
            this._options.onWordBoundaryAssertion(start, end, kind, negate);
        }
    }
    onAnyCharacterSet(start, end, kind) {
        if (this._options.onAnyCharacterSet) {
            this._options.onAnyCharacterSet(start, end, kind);
        }
    }
    onEscapeCharacterSet(start, end, kind, negate) {
        if (this._options.onEscapeCharacterSet) {
            this._options.onEscapeCharacterSet(start, end, kind, negate);
        }
    }
    onUnicodePropertyCharacterSet(start, end, kind, key, value, negate) {
        if (this._options.onUnicodePropertyCharacterSet) {
            this._options.onUnicodePropertyCharacterSet(start, end, kind, key, value, negate);
        }
    }
    onCharacter(start, end, value) {
        if (this._options.onCharacter) {
            this._options.onCharacter(start, end, value);
        }
    }
    onBackreference(start, end, ref) {
        if (this._options.onBackreference) {
            this._options.onBackreference(start, end, ref);
        }
    }
    onCharacterClassEnter(start, negate) {
        if (this._options.onCharacterClassEnter) {
            this._options.onCharacterClassEnter(start, negate);
        }
    }
    onCharacterClassLeave(start, end, negate) {
        if (this._options.onCharacterClassLeave) {
            this._options.onCharacterClassLeave(start, end, negate);
        }
    }
    onCharacterClassRange(start, end, min, max) {
        if (this._options.onCharacterClassRange) {
            this._options.onCharacterClassRange(start, end, min, max);
        }
    }
    // #endregion
    // #region Delegate for Reader
    get source() {
        return this._reader.source;
    }
    get index() {
        return this._reader.index;
    }
    get currentCodePoint() {
        return this._reader.currentCodePoint;
    }
    get nextCodePoint() {
        return this._reader.nextCodePoint;
    }
    get nextCodePoint2() {
        return this._reader.nextCodePoint2;
    }
    get nextCodePoint3() {
        return this._reader.nextCodePoint3;
    }
    reset(source, start, end) {
        this._reader.reset(source, start, end, this._uFlag);
    }
    rewind(index) {
        this._reader.rewind(index);
    }
    advance() {
        this._reader.advance();
    }
    eat(cp) {
        return this._reader.eat(cp);
    }
    eat2(cp1, cp2) {
        return this._reader.eat2(cp1, cp2);
    }
    eat3(cp1, cp2, cp3) {
        return this._reader.eat3(cp1, cp2, cp3);
    }
    // #endregion
    raise(message) {
        throw new regexp_syntax_error_1.RegExpSyntaxError(this.source, this._uFlag, this.index, message);
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-RegularExpressionBody
    eatRegExpBody() {
        const start = this.index;
        let inClass = false;
        let escaped = false;
        for (;;) {
            const cp = this.currentCodePoint;
            if (cp === -1 || (0, unicode_1.isLineTerminator)(cp)) {
                const kind = inClass ? "character class" : "regular expression";
                this.raise(`Unterminated ${kind}`);
            }
            if (escaped) {
                escaped = false;
            }
            else if (cp === unicode_1.ReverseSolidus) {
                escaped = true;
            }
            else if (cp === unicode_1.LeftSquareBracket) {
                inClass = true;
            }
            else if (cp === unicode_1.RightSquareBracket) {
                inClass = false;
            }
            else if ((cp === unicode_1.Solidus && !inClass) ||
                (cp === unicode_1.Asterisk && this.index === start)) {
                break;
            }
            this.advance();
        }
        return this.index !== start;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
    pattern() {
        const start = this.index;
        this._numCapturingParens = this.countCapturingParens();
        this._groupNames.clear();
        this._backreferenceNames.clear();
        this.onPatternEnter(start);
        this.disjunction();
        const cp = this.currentCodePoint;
        if (this.currentCodePoint !== -1) {
            if (cp === unicode_1.RightParenthesis) {
                this.raise("Unmatched ')'");
            }
            if (cp === unicode_1.ReverseSolidus) {
                this.raise("\\ at end of pattern");
            }
            if (cp === unicode_1.RightSquareBracket || cp === unicode_1.RightCurlyBracket) {
                this.raise("Lone quantifier brackets");
            }
            const c = String.fromCodePoint(cp);
            this.raise(`Unexpected character '${c}'`);
        }
        for (const name of this._backreferenceNames) {
            if (!this._groupNames.has(name)) {
                this.raise("Invalid named capture referenced");
            }
        }
        this.onPatternLeave(start, this.index);
    }
    countCapturingParens() {
        const start = this.index;
        let inClass = false;
        let escaped = false;
        let count = 0;
        let cp = 0;
        while ((cp = this.currentCodePoint) !== -1) {
            if (escaped) {
                escaped = false;
            }
            else if (cp === unicode_1.ReverseSolidus) {
                escaped = true;
            }
            else if (cp === unicode_1.LeftSquareBracket) {
                inClass = true;
            }
            else if (cp === unicode_1.RightSquareBracket) {
                inClass = false;
            }
            else if (cp === unicode_1.LeftParenthesis &&
                !inClass &&
                (this.nextCodePoint !== unicode_1.QuestionMark ||
                    (this.nextCodePoint2 === unicode_1.LessThanSign &&
                        this.nextCodePoint3 !== unicode_1.EqualsSign &&
                        this.nextCodePoint3 !== unicode_1.ExclamationMark))) {
                count += 1;
            }
            this.advance();
        }
        this.rewind(start);
        return count;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
    disjunction() {
        const start = this.index;
        let i = 0;
        this.onDisjunctionEnter(start);
        this.alternative(i++);
        while (this.eat(unicode_1.VerticalLine)) {
            this.alternative(i++);
        }
        if (this.eatQuantifier(true)) {
            this.raise("Nothing to repeat");
        }
        if (this.eat(unicode_1.LeftCurlyBracket)) {
            this.raise("Lone quantifier brackets");
        }
        this.onDisjunctionLeave(start, this.index);
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
    alternative(i) {
        const start = this.index;
        this.onAlternativeEnter(start, i);
        while (this.currentCodePoint !== -1 && this.eatTerm()) {
            // do nothing.
        }
        this.onAlternativeLeave(start, this.index, i);
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-Term
    eatTerm() {
        if (this.eatAssertion()) {
            // Handle `QuantifiableAssertion Quantifier` alternative.
            // `this.lastAssertionIsQuantifiable` is true if the last eaten
            // Assertion is a QuantifiableAssertion.
            if (this._lastAssertionIsQuantifiable) {
                this.eatQuantifier();
            }
            return true;
        }
        if (this.strict ? this.eatAtom() : this.eatExtendedAtom()) {
            this.eatQuantifier();
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-Assertion
    eatAssertion() {
        const start = this.index;
        this._lastAssertionIsQuantifiable = false;
        // ^, $, \B \b
        if (this.eat(unicode_1.CircumflexAccent)) {
            this.onEdgeAssertion(start, this.index, "start");
            return true;
        }
        if (this.eat(unicode_1.DollarSign)) {
            this.onEdgeAssertion(start, this.index, "end");
            return true;
        }
        if (this.eat2(unicode_1.ReverseSolidus, unicode_1.LatinCapitalLetterB)) {
            this.onWordBoundaryAssertion(start, this.index, "word", true);
            return true;
        }
        if (this.eat2(unicode_1.ReverseSolidus, unicode_1.LatinSmallLetterB)) {
            this.onWordBoundaryAssertion(start, this.index, "word", false);
            return true;
        }
        // Lookahead / Lookbehind
        if (this.eat2(unicode_1.LeftParenthesis, unicode_1.QuestionMark)) {
            const lookbehind = this.ecmaVersion >= 2018 && this.eat(unicode_1.LessThanSign);
            let negate = false;
            if (this.eat(unicode_1.EqualsSign) || (negate = this.eat(unicode_1.ExclamationMark))) {
                const kind = lookbehind ? "lookbehind" : "lookahead";
                this.onLookaroundAssertionEnter(start, kind, negate);
                this.disjunction();
                if (!this.eat(unicode_1.RightParenthesis)) {
                    this.raise("Unterminated group");
                }
                this._lastAssertionIsQuantifiable = !lookbehind && !this.strict;
                this.onLookaroundAssertionLeave(start, this.index, kind, negate);
                return true;
            }
            this.rewind(start);
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
    // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
    eatQuantifier(noError = false) {
        const start = this.index;
        let min = 0;
        let max = 0;
        let greedy = false;
        if (this.eat(unicode_1.Asterisk)) {
            min = 0;
            max = Number.POSITIVE_INFINITY;
        }
        else if (this.eat(unicode_1.PlusSign)) {
            min = 1;
            max = Number.POSITIVE_INFINITY;
        }
        else if (this.eat(unicode_1.QuestionMark)) {
            min = 0;
            max = 1;
        }
        else if (this.eatBracedQuantifier(noError)) {
            min = this._lastMinValue;
            max = this._lastMaxValue;
        }
        else {
            return false;
        }
        greedy = !this.eat(unicode_1.QuestionMark);
        if (!noError) {
            this.onQuantifier(start, this.index, min, max, greedy);
        }
        return true;
    }
    eatBracedQuantifier(noError) {
        const start = this.index;
        if (this.eat(unicode_1.LeftCurlyBracket)) {
            this._lastMinValue = 0;
            this._lastMaxValue = Number.POSITIVE_INFINITY;
            if (this.eatDecimalDigits()) {
                this._lastMinValue = this._lastMaxValue = this._lastIntValue;
                if (this.eat(unicode_1.Comma)) {
                    this._lastMaxValue = this.eatDecimalDigits()
                        ? this._lastIntValue
                        : Number.POSITIVE_INFINITY;
                }
                if (this.eat(unicode_1.RightCurlyBracket)) {
                    if (!noError && this._lastMaxValue < this._lastMinValue) {
                        this.raise("numbers out of order in {} quantifier");
                    }
                    return true;
                }
            }
            if (!noError && this.strict) {
                this.raise("Incomplete quantifier");
            }
            this.rewind(start);
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
    eatAtom() {
        return (this.eatPatternCharacter() ||
            this.eatDot() ||
            this.eatReverseSolidusAtomEscape() ||
            this.eatCharacterClass() ||
            this.eatUncapturingGroup() ||
            this.eatCapturingGroup());
    }
    eatDot() {
        if (this.eat(unicode_1.FullStop)) {
            this.onAnyCharacterSet(this.index - 1, this.index, "any");
            return true;
        }
        return false;
    }
    eatReverseSolidusAtomEscape() {
        const start = this.index;
        if (this.eat(unicode_1.ReverseSolidus)) {
            if (this.eatAtomEscape()) {
                return true;
            }
            this.rewind(start);
        }
        return false;
    }
    eatUncapturingGroup() {
        const start = this.index;
        if (this.eat3(unicode_1.LeftParenthesis, unicode_1.QuestionMark, unicode_1.Colon)) {
            this.onGroupEnter(start);
            this.disjunction();
            if (!this.eat(unicode_1.RightParenthesis)) {
                this.raise("Unterminated group");
            }
            this.onGroupLeave(start, this.index);
            return true;
        }
        return false;
    }
    eatCapturingGroup() {
        const start = this.index;
        if (this.eat(unicode_1.LeftParenthesis)) {
            this._lastStrValue = "";
            if (this.ecmaVersion >= 2018) {
                this.groupSpecifier();
            }
            else if (this.currentCodePoint === unicode_1.QuestionMark) {
                this.raise("Invalid group");
            }
            const name = this._lastStrValue || null;
            this.onCapturingGroupEnter(start, name);
            this.disjunction();
            if (!this.eat(unicode_1.RightParenthesis)) {
                this.raise("Unterminated group");
            }
            this.onCapturingGroupLeave(start, this.index, name);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ExtendedAtom
    eatExtendedAtom() {
        return (this.eatDot() ||
            this.eatReverseSolidusAtomEscape() ||
            this.eatReverseSolidusFollowedByC() ||
            this.eatCharacterClass() ||
            this.eatUncapturingGroup() ||
            this.eatCapturingGroup() ||
            this.eatInvalidBracedQuantifier() ||
            this.eatExtendedPatternCharacter());
    }
    // \ [lookahead = c]
    eatReverseSolidusFollowedByC() {
        if (this.currentCodePoint === unicode_1.ReverseSolidus &&
            this.nextCodePoint === unicode_1.LatinSmallLetterC) {
            this._lastIntValue = this.currentCodePoint;
            this.advance();
            this.onCharacter(this.index - 1, this.index, unicode_1.ReverseSolidus);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-InvalidBracedQuantifier
    eatInvalidBracedQuantifier() {
        if (this.eatBracedQuantifier(true)) {
            this.raise("Nothing to repeat");
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
    eatSyntaxCharacter() {
        if (isSyntaxCharacter(this.currentCodePoint)) {
            this._lastIntValue = this.currentCodePoint;
            this.advance();
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
    eatPatternCharacter() {
        const start = this.index;
        const cp = this.currentCodePoint;
        if (cp !== -1 && !isSyntaxCharacter(cp)) {
            this.advance();
            this.onCharacter(start, this.index, cp);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ExtendedPatternCharacter
    eatExtendedPatternCharacter() {
        const start = this.index;
        const cp = this.currentCodePoint;
        if (cp !== -1 &&
            cp !== unicode_1.CircumflexAccent &&
            cp !== unicode_1.DollarSign &&
            cp !== unicode_1.ReverseSolidus &&
            cp !== unicode_1.FullStop &&
            cp !== unicode_1.Asterisk &&
            cp !== unicode_1.PlusSign &&
            cp !== unicode_1.QuestionMark &&
            cp !== unicode_1.LeftParenthesis &&
            cp !== unicode_1.RightParenthesis &&
            cp !== unicode_1.LeftSquareBracket &&
            cp !== unicode_1.VerticalLine) {
            this.advance();
            this.onCharacter(start, this.index, cp);
            return true;
        }
        return false;
    }
    // GroupSpecifier[U] ::
    //   [empty]
    //   `?` GroupName[?U]
    groupSpecifier() {
        this._lastStrValue = "";
        if (this.eat(unicode_1.QuestionMark)) {
            if (this.eatGroupName()) {
                if (!this._groupNames.has(this._lastStrValue)) {
                    this._groupNames.add(this._lastStrValue);
                    return;
                }
                this.raise("Duplicate capture group name");
            }
            this.raise("Invalid group");
        }
    }
    // GroupName[U] ::
    //   `<` RegExpIdentifierName[?U] `>`
    eatGroupName() {
        this._lastStrValue = "";
        if (this.eat(unicode_1.LessThanSign)) {
            if (this.eatRegExpIdentifierName() && this.eat(unicode_1.GreaterThanSign)) {
                return true;
            }
            this.raise("Invalid capture group name");
        }
        return false;
    }
    // RegExpIdentifierName[U] ::
    //   RegExpIdentifierStart[?U]
    //   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
    eatRegExpIdentifierName() {
        this._lastStrValue = "";
        if (this.eatRegExpIdentifierStart()) {
            this._lastStrValue += String.fromCodePoint(this._lastIntValue);
            while (this.eatRegExpIdentifierPart()) {
                this._lastStrValue += String.fromCodePoint(this._lastIntValue);
            }
            return true;
        }
        return false;
    }
    // RegExpIdentifierStart[U] ::
    //   UnicodeIDStart
    //   `$`
    //   `_`
    //   `\` RegExpUnicodeEscapeSequence[?U]
    eatRegExpIdentifierStart() {
        const start = this.index;
        let cp = this.currentCodePoint;
        this.advance();
        if (cp === unicode_1.ReverseSolidus && this.eatRegExpUnicodeEscapeSequence()) {
            cp = this._lastIntValue;
        }
        if (isRegExpIdentifierStart(cp)) {
            this._lastIntValue = cp;
            return true;
        }
        if (this.index !== start) {
            this.rewind(start);
        }
        return false;
    }
    // RegExpIdentifierPart[U] ::
    //   UnicodeIDContinue
    //   `$`
    //   `_`
    //   `\` RegExpUnicodeEscapeSequence[?U]
    //   <Zwnj>
    //   <Zwj>
    eatRegExpIdentifierPart() {
        const start = this.index;
        let cp = this.currentCodePoint;
        this.advance();
        if (cp === unicode_1.ReverseSolidus && this.eatRegExpUnicodeEscapeSequence()) {
            cp = this._lastIntValue;
        }
        if (isRegExpIdentifierPart(cp)) {
            this._lastIntValue = cp;
            return true;
        }
        if (this.index !== start) {
            this.rewind(start);
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-AtomEscape
    eatAtomEscape() {
        if (this.eatBackreference() ||
            this.eatCharacterClassEscape() ||
            this.eatCharacterEscape() ||
            (this._nFlag && this.eatKGroupName())) {
            return true;
        }
        if (this.strict || this._uFlag) {
            this.raise("Invalid escape");
        }
        return false;
    }
    eatBackreference() {
        const start = this.index;
        if (this.eatDecimalEscape()) {
            const n = this._lastIntValue;
            if (n <= this._numCapturingParens) {
                this.onBackreference(start - 1, this.index, n);
                return true;
            }
            if (this.strict) {
                this.raise("Invalid escape");
            }
            this.rewind(start);
        }
        return false;
    }
    eatKGroupName() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterK)) {
            if (this.eatGroupName()) {
                const groupName = this._lastStrValue;
                this._backreferenceNames.add(groupName);
                this.onBackreference(start - 1, this.index, groupName);
                return true;
            }
            this.raise("Invalid named reference");
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-CharacterEscape
    eatCharacterEscape() {
        const start = this.index;
        if (this.eatControlEscape() ||
            this.eatCControlLetter() ||
            this.eatZero() ||
            this.eatHexEscapeSequence() ||
            this.eatRegExpUnicodeEscapeSequence() ||
            (!this.strict && this.eatLegacyOctalEscapeSequence()) ||
            this.eatIdentityEscape()) {
            this.onCharacter(start - 1, this.index, this._lastIntValue);
            return true;
        }
        return false;
    }
    eatCControlLetter() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterC)) {
            if (this.eatControlLetter()) {
                return true;
            }
            this.rewind(start);
        }
        return false;
    }
    eatZero() {
        if (this.currentCodePoint === unicode_1.DigitZero &&
            !(0, unicode_1.isDecimalDigit)(this.nextCodePoint)) {
            this._lastIntValue = 0;
            this.advance();
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
    eatControlEscape() {
        if (this.eat(unicode_1.LatinSmallLetterT)) {
            this._lastIntValue = unicode_1.CharacterTabulation;
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterN)) {
            this._lastIntValue = unicode_1.LineFeed;
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterV)) {
            this._lastIntValue = unicode_1.LineTabulation;
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterF)) {
            this._lastIntValue = unicode_1.FormFeed;
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterR)) {
            this._lastIntValue = unicode_1.CarriageReturn;
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
    eatControlLetter() {
        const cp = this.currentCodePoint;
        if ((0, unicode_1.isLatinLetter)(cp)) {
            this.advance();
            this._lastIntValue = cp % 0x20;
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
    //eslint-disable-next-line complexity
    eatRegExpUnicodeEscapeSequence() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterU)) {
            if (this.eatFixedHexDigits(4)) {
                const lead = this._lastIntValue;
                if (this._uFlag && lead >= 0xd800 && lead <= 0xdbff) {
                    const leadSurrogateEnd = this.index;
                    if (this.eat(unicode_1.ReverseSolidus) &&
                        this.eat(unicode_1.LatinSmallLetterU) &&
                        this.eatFixedHexDigits(4)) {
                        const trail = this._lastIntValue;
                        if (trail >= 0xdc00 && trail <= 0xdfff) {
                            this._lastIntValue =
                                (lead - 0xd800) * 0x400 +
                                    (trail - 0xdc00) +
                                    0x10000;
                            return true;
                        }
                    }
                    this.rewind(leadSurrogateEnd);
                    this._lastIntValue = lead;
                }
                return true;
            }
            if (this._uFlag &&
                this.eat(unicode_1.LeftCurlyBracket) &&
                this.eatHexDigits() &&
                this.eat(unicode_1.RightCurlyBracket) &&
                (0, unicode_1.isValidUnicode)(this._lastIntValue)) {
                return true;
            }
            if (this.strict || this._uFlag) {
                this.raise("Invalid unicode escape");
            }
            this.rewind(start);
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-IdentityEscape
    eatIdentityEscape() {
        if (this._uFlag) {
            if (this.eatSyntaxCharacter()) {
                return true;
            }
            if (this.eat(unicode_1.Solidus)) {
                this._lastIntValue = unicode_1.Solidus;
                return true;
            }
            return false;
        }
        if (this.isValidIdentityEscape(this.currentCodePoint)) {
            this._lastIntValue = this.currentCodePoint;
            this.advance();
            return true;
        }
        return false;
    }
    isValidIdentityEscape(cp) {
        if (cp === -1) {
            return false;
        }
        if (this.strict) {
            return !(0, unicode_1.isIdContinue)(cp);
        }
        return (cp !== unicode_1.LatinSmallLetterC &&
            (!this._nFlag || cp !== unicode_1.LatinSmallLetterK));
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
    eatDecimalEscape() {
        this._lastIntValue = 0;
        let cp = this.currentCodePoint;
        if (cp >= unicode_1.DigitOne && cp <= unicode_1.DigitNine) {
            do {
                this._lastIntValue = 10 * this._lastIntValue + (cp - unicode_1.DigitZero);
                this.advance();
            } while ((cp = this.currentCodePoint) >= unicode_1.DigitZero &&
                cp <= unicode_1.DigitNine);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
    eatCharacterClassEscape() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterD)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "digit", false);
            return true;
        }
        if (this.eat(unicode_1.LatinCapitalLetterD)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "digit", true);
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterS)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "space", false);
            return true;
        }
        if (this.eat(unicode_1.LatinCapitalLetterS)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "space", true);
            return true;
        }
        if (this.eat(unicode_1.LatinSmallLetterW)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "word", false);
            return true;
        }
        if (this.eat(unicode_1.LatinCapitalLetterW)) {
            this._lastIntValue = -1;
            this.onEscapeCharacterSet(start - 1, this.index, "word", true);
            return true;
        }
        let negate = false;
        if (this._uFlag &&
            this.ecmaVersion >= 2018 &&
            (this.eat(unicode_1.LatinSmallLetterP) ||
                (negate = this.eat(unicode_1.LatinCapitalLetterP)))) {
            this._lastIntValue = -1;
            if (this.eat(unicode_1.LeftCurlyBracket) &&
                this.eatUnicodePropertyValueExpression() &&
                this.eat(unicode_1.RightCurlyBracket)) {
                this.onUnicodePropertyCharacterSet(start - 1, this.index, "property", this._lastKeyValue, this._lastValValue || null, negate);
                return true;
            }
            this.raise("Invalid property name");
        }
        return false;
    }
    // UnicodePropertyValueExpression ::
    //   UnicodePropertyName `=` UnicodePropertyValue
    //   LoneUnicodePropertyNameOrValue
    eatUnicodePropertyValueExpression() {
        const start = this.index;
        // UnicodePropertyName `=` UnicodePropertyValue
        if (this.eatUnicodePropertyName() && this.eat(unicode_1.EqualsSign)) {
            this._lastKeyValue = this._lastStrValue;
            if (this.eatUnicodePropertyValue()) {
                this._lastValValue = this._lastStrValue;
                if (isValidUnicodeProperty(this._lastKeyValue, this._lastValValue)) {
                    return true;
                }
                this.raise("Invalid property name");
            }
        }
        this.rewind(start);
        // LoneUnicodePropertyNameOrValue
        if (this.eatLoneUnicodePropertyNameOrValue()) {
            const nameOrValue = this._lastStrValue;
            if (isValidUnicodeProperty("General_Category", nameOrValue)) {
                this._lastKeyValue = "General_Category";
                this._lastValValue = nameOrValue;
                return true;
            }
            if (isValidUnicodePropertyName(nameOrValue)) {
                this._lastKeyValue = nameOrValue;
                this._lastValValue = "";
                return true;
            }
            this.raise("Invalid property name");
        }
        return false;
    }
    // UnicodePropertyName ::
    //   UnicodePropertyNameCharacters
    eatUnicodePropertyName() {
        this._lastStrValue = "";
        while (isUnicodePropertyNameCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint);
            this.advance();
        }
        return this._lastStrValue !== "";
    }
    // UnicodePropertyValue ::
    //   UnicodePropertyValueCharacters
    eatUnicodePropertyValue() {
        this._lastStrValue = "";
        while (isUnicodePropertyValueCharacter(this.currentCodePoint)) {
            this._lastStrValue += String.fromCodePoint(this.currentCodePoint);
            this.advance();
        }
        return this._lastStrValue !== "";
    }
    // LoneUnicodePropertyNameOrValue ::
    //   UnicodePropertyValueCharacters
    eatLoneUnicodePropertyNameOrValue() {
        return this.eatUnicodePropertyValue();
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
    eatCharacterClass() {
        const start = this.index;
        if (this.eat(unicode_1.LeftSquareBracket)) {
            const negate = this.eat(unicode_1.CircumflexAccent);
            this.onCharacterClassEnter(start, negate);
            this.classRanges();
            if (!this.eat(unicode_1.RightSquareBracket)) {
                this.raise("Unterminated character class");
            }
            this.onCharacterClassLeave(start, this.index, negate);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
    // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
    // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
    classRanges() {
        let start = this.index;
        while (this.eatClassAtom()) {
            const left = this._lastIntValue;
            const hyphenStart = this.index;
            if (this.eat(unicode_1.HyphenMinus)) {
                this.onCharacter(hyphenStart, this.index, unicode_1.HyphenMinus);
                if (this.eatClassAtom()) {
                    const right = this._lastIntValue;
                    if (left === -1 || right === -1) {
                        if (this.strict) {
                            this.raise("Invalid character class");
                        }
                    }
                    else if (!this._options.disableChkCharacterClassRange && left > right) {
                        this.raise("Range out of order in character class");
                    }
                    else {
                        this.onCharacterClassRange(start, this.index, left, right);
                    }
                }
            }
            start = this.index;
        }
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
    // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
    eatClassAtom() {
        const start = this.index;
        if (this.eat(unicode_1.ReverseSolidus)) {
            if (this.eatClassEscape()) {
                return true;
            }
            if (this._uFlag) {
                this.raise("Invalid escape");
            }
            this.rewind(start);
        }
        const cp = this.currentCodePoint;
        if (cp !== -1 && cp !== unicode_1.RightSquareBracket) {
            this.advance();
            this._lastIntValue = cp;
            this.onCharacter(start, this.index, cp);
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ClassEscape
    eatClassEscape() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterB)) {
            this._lastIntValue = unicode_1.Backspace;
            this.onCharacter(start - 1, this.index, unicode_1.Backspace);
            return true;
        }
        if (this._uFlag && this.eat(unicode_1.HyphenMinus)) {
            this._lastIntValue = unicode_1.HyphenMinus;
            this.onCharacter(start - 1, this.index, unicode_1.HyphenMinus);
            return true;
        }
        if (!this._uFlag && this.eat(unicode_1.LatinSmallLetterC)) {
            if (this.eatClassControlLetter()) {
                this.onCharacter(start - 1, this.index, this._lastIntValue);
                return true;
            }
            this.rewind(start);
        }
        return this.eatCharacterClassEscape() || this.eatCharacterEscape();
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-ClassControlLetter
    eatClassControlLetter() {
        const cp = this.currentCodePoint;
        if ((0, unicode_1.isDecimalDigit)(cp) || cp === unicode_1.LowLine) {
            this.advance();
            this._lastIntValue = cp % 0x20;
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
    eatHexEscapeSequence() {
        const start = this.index;
        if (this.eat(unicode_1.LatinSmallLetterX)) {
            if (this.eatFixedHexDigits(2)) {
                return true;
            }
            if (this._uFlag) {
                this.raise("Invalid escape");
            }
            this.rewind(start);
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
    eatDecimalDigits() {
        const start = this.index;
        this._lastIntValue = 0;
        while ((0, unicode_1.isDecimalDigit)(this.currentCodePoint)) {
            this._lastIntValue =
                10 * this._lastIntValue + (0, unicode_1.digitToInt)(this.currentCodePoint);
            this.advance();
        }
        return this.index !== start;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
    eatHexDigits() {
        const start = this.index;
        this._lastIntValue = 0;
        while ((0, unicode_1.isHexDigit)(this.currentCodePoint)) {
            this._lastIntValue =
                16 * this._lastIntValue + (0, unicode_1.digitToInt)(this.currentCodePoint);
            this.advance();
        }
        return this.index !== start;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-strict-LegacyOctalEscapeSequence
    // Allows only 0-377(octal) i.e. 0-255(decimal).
    eatLegacyOctalEscapeSequence() {
        if (this.eatOctalDigit()) {
            const n1 = this._lastIntValue;
            if (this.eatOctalDigit()) {
                const n2 = this._lastIntValue;
                if (n1 <= 3 && this.eatOctalDigit()) {
                    this._lastIntValue = n1 * 64 + n2 * 8 + this._lastIntValue;
                }
                else {
                    this._lastIntValue = n1 * 8 + n2;
                }
            }
            else {
                this._lastIntValue = n1;
            }
            return true;
        }
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
    eatOctalDigit() {
        const cp = this.currentCodePoint;
        if ((0, unicode_1.isOctalDigit)(cp)) {
            this.advance();
            this._lastIntValue = cp - unicode_1.DigitZero;
            return true;
        }
        this._lastIntValue = 0;
        return false;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
    // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
    eatFixedHexDigits(length) {
        const start = this.index;
        this._lastIntValue = 0;
        for (let i = 0; i < length; ++i) {
            const cp = this.currentCodePoint;
            if (!(0, unicode_1.isHexDigit)(cp)) {
                this.rewind(start);
                return false;
            }
            this._lastIntValue = 16 * this._lastIntValue + (0, unicode_1.digitToInt)(cp);
            this.advance();
        }
        return true;
    }
}
exports.RegExpValidator = RegExpValidator;
//# sourceMappingURL=validator.js.map