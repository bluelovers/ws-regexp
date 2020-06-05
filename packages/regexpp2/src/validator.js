"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return unicode_1.isIdStart(cp) || cp === unicode_1.DollarSign || cp === unicode_1.LowLine;
}
function isRegExpIdentifierPart(cp) {
    return (unicode_1.isIdContinue(cp) ||
        cp === unicode_1.DollarSign ||
        cp === unicode_1.LowLine ||
        cp === unicode_1.ZeroWidthNonJoiner ||
        cp === unicode_1.ZeroWidthJoiner);
}
function isUnicodePropertyNameCharacter(cp) {
    return unicode_1.isLatinLetter(cp) || cp === unicode_1.LowLine;
}
function isUnicodePropertyValueCharacter(cp) {
    return isUnicodePropertyNameCharacter(cp) || unicode_1.isDecimalDigit(cp);
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
            if (cp === -1 || unicode_1.isLineTerminator(cp)) {
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
            !unicode_1.isDecimalDigit(this.nextCodePoint)) {
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
        if (unicode_1.isLatinLetter(cp)) {
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
                unicode_1.isValidUnicode(this._lastIntValue)) {
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
            return !unicode_1.isIdContinue(cp);
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
        if (unicode_1.isDecimalDigit(cp) || cp === unicode_1.LowLine) {
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
        while (unicode_1.isDecimalDigit(this.currentCodePoint)) {
            this._lastIntValue =
                10 * this._lastIntValue + unicode_1.digitToInt(this.currentCodePoint);
            this.advance();
        }
        return this.index !== start;
    }
    // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
    eatHexDigits() {
        const start = this.index;
        this._lastIntValue = 0;
        while (unicode_1.isHexDigit(this.currentCodePoint)) {
            this._lastIntValue =
                16 * this._lastIntValue + unicode_1.digitToInt(this.currentCodePoint);
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
        if (unicode_1.isOctalDigit(cp)) {
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
            if (!unicode_1.isHexDigit(cp)) {
                this.rewind(start);
                return false;
            }
            this._lastIntValue = 16 * this._lastIntValue + unicode_1.digitToInt(cp);
            this.advance();
        }
        return true;
    }
}
exports.RegExpValidator = RegExpValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWlDO0FBQ2pDLCtEQUF5RDtBQUN6RCx1Q0FvRWtCO0FBRWxCLFNBQVMsaUJBQWlCLENBQUMsRUFBVTtJQUNqQyxPQUFPLENBQ0gsRUFBRSxLQUFLLDBCQUFnQjtRQUN2QixFQUFFLEtBQUssb0JBQVU7UUFDakIsRUFBRSxLQUFLLHdCQUFjO1FBQ3JCLEVBQUUsS0FBSyxrQkFBUTtRQUNmLEVBQUUsS0FBSyxrQkFBUTtRQUNmLEVBQUUsS0FBSyxrQkFBUTtRQUNmLEVBQUUsS0FBSyxzQkFBWTtRQUNuQixFQUFFLEtBQUsseUJBQWU7UUFDdEIsRUFBRSxLQUFLLDBCQUFnQjtRQUN2QixFQUFFLEtBQUssMkJBQWlCO1FBQ3hCLEVBQUUsS0FBSyw0QkFBa0I7UUFDekIsRUFBRSxLQUFLLDBCQUFnQjtRQUN2QixFQUFFLEtBQUssMkJBQWlCO1FBQ3hCLEVBQUUsS0FBSyxzQkFBWSxDQUN0QixDQUFBO0FBQ0wsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsRUFBVTtJQUN2QyxPQUFPLG1CQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLG9CQUFVLElBQUksRUFBRSxLQUFLLGlCQUFPLENBQUE7QUFDL0QsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsRUFBVTtJQUN0QyxPQUFPLENBQ0gsc0JBQVksQ0FBQyxFQUFFLENBQUM7UUFDaEIsRUFBRSxLQUFLLG9CQUFVO1FBQ2pCLEVBQUUsS0FBSyxpQkFBTztRQUNkLEVBQUUsS0FBSyw0QkFBa0I7UUFDekIsRUFBRSxLQUFLLHlCQUFlLENBQ3pCLENBQUE7QUFDTCxDQUFDO0FBRUQsU0FBUyw4QkFBOEIsQ0FBQyxFQUFVO0lBQzlDLE9BQU8sdUJBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssaUJBQU8sQ0FBQTtBQUM5QyxDQUFDO0FB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WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMvRCxPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLDJCQUFpQixDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNoRSxPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMvRCxPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLDJCQUFpQixDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUMvRCxPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FB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QUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQTtRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtZQUNoQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbEIsT0FBTyxLQUFLLENBQUE7YUFDZjtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM3RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDakI7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7Q0FDSjtBQWgrQ0QsMENBZytDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRlciB9IGZyb20gXCIuL3JlYWRlclwiXG5pbXBvcnQgeyBSZWdFeHBTeW50YXhFcnJvciB9IGZyb20gXCIuL3JlZ2V4cC1zeW50YXgtZXJyb3JcIlxuaW1wb3J0IHtcbiAgICBBc3RlcmlzayxcbiAgICBCYWNrc3BhY2UsXG4gICAgQ2FycmlhZ2VSZXR1cm4sXG4gICAgQ2hhcmFjdGVyVGFidWxhdGlvbixcbiAgICBDaXJjdW1mbGV4QWNjZW50LFxuICAgIENvbG9uLFxuICAgIENvbW1hLFxuICAgIERpZ2l0TmluZSxcbiAgICBEaWdpdE9uZSxcbiAgICBkaWdpdFRvSW50LFxuICAgIERpZ2l0WmVybyxcbiAgICBEb2xsYXJTaWduLFxuICAgIEVxdWFsc1NpZ24sXG4gICAgRXhjbGFtYXRpb25NYXJrLFxuICAgIEZvcm1GZWVkLFxuICAgIEZ1bGxTdG9wLFxuICAgIEdyZWF0ZXJUaGFuU2lnbixcbiAgICBIeXBoZW5NaW51cyxcbiAgICBpc0RlY2ltYWxEaWdpdCxcbiAgICBpc0hleERpZ2l0LFxuICAgIGlzSWRDb250aW51ZSxcbiAgICBpc0lkU3RhcnQsXG4gICAgaXNMYXRpbkxldHRlcixcbiAgICBpc0xpbmVUZXJtaW5hdG9yLFxuICAgIGlzT2N0YWxEaWdpdCxcbiAgICBpc1ZhbGlkVW5pY29kZSxcbiAgICBMYXRpbkNhcGl0YWxMZXR0ZXJCLFxuICAgIExhdGluQ2FwaXRhbExldHRlckQsXG4gICAgTGF0aW5DYXBpdGFsTGV0dGVyUCxcbiAgICBMYXRpbkNhcGl0YWxMZXR0ZXJTLFxuICAgIExhdGluQ2FwaXRhbExldHRlclcsXG4gICAgTGF0aW5TbWFsbExldHRlckIsXG4gICAgTGF0aW5TbWFsbExldHRlckMsXG4gICAgTGF0aW5TbWFsbExldHRlckQsXG4gICAgTGF0aW5TbWFsbExldHRlckYsXG4gICAgTGF0aW5TbWFsbExldHRlckcsXG4gICAgTGF0aW5TbWFsbExldHRlckksXG4gICAgTGF0aW5TbWFsbExldHRlckssXG4gICAgTGF0aW5TbWFsbExldHRlck0sXG4gICAgTGF0aW5TbWFsbExldHRlck4sXG4gICAgTGF0aW5TbWFsbExldHRlclAsXG4gICAgTGF0aW5TbWFsbExldHRlclIsXG4gICAgTGF0aW5TbWFsbExldHRlclMsXG4gICAgTGF0aW5TbWFsbExldHRlclQsXG4gICAgTGF0aW5TbWFsbExldHRlclUsXG4gICAgTGF0aW5TbWFsbExldHRlclYsXG4gICAgTGF0aW5TbWFsbExldHRlclcsXG4gICAgTGF0aW5TbWFsbExldHRlclgsXG4gICAgTGF0aW5TbWFsbExldHRlclksXG4gICAgTGVmdEN1cmx5QnJhY2tldCxcbiAgICBMZWZ0UGFyZW50aGVzaXMsXG4gICAgTGVmdFNxdWFyZUJyYWNrZXQsXG4gICAgTGVzc1RoYW5TaWduLFxuICAgIExpbmVGZWVkLFxuICAgIExpbmVUYWJ1bGF0aW9uLFxuICAgIExvd0xpbmUsXG4gICAgUGx1c1NpZ24sXG4gICAgUHJvcGVydHlEYXRhLFxuICAgIFF1ZXN0aW9uTWFyayxcbiAgICBSZXZlcnNlU29saWR1cyxcbiAgICBSaWdodEN1cmx5QnJhY2tldCxcbiAgICBSaWdodFBhcmVudGhlc2lzLFxuICAgIFJpZ2h0U3F1YXJlQnJhY2tldCxcbiAgICBTb2xpZHVzLFxuICAgIFZlcnRpY2FsTGluZSxcbiAgICBaZXJvV2lkdGhKb2luZXIsXG4gICAgWmVyb1dpZHRoTm9uSm9pbmVyLFxufSBmcm9tIFwiLi91bmljb2RlXCJcblxuZnVuY3Rpb24gaXNTeW50YXhDaGFyYWN0ZXIoY3A6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIGNwID09PSBDaXJjdW1mbGV4QWNjZW50IHx8XG4gICAgICAgIGNwID09PSBEb2xsYXJTaWduIHx8XG4gICAgICAgIGNwID09PSBSZXZlcnNlU29saWR1cyB8fFxuICAgICAgICBjcCA9PT0gRnVsbFN0b3AgfHxcbiAgICAgICAgY3AgPT09IEFzdGVyaXNrIHx8XG4gICAgICAgIGNwID09PSBQbHVzU2lnbiB8fFxuICAgICAgICBjcCA9PT0gUXVlc3Rpb25NYXJrIHx8XG4gICAgICAgIGNwID09PSBMZWZ0UGFyZW50aGVzaXMgfHxcbiAgICAgICAgY3AgPT09IFJpZ2h0UGFyZW50aGVzaXMgfHxcbiAgICAgICAgY3AgPT09IExlZnRTcXVhcmVCcmFja2V0IHx8XG4gICAgICAgIGNwID09PSBSaWdodFNxdWFyZUJyYWNrZXQgfHxcbiAgICAgICAgY3AgPT09IExlZnRDdXJseUJyYWNrZXQgfHxcbiAgICAgICAgY3AgPT09IFJpZ2h0Q3VybHlCcmFja2V0IHx8XG4gICAgICAgIGNwID09PSBWZXJ0aWNhbExpbmVcbiAgICApXG59XG5cbmZ1bmN0aW9uIGlzUmVnRXhwSWRlbnRpZmllclN0YXJ0KGNwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNJZFN0YXJ0KGNwKSB8fCBjcCA9PT0gRG9sbGFyU2lnbiB8fCBjcCA9PT0gTG93TGluZVxufVxuXG5mdW5jdGlvbiBpc1JlZ0V4cElkZW50aWZpZXJQYXJ0KGNwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBpc0lkQ29udGludWUoY3ApIHx8XG4gICAgICAgIGNwID09PSBEb2xsYXJTaWduIHx8XG4gICAgICAgIGNwID09PSBMb3dMaW5lIHx8XG4gICAgICAgIGNwID09PSBaZXJvV2lkdGhOb25Kb2luZXIgfHxcbiAgICAgICAgY3AgPT09IFplcm9XaWR0aEpvaW5lclxuICAgIClcbn1cblxuZnVuY3Rpb24gaXNVbmljb2RlUHJvcGVydHlOYW1lQ2hhcmFjdGVyKGNwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNMYXRpbkxldHRlcihjcCkgfHwgY3AgPT09IExvd0xpbmVcbn1cblxuZnVuY3Rpb24gaXNVbmljb2RlUHJvcGVydHlWYWx1ZUNoYXJhY3RlcihjcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5pY29kZVByb3BlcnR5TmFtZUNoYXJhY3RlcihjcCkgfHwgaXNEZWNpbWFsRGlnaXQoY3ApXG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRVbmljb2RlUHJvcGVydHkobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgcmV0dXJuIFByb3BlcnR5RGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiBQcm9wZXJ0eURhdGFbbmFtZV0uaGFzKHZhbHVlKVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkVW5pY29kZVByb3BlcnR5TmFtZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gUHJvcGVydHlEYXRhLiRMT05FLmhhcyhuYW1lKVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ0V4cFZhbGlkYXRvciB7XG4gICAgLyoqXG4gICAgICogVGhlIG9wdGlvbnMgZm9yIFJlZ0V4cFZhbGlkYXRvciBjb25zdHJ1Y3Rpb24uXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmbGFnIHRvIGRpc2FibGUgQW5uZXggQiBzeW50YXguIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgICovXG4gICAgICAgIHN0cmljdD86IGJvb2xlYW5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRUNNQVNjcmlwdCB2ZXJzaW9uLiBEZWZhdWx0IGlzIGAyMDE4YC5cbiAgICAgICAgICogLSBgMjAxNWAgYWRkZWQgYHVgIGFuZCBgeWAgZmxhZ3MuXG4gICAgICAgICAqIC0gYDIwMThgIGFkZGVkIGBzYCBmbGFnLCBOYW1lZCBDYXB0dXJpbmcgR3JvdXAsIExvb2tiZWhpbmQgQXNzZXJ0aW9uLFxuICAgICAgICAgKiAgIGFuZCBVbmljb2RlIFByb3BlcnR5IEVzY2FwZS5cbiAgICAgICAgICovXG4gICAgICAgIGVjbWFWZXJzaW9uPzogNSB8IDIwMTUgfCAyMDE2IHwgMjAxNyB8IDIwMThcblxuICAgICAgICBkaXNhYmxlQ2hrQ2hhcmFjdGVyQ2xhc3NSYW5nZT86IGJvb2xlYW5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWxpZGF0b3IgZW50ZXJlZCBhIFJlZ0V4cCBsaXRlcmFsLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICovXG4gICAgICAgIG9uTGl0ZXJhbEVudGVyPyhzdGFydDogbnVtYmVyKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBsZWZ0IGEgUmVnRXhwIGxpdGVyYWwuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgb25MaXRlcmFsTGVhdmU/KHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBmb3VuZCBmbGFncy5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBnbG9iYWwgYGdgIGZsYWcuXG4gICAgICAgICAqIEBwYXJhbSBpZ25vcmVDYXNlIGBpYCBmbGFnLlxuICAgICAgICAgKiBAcGFyYW0gbXVsdGlsaW5lIGBtYCBmbGFnLlxuICAgICAgICAgKiBAcGFyYW0gdW5pY29kZSBgdWAgZmxhZy5cbiAgICAgICAgICogQHBhcmFtIHN0aWNreSBgeWAgZmxhZy5cbiAgICAgICAgICogQHBhcmFtIGRvdEFsbCBgc2AgZmxhZy5cbiAgICAgICAgICovXG4gICAgICAgIG9uRmxhZ3M/KFxuICAgICAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICAgICAgZ2xvYmFsOiBib29sZWFuLFxuICAgICAgICAgICAgaWdub3JlQ2FzZTogYm9vbGVhbixcbiAgICAgICAgICAgIG11bHRpbGluZTogYm9vbGVhbixcbiAgICAgICAgICAgIHVuaWNvZGU6IGJvb2xlYW4sXG4gICAgICAgICAgICBzdGlja3k6IGJvb2xlYW4sXG4gICAgICAgICAgICBkb3RBbGw6IGJvb2xlYW4sXG4gICAgICAgICk6IHZvaWRcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWxpZGF0b3IgZW50ZXJlZCBhIHBhdHRlcm4uXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgb25QYXR0ZXJuRW50ZXI/KHN0YXJ0OiBudW1iZXIpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGxlZnQgYSBwYXR0ZXJuLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICovXG4gICAgICAgIG9uUGF0dGVybkxlYXZlPyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IHZvaWRcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWxpZGF0b3IgZW50ZXJlZCBhIGRpc2p1bmN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICovXG4gICAgICAgIG9uRGlzanVuY3Rpb25FbnRlcj8oc3RhcnQ6IG51bWJlcik6IHZvaWRcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWxpZGF0b3IgbGVmdCBhIGRpc2p1bmN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICovXG4gICAgICAgIG9uRGlzanVuY3Rpb25MZWF2ZT8oc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGVudGVyZWQgYW4gYWx0ZXJuYXRpdmUuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggVGhlIDAtYmFzZWQgaW5kZXggb2YgYWx0ZXJuYXRpdmVzIGluIGEgZGlzanVuY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBvbkFsdGVybmF0aXZlRW50ZXI/KHN0YXJ0OiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGxlZnQgYW4gYWx0ZXJuYXRpdmUuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggVGhlIDAtYmFzZWQgaW5kZXggb2YgYWx0ZXJuYXRpdmVzIGluIGEgZGlzanVuY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBvbkFsdGVybmF0aXZlTGVhdmU/KHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBlbnRlcmVkIGFuIHVuY2FwdHVyaW5nIGdyb3VwLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICovXG4gICAgICAgIG9uR3JvdXBFbnRlcj8oc3RhcnQ6IG51bWJlcik6IHZvaWRcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWxpZGF0b3IgbGVmdCBhbiB1bmNhcHR1cmluZyBncm91cC5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqL1xuICAgICAgICBvbkdyb3VwTGVhdmU/KHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBlbnRlcmVkIGEgY2FwdHVyaW5nIGdyb3VwLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIGdyb3VwIG5hbWUuXG4gICAgICAgICAqL1xuICAgICAgICBvbkNhcHR1cmluZ0dyb3VwRW50ZXI/KHN0YXJ0OiBudW1iZXIsIG5hbWU6IHN0cmluZyB8IG51bGwpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGxlZnQgYSBjYXB0dXJpbmcgZ3JvdXAuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gbmFtZSBUaGUgZ3JvdXAgbmFtZS5cbiAgICAgICAgICovXG4gICAgICAgIG9uQ2FwdHVyaW5nR3JvdXBMZWF2ZT8oXG4gICAgICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcgfCBudWxsLFxuICAgICAgICApOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGZvdW5kIGEgcXVhbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gbnVtYmVyIG9mIHJlcGVhdGluZy5cbiAgICAgICAgICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVwZWF0aW5nLlxuICAgICAgICAgKiBAcGFyYW0gZ3JlZWR5IFRoZSBmbGFnIHRvIGNob29zZSB0aGUgbG9uZ2VzdCBtYXRjaGluZy5cbiAgICAgICAgICovXG4gICAgICAgIG9uUXVhbnRpZmllcj8oXG4gICAgICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgICAgICBtaW46IG51bWJlcixcbiAgICAgICAgICAgIG1heDogbnVtYmVyLFxuICAgICAgICAgICAgZ3JlZWR5OiBib29sZWFuLFxuICAgICAgICApOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGVudGVyZWQgYSBsb29rYWhlYWQvbG9va2JlaGluZCBhc3NlcnRpb24uXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgYXNzZXJ0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gbmVnYXRlIFRoZSBmbGFnIHdoaWNoIHJlcHJlc2VudHMgdGhhdCB0aGUgYXNzZXJ0aW9uIGlzIG5lZ2F0aXZlLlxuICAgICAgICAgKi9cbiAgICAgICAgb25Mb29rYXJvdW5kQXNzZXJ0aW9uRW50ZXI/KFxuICAgICAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgICAgIGtpbmQ6IFwibG9va2FoZWFkXCIgfCBcImxvb2tiZWhpbmRcIixcbiAgICAgICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICAgICAgKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBsZWZ0IGEgbG9va2FoZWFkL2xvb2tiZWhpbmQgYXNzZXJ0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIGFzc2VydGlvbi5cbiAgICAgICAgICogQHBhcmFtIG5lZ2F0ZSBUaGUgZmxhZyB3aGljaCByZXByZXNlbnRzIHRoYXQgdGhlIGFzc2VydGlvbiBpcyBuZWdhdGl2ZS5cbiAgICAgICAgICovXG4gICAgICAgIG9uTG9va2Fyb3VuZEFzc2VydGlvbkxlYXZlPyhcbiAgICAgICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgICAgIGtpbmQ6IFwibG9va2FoZWFkXCIgfCBcImxvb2tiZWhpbmRcIixcbiAgICAgICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICAgICAgKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBmb3VuZCBhbiBlZGdlIGJvdW5kYXJ5IGFzc2VydGlvbi5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIHRoZSBhc3NlcnRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBvbkVkZ2VBc3NlcnRpb24/KFxuICAgICAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICAgICAga2luZDogXCJzdGFydFwiIHwgXCJlbmRcIixcbiAgICAgICAgKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBmb3VuZCBhIHdvcmQgYm91bmRhcnkgYXNzZXJ0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIGFzc2VydGlvbi5cbiAgICAgICAgICogQHBhcmFtIG5lZ2F0ZSBUaGUgZmxhZyB3aGljaCByZXByZXNlbnRzIHRoYXQgdGhlIGFzc2VydGlvbiBpcyBuZWdhdGl2ZS5cbiAgICAgICAgICovXG4gICAgICAgIG9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uPyhcbiAgICAgICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgICAgIGtpbmQ6IFwid29yZFwiLFxuICAgICAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICAgICApOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGZvdW5kIGEgZG90LlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIGNoYXJhY3RlciBzZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFueUNoYXJhY3RlclNldD8oc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGtpbmQ6IFwiYW55XCIpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGZvdW5kIGEgY2hhcmFjdGVyIHNldCBlc2NhcGUuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgY2hhcmFjdGVyIHNldC5cbiAgICAgICAgICogQHBhcmFtIG5lZ2F0ZSBUaGUgZmxhZyB3aGljaCByZXByZXNlbnRzIHRoYXQgdGhlIGNoYXJhY3RlciBzZXQgaXMgbmVnYXRpdmUuXG4gICAgICAgICAqL1xuICAgICAgICBvbkVzY2FwZUNoYXJhY3RlclNldD8oXG4gICAgICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgICAgICBraW5kOiBcImRpZ2l0XCIgfCBcInNwYWNlXCIgfCBcIndvcmRcIixcbiAgICAgICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICAgICAgKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBmb3VuZCBhIFVuaWNvZGUgcHJvZXJ0eSBlc2NhcGUuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0ga2luZCBUaGUga2luZCBvZiB0aGUgY2hhcmFjdGVyIHNldC5cbiAgICAgICAgICogQHBhcmFtIGtleSBUaGUgcHJvcGVydHkgbmFtZS5cbiAgICAgICAgICogQHBhcmFtIHZhbHVlIFRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgICAgICogQHBhcmFtIG5lZ2F0ZSBUaGUgZmxhZyB3aGljaCByZXByZXNlbnRzIHRoYXQgdGhlIGNoYXJhY3RlciBzZXQgaXMgbmVnYXRpdmUuXG4gICAgICAgICAqL1xuICAgICAgICBvblVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldD8oXG4gICAgICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgICAgICBraW5kOiBcInByb3BlcnR5XCIsXG4gICAgICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsLFxuICAgICAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICAgICApOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGZvdW5kIGEgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIDAtYmFzZWQgaW5kZXggb2YgdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIGVuZCBUaGUgbmV4dCAwLWJhc2VkIGluZGV4IG9mIHRoZSBsYXN0IGNoYXJhY3Rlci5cbiAgICAgICAgICogQHBhcmFtIHZhbHVlIFRoZSBjb2RlIHBvaW50IG9mIHRoZSBjaGFyYWN0ZXIuXG4gICAgICAgICAqL1xuICAgICAgICBvbkNoYXJhY3Rlcj8oc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGZvdW5kIGEgYmFja3JlZmVyZW5jZS5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSByZWYgVGhlIGtleSBvZiB0aGUgcmVmZXJyZWQgY2FwdHVyaW5nIGdyb3VwLlxuICAgICAgICAgKi9cbiAgICAgICAgb25CYWNrcmVmZXJlbmNlPyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgcmVmOiBudW1iZXIgfCBzdHJpbmcpOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGVudGVyZWQgYSBjaGFyYWN0ZXIgY2xhc3MuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gbmVnYXRlIFRoZSBmbGFnIHdoaWNoIHJlcHJlc2VudHMgdGhhdCB0aGUgY2hhcmFjdGVyIGNsYXNzIGlzIG5lZ2F0aXZlLlxuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFyYWN0ZXJDbGFzc0VudGVyPyhzdGFydDogbnVtYmVyLCBuZWdhdGU6IGJvb2xlYW4pOiB2b2lkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdmFsaWRhdG9yIGxlZnQgYSBjaGFyYWN0ZXIgY2xhc3MuXG4gICAgICAgICAqIEBwYXJhbSBzdGFydCBUaGUgMC1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gZW5kIFRoZSBuZXh0IDAtYmFzZWQgaW5kZXggb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAgICAgKiBAcGFyYW0gbmVnYXRlIFRoZSBmbGFnIHdoaWNoIHJlcHJlc2VudHMgdGhhdCB0aGUgY2hhcmFjdGVyIGNsYXNzIGlzIG5lZ2F0aXZlLlxuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFyYWN0ZXJDbGFzc0xlYXZlPyhcbiAgICAgICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICAgICAgKTogdm9pZFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbGlkYXRvciBmb3VuZCBhIGNoYXJhY3RlciBjbGFzcyByYW5nZS5cbiAgICAgICAgICogQHBhcmFtIHN0YXJ0IFRoZSAwLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBlbmQgVGhlIG5leHQgMC1iYXNlZCBpbmRleCBvZiB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gY29kZSBwb2ludCBvZiB0aGUgcmFuZ2UuXG4gICAgICAgICAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gY29kZSBwb2ludCBvZiB0aGUgcmFuZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBvbkNoYXJhY3RlckNsYXNzUmFuZ2U/KFxuICAgICAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICAgICAgbWluOiBudW1iZXIsXG4gICAgICAgICAgICBtYXg6IG51bWJlcixcbiAgICAgICAgKTogdm9pZFxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHZhbGlkYXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ0V4cFZhbGlkYXRvciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfb3B0aW9uczogUmVnRXhwVmFsaWRhdG9yLk9wdGlvbnNcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZWFkZXIgPSBuZXcgUmVhZGVyKClcbiAgICBwcml2YXRlIF91RmxhZyA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfbkZsYWcgPSBmYWxzZVxuICAgIHByaXZhdGUgX2xhc3RJbnRWYWx1ZSA9IDBcbiAgICBwcml2YXRlIF9sYXN0TWluVmFsdWUgPSAwXG4gICAgcHJpdmF0ZSBfbGFzdE1heFZhbHVlID0gMFxuICAgIHByaXZhdGUgX2xhc3RTdHJWYWx1ZSA9IFwiXCJcbiAgICBwcml2YXRlIF9sYXN0S2V5VmFsdWUgPSBcIlwiXG4gICAgcHJpdmF0ZSBfbGFzdFZhbFZhbHVlID0gXCJcIlxuICAgIHByaXZhdGUgX2xhc3RBc3NlcnRpb25Jc1F1YW50aWZpYWJsZSA9IGZhbHNlXG4gICAgcHJpdmF0ZSBfbnVtQ2FwdHVyaW5nUGFyZW5zID0gMFxuICAgIHByaXZhdGUgX2dyb3VwTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICAgIHByaXZhdGUgX2JhY2tyZWZlcmVuY2VOYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgdmFsaWRhdG9yLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIG9mIHZhbGlkYXRvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9ucz86IFJlZ0V4cFZhbGlkYXRvci5PcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbC4gRS5nLiBcIi9hYmMvZ1wiXG4gICAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIGNvZGUgdG8gdmFsaWRhdGUuXG4gICAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIGVuZCBUaGUgZW5kIGluZGV4IGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsaWRhdGVMaXRlcmFsKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgc3RhcnQgPSAwLFxuICAgICAgICBlbmQ6IG51bWJlciA9IHNvdXJjZS5sZW5ndGgsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VGbGFnID0gdGhpcy5fbkZsYWcgPSBmYWxzZVxuICAgICAgICB0aGlzLnJlc2V0KHNvdXJjZSwgc3RhcnQsIGVuZClcblxuICAgICAgICB0aGlzLm9uTGl0ZXJhbEVudGVyKHN0YXJ0KVxuICAgICAgICBpZiAodGhpcy5lYXQoU29saWR1cykgJiYgdGhpcy5lYXRSZWdFeHBCb2R5KCkgJiYgdGhpcy5lYXQoU29saWR1cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZsYWdTdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgICAgIGNvbnN0IHVGbGFnID0gc291cmNlLmluZGV4T2YoXCJ1XCIsIGZsYWdTdGFydCkgIT09IC0xXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlRmxhZ3Moc291cmNlLCBmbGFnU3RhcnQsIGVuZClcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQYXR0ZXJuKHNvdXJjZSwgc3RhcnQgKyAxLCBmbGFnU3RhcnQgLSAxLCB1RmxhZylcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMucmFpc2UoXCJFbXB0eVwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYyA9IFN0cmluZy5mcm9tQ29kZVBvaW50KHRoaXMuY3VycmVudENvZGVQb2ludClcbiAgICAgICAgICAgIHRoaXMucmFpc2UoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyICcke2N9J2ApXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkxpdGVyYWxMZWF2ZShzdGFydCwgZW5kKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZsYWdzLiBFLmcuIFwiZ2ltXCJcbiAgICAgKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2UgY29kZSB0byB2YWxpZGF0ZS5cbiAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIHN0YXJ0IGluZGV4IGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqL1xuICAgIHB1YmxpYyB2YWxpZGF0ZUZsYWdzKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgc3RhcnQgPSAwLFxuICAgICAgICBlbmQ6IG51bWJlciA9IHNvdXJjZS5sZW5ndGgsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRmxhZ3MgPSBuZXcgU2V0PG51bWJlcj4oKVxuICAgICAgICBsZXQgZ2xvYmFsID0gZmFsc2VcbiAgICAgICAgbGV0IGlnbm9yZUNhc2UgPSBmYWxzZVxuICAgICAgICBsZXQgbXVsdGlsaW5lID0gZmFsc2VcbiAgICAgICAgbGV0IHN0aWNreSA9IGZhbHNlXG4gICAgICAgIGxldCB1bmljb2RlID0gZmFsc2VcbiAgICAgICAgbGV0IGRvdEFsbCA9IGZhbHNlXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBmbGFnID0gc291cmNlLmNoYXJDb2RlQXQoaSlcblxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRmxhZ3MuaGFzKGZsYWcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWlzZShgRHVwbGljYXRlZCBmbGFnICcke3NvdXJjZVtpXX0nYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4aXN0aW5nRmxhZ3MuYWRkKGZsYWcpXG5cbiAgICAgICAgICAgIGlmIChmbGFnID09PSBMYXRpblNtYWxsTGV0dGVyRykge1xuICAgICAgICAgICAgICAgIGdsb2JhbCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gTGF0aW5TbWFsbExldHRlckkpIHtcbiAgICAgICAgICAgICAgICBpZ25vcmVDYXNlID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChmbGFnID09PSBMYXRpblNtYWxsTGV0dGVyTSkge1xuICAgICAgICAgICAgICAgIG11bHRpbGluZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gTGF0aW5TbWFsbExldHRlclUgJiYgdGhpcy5lY21hVmVyc2lvbiA+PSAyMDE1KSB7XG4gICAgICAgICAgICAgICAgdW5pY29kZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gTGF0aW5TbWFsbExldHRlclkgJiYgdGhpcy5lY21hVmVyc2lvbiA+PSAyMDE1KSB7XG4gICAgICAgICAgICAgICAgc3RpY2t5ID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChmbGFnID09PSBMYXRpblNtYWxsTGV0dGVyUyAmJiB0aGlzLmVjbWFWZXJzaW9uID49IDIwMTgpIHtcbiAgICAgICAgICAgICAgICBkb3RBbGwgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoYEludmFsaWQgZmxhZyAnJHtzb3VyY2VbaV19J2ApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkZsYWdzKFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICBnbG9iYWwsXG4gICAgICAgICAgICBpZ25vcmVDYXNlLFxuICAgICAgICAgICAgbXVsdGlsaW5lLFxuICAgICAgICAgICAgdW5pY29kZSxcbiAgICAgICAgICAgIHN0aWNreSxcbiAgICAgICAgICAgIGRvdEFsbCxcbiAgICAgICAgKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGEgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4uIEUuZy4gXCJhYmNcIlxuICAgICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBjb2RlIHRvIHZhbGlkYXRlLlxuICAgICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSBlbmQgVGhlIGVuZCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHVGbGFnIFRoZSBmbGFnIHRvIHNldCB1bmljb2RlIG1vZGUuXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlUGF0dGVybihcbiAgICAgICAgc291cmNlOiBzdHJpbmcsXG4gICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgZW5kOiBudW1iZXIgPSBzb3VyY2UubGVuZ3RoLFxuICAgICAgICB1RmxhZyA9IGZhbHNlLFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLl91RmxhZyA9IHVGbGFnICYmIHRoaXMuZWNtYVZlcnNpb24gPj0gMjAxNVxuICAgICAgICB0aGlzLl9uRmxhZyA9IHVGbGFnICYmIHRoaXMuZWNtYVZlcnNpb24gPj0gMjAxOFxuICAgICAgICB0aGlzLnJlc2V0KHNvdXJjZSwgc3RhcnQsIGVuZClcbiAgICAgICAgdGhpcy5wYXR0ZXJuKClcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5fbkZsYWcgJiZcbiAgICAgICAgICAgIHRoaXMuZWNtYVZlcnNpb24gPj0gMjAxOCAmJlxuICAgICAgICAgICAgdGhpcy5fZ3JvdXBOYW1lcy5zaXplID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX25GbGFnID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5yZXdpbmQoc3RhcnQpXG4gICAgICAgICAgICB0aGlzLnBhdHRlcm4oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gI3JlZ2lvbiBEZWxlZ2F0ZSBmb3IgT3B0aW9uc1xuXG4gICAgcHJpdmF0ZSBnZXQgc3RyaWN0KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLl9vcHRpb25zLnN0cmljdCB8fCB0aGlzLl91RmxhZylcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBlY21hVmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuZWNtYVZlcnNpb24gfHwgMjAxOFxuICAgIH1cblxuICAgIHByaXZhdGUgb25MaXRlcmFsRW50ZXIoc3RhcnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkxpdGVyYWxFbnRlcikge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkxpdGVyYWxFbnRlcihzdGFydClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25MaXRlcmFsTGVhdmUoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25MaXRlcmFsTGVhdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25MaXRlcmFsTGVhdmUoc3RhcnQsIGVuZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25GbGFncyhcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGdsb2JhbDogYm9vbGVhbixcbiAgICAgICAgaWdub3JlQ2FzZTogYm9vbGVhbixcbiAgICAgICAgbXVsdGlsaW5lOiBib29sZWFuLFxuICAgICAgICB1bmljb2RlOiBib29sZWFuLFxuICAgICAgICBzdGlja3k6IGJvb2xlYW4sXG4gICAgICAgIGRvdEFsbDogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25GbGFncykge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkZsYWdzKFxuICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgICAgICBnbG9iYWwsXG4gICAgICAgICAgICAgICAgaWdub3JlQ2FzZSxcbiAgICAgICAgICAgICAgICBtdWx0aWxpbmUsXG4gICAgICAgICAgICAgICAgdW5pY29kZSxcbiAgICAgICAgICAgICAgICBzdGlja3ksXG4gICAgICAgICAgICAgICAgZG90QWxsLFxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBhdHRlcm5FbnRlcihzdGFydDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm9uUGF0dGVybkVudGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uUGF0dGVybkVudGVyKHN0YXJ0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBhdHRlcm5MZWF2ZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vblBhdHRlcm5MZWF2ZSkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vblBhdHRlcm5MZWF2ZShzdGFydCwgZW5kKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRpc2p1bmN0aW9uRW50ZXIoc3RhcnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkRpc2p1bmN0aW9uRW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25EaXNqdW5jdGlvbkVudGVyKHN0YXJ0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRpc2p1bmN0aW9uTGVhdmUoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25EaXNqdW5jdGlvbkxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uRGlzanVuY3Rpb25MZWF2ZShzdGFydCwgZW5kKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkFsdGVybmF0aXZlRW50ZXIoc3RhcnQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkFsdGVybmF0aXZlRW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25BbHRlcm5hdGl2ZUVudGVyKHN0YXJ0LCBpbmRleClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25BbHRlcm5hdGl2ZUxlYXZlKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgaW5kZXg6IG51bWJlcixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25BbHRlcm5hdGl2ZUxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uQWx0ZXJuYXRpdmVMZWF2ZShzdGFydCwgZW5kLCBpbmRleClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Hcm91cEVudGVyKHN0YXJ0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25Hcm91cEVudGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uR3JvdXBFbnRlcihzdGFydClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Hcm91cExlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm9uR3JvdXBMZWF2ZSkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkdyb3VwTGVhdmUoc3RhcnQsIGVuZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DYXB0dXJpbmdHcm91cEVudGVyKHN0YXJ0OiBudW1iZXIsIG5hbWU6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25DYXB0dXJpbmdHcm91cEVudGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2FwdHVyaW5nR3JvdXBFbnRlcihzdGFydCwgbmFtZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DYXB0dXJpbmdHcm91cExlYXZlKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgbmFtZTogc3RyaW5nIHwgbnVsbCxcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25DYXB0dXJpbmdHcm91cExlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2FwdHVyaW5nR3JvdXBMZWF2ZShzdGFydCwgZW5kLCBuYW1lKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblF1YW50aWZpZXIoXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICBtaW46IG51bWJlcixcbiAgICAgICAgbWF4OiBudW1iZXIsXG4gICAgICAgIGdyZWVkeTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25RdWFudGlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uUXVhbnRpZmllcihzdGFydCwgZW5kLCBtaW4sIG1heCwgZ3JlZWR5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxvb2thcm91bmRBc3NlcnRpb25FbnRlcihcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJsb29rYWhlYWRcIiB8IFwibG9va2JlaGluZFwiLFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm9uTG9va2Fyb3VuZEFzc2VydGlvbkVudGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uTG9va2Fyb3VuZEFzc2VydGlvbkVudGVyKHN0YXJ0LCBraW5kLCBuZWdhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9va2Fyb3VuZEFzc2VydGlvbkxlYXZlKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJsb29rYWhlYWRcIiB8IFwibG9va2JlaGluZFwiLFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm9uTG9va2Fyb3VuZEFzc2VydGlvbkxlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uTG9va2Fyb3VuZEFzc2VydGlvbkxlYXZlKHN0YXJ0LCBlbmQsIGtpbmQsIG5lZ2F0ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25FZGdlQXNzZXJ0aW9uKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJzdGFydFwiIHwgXCJlbmRcIixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25FZGdlQXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uRWRnZUFzc2VydGlvbihzdGFydCwgZW5kLCBraW5kKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbldvcmRCb3VuZGFyeUFzc2VydGlvbihcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGtpbmQ6IFwid29yZFwiLFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLm9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uKHN0YXJ0LCBlbmQsIGtpbmQsIG5lZ2F0ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25BbnlDaGFyYWN0ZXJTZXQoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGtpbmQ6IFwiYW55XCIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25BbnlDaGFyYWN0ZXJTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25BbnlDaGFyYWN0ZXJTZXQoc3RhcnQsIGVuZCwga2luZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Fc2NhcGVDaGFyYWN0ZXJTZXQoXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICBraW5kOiBcImRpZ2l0XCIgfCBcInNwYWNlXCIgfCBcIndvcmRcIixcbiAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkVzY2FwZUNoYXJhY3RlclNldCkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkVzY2FwZUNoYXJhY3RlclNldChzdGFydCwgZW5kLCBraW5kLCBuZWdhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0KFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJwcm9wZXJ0eVwiLFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bGwsXG4gICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQoXG4gICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFyYWN0ZXIoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25DaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25DaGFyYWN0ZXIoc3RhcnQsIGVuZCwgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQmFja3JlZmVyZW5jZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIHJlZjogbnVtYmVyIHwgc3RyaW5nLFxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkJhY2tyZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25CYWNrcmVmZXJlbmNlKHN0YXJ0LCBlbmQsIHJlZilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFyYWN0ZXJDbGFzc0VudGVyKHN0YXJ0OiBudW1iZXIsIG5lZ2F0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5vbkNoYXJhY3RlckNsYXNzRW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25DaGFyYWN0ZXJDbGFzc0VudGVyKHN0YXJ0LCBuZWdhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhcmFjdGVyQ2xhc3NMZWF2ZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25DaGFyYWN0ZXJDbGFzc0xlYXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2hhcmFjdGVyQ2xhc3NMZWF2ZShzdGFydCwgZW5kLCBuZWdhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2hhcmFjdGVyQ2xhc3NSYW5nZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIG1pbjogbnVtYmVyLFxuICAgICAgICBtYXg6IG51bWJlcixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMub25DaGFyYWN0ZXJDbGFzc1JhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2hhcmFjdGVyQ2xhc3NSYW5nZShzdGFydCwgZW5kLCBtaW4sIG1heClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb25cblxuICAgIC8vICNyZWdpb24gRGVsZWdhdGUgZm9yIFJlYWRlclxuXG4gICAgcHJpdmF0ZSBnZXQgc291cmNlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkZXIuc291cmNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRlci5pbmRleFxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGN1cnJlbnRDb2RlUG9pbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRlci5jdXJyZW50Q29kZVBvaW50XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbmV4dENvZGVQb2ludCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZGVyLm5leHRDb2RlUG9pbnRcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBuZXh0Q29kZVBvaW50MigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZGVyLm5leHRDb2RlUG9pbnQyXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbmV4dENvZGVQb2ludDMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRlci5uZXh0Q29kZVBvaW50M1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXQoc291cmNlOiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5yZXNldChzb3VyY2UsIHN0YXJ0LCBlbmQsIHRoaXMuX3VGbGFnKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmV3aW5kKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLnJld2luZChpbmRleClcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkdmFuY2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5hZHZhbmNlKClcbiAgICB9XG5cbiAgICBwcml2YXRlIGVhdChjcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkZXIuZWF0KGNwKVxuICAgIH1cblxuICAgIHByaXZhdGUgZWF0MihjcDE6IG51bWJlciwgY3AyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRlci5lYXQyKGNwMSwgY3AyKVxuICAgIH1cblxuICAgIHByaXZhdGUgZWF0MyhjcDE6IG51bWJlciwgY3AyOiBudW1iZXIsIGNwMzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkZXIuZWF0MyhjcDEsIGNwMiwgY3AzKVxuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb25cblxuICAgIHByaXZhdGUgcmFpc2UobWVzc2FnZTogc3RyaW5nKTogbmV2ZXIge1xuICAgICAgICB0aHJvdyBuZXcgUmVnRXhwU3ludGF4RXJyb3IoXG4gICAgICAgICAgICB0aGlzLnNvdXJjZSxcbiAgICAgICAgICAgIHRoaXMuX3VGbGFnLFxuICAgICAgICAgICAgdGhpcy5pbmRleCxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIClcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1SZWd1bGFyRXhwcmVzc2lvbkJvZHlcbiAgICBwcml2YXRlIGVhdFJlZ0V4cEJvZHkoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICBsZXQgaW5DbGFzcyA9IGZhbHNlXG4gICAgICAgIGxldCBlc2NhcGVkID0gZmFsc2VcblxuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBjb25zdCBjcCA9IHRoaXMuY3VycmVudENvZGVQb2ludFxuICAgICAgICAgICAgaWYgKGNwID09PSAtMSB8fCBpc0xpbmVUZXJtaW5hdG9yKGNwKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtpbmQgPSBpbkNsYXNzID8gXCJjaGFyYWN0ZXIgY2xhc3NcIiA6IFwicmVndWxhciBleHByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKGBVbnRlcm1pbmF0ZWQgJHtraW5kfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIGVzY2FwZWQgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjcCA9PT0gUmV2ZXJzZVNvbGlkdXMpIHtcbiAgICAgICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjcCA9PT0gTGVmdFNxdWFyZUJyYWNrZXQpIHtcbiAgICAgICAgICAgICAgICBpbkNsYXNzID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjcCA9PT0gUmlnaHRTcXVhcmVCcmFja2V0KSB7XG4gICAgICAgICAgICAgICAgaW5DbGFzcyA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIChjcCA9PT0gU29saWR1cyAmJiAhaW5DbGFzcykgfHxcbiAgICAgICAgICAgICAgICAoY3AgPT09IEFzdGVyaXNrICYmIHRoaXMuaW5kZXggPT09IHN0YXJ0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCAhPT0gc3RhcnRcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1QYXR0ZXJuXG4gICAgcHJpdmF0ZSBwYXR0ZXJuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgdGhpcy5fbnVtQ2FwdHVyaW5nUGFyZW5zID0gdGhpcy5jb3VudENhcHR1cmluZ1BhcmVucygpXG4gICAgICAgIHRoaXMuX2dyb3VwTmFtZXMuY2xlYXIoKVxuICAgICAgICB0aGlzLl9iYWNrcmVmZXJlbmNlTmFtZXMuY2xlYXIoKVxuXG4gICAgICAgIHRoaXMub25QYXR0ZXJuRW50ZXIoc3RhcnQpXG4gICAgICAgIHRoaXMuZGlzanVuY3Rpb24oKVxuXG4gICAgICAgIGNvbnN0IGNwID0gdGhpcy5jdXJyZW50Q29kZVBvaW50XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRDb2RlUG9pbnQgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoY3AgPT09IFJpZ2h0UGFyZW50aGVzaXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiVW5tYXRjaGVkICcpJ1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNwID09PSBSZXZlcnNlU29saWR1cykge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJcXFxcIGF0IGVuZCBvZiBwYXR0ZXJuXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3AgPT09IFJpZ2h0U3F1YXJlQnJhY2tldCB8fCBjcCA9PT0gUmlnaHRDdXJseUJyYWNrZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiTG9uZSBxdWFudGlmaWVyIGJyYWNrZXRzXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjID0gU3RyaW5nLmZyb21Db2RlUG9pbnQoY3ApXG4gICAgICAgICAgICB0aGlzLnJhaXNlKGBVbmV4cGVjdGVkIGNoYXJhY3RlciAnJHtjfSdgKVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLl9iYWNrcmVmZXJlbmNlTmFtZXMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZ3JvdXBOYW1lcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBuYW1lZCBjYXB0dXJlIHJlZmVyZW5jZWRcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUGF0dGVybkxlYXZlKHN0YXJ0LCB0aGlzLmluZGV4KVxuICAgIH1cblxuICAgIHByaXZhdGUgY291bnRDYXB0dXJpbmdQYXJlbnMoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGxldCBpbkNsYXNzID0gZmFsc2VcbiAgICAgICAgbGV0IGVzY2FwZWQgPSBmYWxzZVxuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIGxldCBjcCA9IDBcblxuICAgICAgICB3aGlsZSAoKGNwID0gdGhpcy5jdXJyZW50Q29kZVBvaW50KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNwID09PSBSZXZlcnNlU29saWR1cykge1xuICAgICAgICAgICAgICAgIGVzY2FwZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNwID09PSBMZWZ0U3F1YXJlQnJhY2tldCkge1xuICAgICAgICAgICAgICAgIGluQ2xhc3MgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNwID09PSBSaWdodFNxdWFyZUJyYWNrZXQpIHtcbiAgICAgICAgICAgICAgICBpbkNsYXNzID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgY3AgPT09IExlZnRQYXJlbnRoZXNpcyAmJlxuICAgICAgICAgICAgICAgICFpbkNsYXNzICYmXG4gICAgICAgICAgICAgICAgKHRoaXMubmV4dENvZGVQb2ludCAhPT0gUXVlc3Rpb25NYXJrIHx8XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLm5leHRDb2RlUG9pbnQyID09PSBMZXNzVGhhblNpZ24gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dENvZGVQb2ludDMgIT09IEVxdWFsc1NpZ24gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dENvZGVQb2ludDMgIT09IEV4Y2xhbWF0aW9uTWFyaykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXdpbmQoc3RhcnQpXG4gICAgICAgIHJldHVybiBjb3VudFxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLURpc2p1bmN0aW9uXG4gICAgcHJpdmF0ZSBkaXNqdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGxldCBpID0gMFxuXG4gICAgICAgIHRoaXMub25EaXNqdW5jdGlvbkVudGVyKHN0YXJ0KVxuICAgICAgICB0aGlzLmFsdGVybmF0aXZlKGkrKylcbiAgICAgICAgd2hpbGUgKHRoaXMuZWF0KFZlcnRpY2FsTGluZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRpdmUoaSsrKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZWF0UXVhbnRpZmllcih0cnVlKSkge1xuICAgICAgICAgICAgdGhpcy5yYWlzZShcIk5vdGhpbmcgdG8gcmVwZWF0XCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExlZnRDdXJseUJyYWNrZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnJhaXNlKFwiTG9uZSBxdWFudGlmaWVyIGJyYWNrZXRzXCIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkRpc2p1bmN0aW9uTGVhdmUoc3RhcnQsIHRoaXMuaW5kZXgpXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtQWx0ZXJuYXRpdmVcbiAgICBwcml2YXRlIGFsdGVybmF0aXZlKGk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcblxuICAgICAgICB0aGlzLm9uQWx0ZXJuYXRpdmVFbnRlcihzdGFydCwgaSlcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudENvZGVQb2ludCAhPT0gLTEgJiYgdGhpcy5lYXRUZXJtKCkpIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkFsdGVybmF0aXZlTGVhdmUoc3RhcnQsIHRoaXMuaW5kZXgsIGkpXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2Qtc3RyaWN0LVRlcm1cbiAgICBwcml2YXRlIGVhdFRlcm0oKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVhdEFzc2VydGlvbigpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYFF1YW50aWZpYWJsZUFzc2VydGlvbiBRdWFudGlmaWVyYCBhbHRlcm5hdGl2ZS5cbiAgICAgICAgICAgIC8vIGB0aGlzLmxhc3RBc3NlcnRpb25Jc1F1YW50aWZpYWJsZWAgaXMgdHJ1ZSBpZiB0aGUgbGFzdCBlYXRlblxuICAgICAgICAgICAgLy8gQXNzZXJ0aW9uIGlzIGEgUXVhbnRpZmlhYmxlQXNzZXJ0aW9uLlxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RBc3NlcnRpb25Jc1F1YW50aWZpYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWF0UXVhbnRpZmllcigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RyaWN0ID8gdGhpcy5lYXRBdG9tKCkgOiB0aGlzLmVhdEV4dGVuZGVkQXRvbSgpKSB7XG4gICAgICAgICAgICB0aGlzLmVhdFF1YW50aWZpZXIoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1Bc3NlcnRpb25cbiAgICBwcml2YXRlIGVhdEFzc2VydGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIHRoaXMuX2xhc3RBc3NlcnRpb25Jc1F1YW50aWZpYWJsZSA9IGZhbHNlXG5cbiAgICAgICAgLy8gXiwgJCwgXFxCIFxcYlxuICAgICAgICBpZiAodGhpcy5lYXQoQ2lyY3VtZmxleEFjY2VudCkpIHtcbiAgICAgICAgICAgIHRoaXMub25FZGdlQXNzZXJ0aW9uKHN0YXJ0LCB0aGlzLmluZGV4LCBcInN0YXJ0XCIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVhdChEb2xsYXJTaWduKSkge1xuICAgICAgICAgICAgdGhpcy5vbkVkZ2VBc3NlcnRpb24oc3RhcnQsIHRoaXMuaW5kZXgsIFwiZW5kXCIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVhdDIoUmV2ZXJzZVNvbGlkdXMsIExhdGluQ2FwaXRhbExldHRlckIpKSB7XG4gICAgICAgICAgICB0aGlzLm9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uKHN0YXJ0LCB0aGlzLmluZGV4LCBcIndvcmRcIiwgdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0MihSZXZlcnNlU29saWR1cywgTGF0aW5TbWFsbExldHRlckIpKSB7XG4gICAgICAgICAgICB0aGlzLm9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uKHN0YXJ0LCB0aGlzLmluZGV4LCBcIndvcmRcIiwgZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9va2FoZWFkIC8gTG9va2JlaGluZFxuICAgICAgICBpZiAodGhpcy5lYXQyKExlZnRQYXJlbnRoZXNpcywgUXVlc3Rpb25NYXJrKSkge1xuICAgICAgICAgICAgY29uc3QgbG9va2JlaGluZCA9XG4gICAgICAgICAgICAgICAgdGhpcy5lY21hVmVyc2lvbiA+PSAyMDE4ICYmIHRoaXMuZWF0KExlc3NUaGFuU2lnbilcbiAgICAgICAgICAgIGxldCBuZWdhdGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHRoaXMuZWF0KEVxdWFsc1NpZ24pIHx8IChuZWdhdGUgPSB0aGlzLmVhdChFeGNsYW1hdGlvbk1hcmspKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtpbmQgPSBsb29rYmVoaW5kID8gXCJsb29rYmVoaW5kXCIgOiBcImxvb2thaGVhZFwiXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvb2thcm91bmRBc3NlcnRpb25FbnRlcihzdGFydCwga2luZCwgbmVnYXRlKVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzanVuY3Rpb24oKVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lYXQoUmlnaHRQYXJlbnRoZXNpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZShcIlVudGVybWluYXRlZCBncm91cFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0QXNzZXJ0aW9uSXNRdWFudGlmaWFibGUgPSAhbG9va2JlaGluZCAmJiAhdGhpcy5zdHJpY3RcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9va2Fyb3VuZEFzc2VydGlvbkxlYXZlKHN0YXJ0LCB0aGlzLmluZGV4LCBraW5kLCBuZWdhdGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmV3aW5kKHN0YXJ0KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtUXVhbnRpZmllclxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLVF1YW50aWZpZXJQcmVmaXhcbiAgICBwcml2YXRlIGVhdFF1YW50aWZpZXIobm9FcnJvciA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICBsZXQgbWluID0gMFxuICAgICAgICBsZXQgbWF4ID0gMFxuICAgICAgICBsZXQgZ3JlZWR5ID0gZmFsc2VcblxuICAgICAgICBpZiAodGhpcy5lYXQoQXN0ZXJpc2spKSB7XG4gICAgICAgICAgICBtaW4gPSAwXG4gICAgICAgICAgICBtYXggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVhdChQbHVzU2lnbikpIHtcbiAgICAgICAgICAgIG1pbiA9IDFcbiAgICAgICAgICAgIG1heCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWF0KFF1ZXN0aW9uTWFyaykpIHtcbiAgICAgICAgICAgIG1pbiA9IDBcbiAgICAgICAgICAgIG1heCA9IDFcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVhdEJyYWNlZFF1YW50aWZpZXIobm9FcnJvcikpIHtcbiAgICAgICAgICAgIG1pbiA9IHRoaXMuX2xhc3RNaW5WYWx1ZVxuICAgICAgICAgICAgbWF4ID0gdGhpcy5fbGFzdE1heFZhbHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBncmVlZHkgPSAhdGhpcy5lYXQoUXVlc3Rpb25NYXJrKVxuXG4gICAgICAgIGlmICghbm9FcnJvcikge1xuICAgICAgICAgICAgdGhpcy5vblF1YW50aWZpZXIoc3RhcnQsIHRoaXMuaW5kZXgsIG1pbiwgbWF4LCBncmVlZHkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBwcml2YXRlIGVhdEJyYWNlZFF1YW50aWZpZXIobm9FcnJvcjogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgaWYgKHRoaXMuZWF0KExlZnRDdXJseUJyYWNrZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0TWluVmFsdWUgPSAwXG4gICAgICAgICAgICB0aGlzLl9sYXN0TWF4VmFsdWUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcbiAgICAgICAgICAgIGlmICh0aGlzLmVhdERlY2ltYWxEaWdpdHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RNaW5WYWx1ZSA9IHRoaXMuX2xhc3RNYXhWYWx1ZSA9IHRoaXMuX2xhc3RJbnRWYWx1ZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVhdChDb21tYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdE1heFZhbHVlID0gdGhpcy5lYXREZWNpbWFsRGlnaXRzKClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5fbGFzdEludFZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lYXQoUmlnaHRDdXJseUJyYWNrZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9FcnJvciAmJiB0aGlzLl9sYXN0TWF4VmFsdWUgPCB0aGlzLl9sYXN0TWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJudW1iZXJzIG91dCBvZiBvcmRlciBpbiB7fSBxdWFudGlmaWVyXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5vRXJyb3IgJiYgdGhpcy5zdHJpY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW5jb21wbGV0ZSBxdWFudGlmaWVyXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1BdG9tXG4gICAgcHJpdmF0ZSBlYXRBdG9tKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5lYXRQYXR0ZXJuQ2hhcmFjdGVyKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0RG90KCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0UmV2ZXJzZVNvbGlkdXNBdG9tRXNjYXBlKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0Q2hhcmFjdGVyQ2xhc3MoKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRVbmNhcHR1cmluZ0dyb3VwKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0Q2FwdHVyaW5nR3JvdXAoKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlYXREb3QoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVhdChGdWxsU3RvcCkpIHtcbiAgICAgICAgICAgIHRoaXMub25BbnlDaGFyYWN0ZXJTZXQodGhpcy5pbmRleCAtIDEsIHRoaXMuaW5kZXgsIFwiYW55XCIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgZWF0UmV2ZXJzZVNvbGlkdXNBdG9tRXNjYXBlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgaWYgKHRoaXMuZWF0KFJldmVyc2VTb2xpZHVzKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWF0QXRvbUVzY2FwZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmV3aW5kKHN0YXJ0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgZWF0VW5jYXB0dXJpbmdHcm91cCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGlmICh0aGlzLmVhdDMoTGVmdFBhcmVudGhlc2lzLCBRdWVzdGlvbk1hcmssIENvbG9uKSkge1xuICAgICAgICAgICAgdGhpcy5vbkdyb3VwRW50ZXIoc3RhcnQpXG4gICAgICAgICAgICB0aGlzLmRpc2p1bmN0aW9uKClcbiAgICAgICAgICAgIGlmICghdGhpcy5lYXQoUmlnaHRQYXJlbnRoZXNpcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiVW50ZXJtaW5hdGVkIGdyb3VwXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uR3JvdXBMZWF2ZShzdGFydCwgdGhpcy5pbmRleClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlYXRDYXB0dXJpbmdHcm91cCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGlmICh0aGlzLmVhdChMZWZ0UGFyZW50aGVzaXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgPSBcIlwiXG4gICAgICAgICAgICBpZiAodGhpcy5lY21hVmVyc2lvbiA+PSAyMDE4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cFNwZWNpZmllcigpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudENvZGVQb2ludCA9PT0gUXVlc3Rpb25NYXJrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWlzZShcIkludmFsaWQgZ3JvdXBcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9sYXN0U3RyVmFsdWUgfHwgbnVsbFxuXG4gICAgICAgICAgICB0aGlzLm9uQ2FwdHVyaW5nR3JvdXBFbnRlcihzdGFydCwgbmFtZSlcbiAgICAgICAgICAgIHRoaXMuZGlzanVuY3Rpb24oKVxuICAgICAgICAgICAgaWYgKCF0aGlzLmVhdChSaWdodFBhcmVudGhlc2lzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJVbnRlcm1pbmF0ZWQgZ3JvdXBcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25DYXB0dXJpbmdHcm91cExlYXZlKHN0YXJ0LCB0aGlzLmluZGV4LCBuYW1lKVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1FeHRlbmRlZEF0b21cbiAgICBwcml2YXRlIGVhdEV4dGVuZGVkQXRvbSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuZWF0RG90KCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0UmV2ZXJzZVNvbGlkdXNBdG9tRXNjYXBlKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0UmV2ZXJzZVNvbGlkdXNGb2xsb3dlZEJ5QygpIHx8XG4gICAgICAgICAgICB0aGlzLmVhdENoYXJhY3RlckNsYXNzKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0VW5jYXB0dXJpbmdHcm91cCgpIHx8XG4gICAgICAgICAgICB0aGlzLmVhdENhcHR1cmluZ0dyb3VwKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0SW52YWxpZEJyYWNlZFF1YW50aWZpZXIoKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRFeHRlbmRlZFBhdHRlcm5DaGFyYWN0ZXIoKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgLy8gXFwgW2xvb2thaGVhZCA9IGNdXG4gICAgcHJpdmF0ZSBlYXRSZXZlcnNlU29saWR1c0ZvbGxvd2VkQnlDKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb2RlUG9pbnQgPT09IFJldmVyc2VTb2xpZHVzICYmXG4gICAgICAgICAgICB0aGlzLm5leHRDb2RlUG9pbnQgPT09IExhdGluU21hbGxMZXR0ZXJDXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gdGhpcy5jdXJyZW50Q29kZVBvaW50XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3Rlcih0aGlzLmluZGV4IC0gMSwgdGhpcy5pbmRleCwgUmV2ZXJzZVNvbGlkdXMpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1JbnZhbGlkQnJhY2VkUXVhbnRpZmllclxuICAgIHByaXZhdGUgZWF0SW52YWxpZEJyYWNlZFF1YW50aWZpZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVhdEJyYWNlZFF1YW50aWZpZXIodHJ1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmFpc2UoXCJOb3RoaW5nIHRvIHJlcGVhdFwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLVN5bnRheENoYXJhY3RlclxuICAgIHByaXZhdGUgZWF0U3ludGF4Q2hhcmFjdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNTeW50YXhDaGFyYWN0ZXIodGhpcy5jdXJyZW50Q29kZVBvaW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gdGhpcy5jdXJyZW50Q29kZVBvaW50XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1QYXR0ZXJuQ2hhcmFjdGVyXG4gICAgcHJpdmF0ZSBlYXRQYXR0ZXJuQ2hhcmFjdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgY29uc3QgY3AgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgaWYgKGNwICE9PSAtMSAmJiAhaXNTeW50YXhDaGFyYWN0ZXIoY3ApKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihzdGFydCwgdGhpcy5pbmRleCwgY3ApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1FeHRlbmRlZFBhdHRlcm5DaGFyYWN0ZXJcbiAgICBwcml2YXRlIGVhdEV4dGVuZGVkUGF0dGVybkNoYXJhY3RlcigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGNvbnN0IGNwID0gdGhpcy5jdXJyZW50Q29kZVBvaW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNwICE9PSAtMSAmJlxuICAgICAgICAgICAgY3AgIT09IENpcmN1bWZsZXhBY2NlbnQgJiZcbiAgICAgICAgICAgIGNwICE9PSBEb2xsYXJTaWduICYmXG4gICAgICAgICAgICBjcCAhPT0gUmV2ZXJzZVNvbGlkdXMgJiZcbiAgICAgICAgICAgIGNwICE9PSBGdWxsU3RvcCAmJlxuICAgICAgICAgICAgY3AgIT09IEFzdGVyaXNrICYmXG4gICAgICAgICAgICBjcCAhPT0gUGx1c1NpZ24gJiZcbiAgICAgICAgICAgIGNwICE9PSBRdWVzdGlvbk1hcmsgJiZcbiAgICAgICAgICAgIGNwICE9PSBMZWZ0UGFyZW50aGVzaXMgJiZcbiAgICAgICAgICAgIGNwICE9PSBSaWdodFBhcmVudGhlc2lzICYmXG4gICAgICAgICAgICBjcCAhPT0gTGVmdFNxdWFyZUJyYWNrZXQgJiZcbiAgICAgICAgICAgIGNwICE9PSBWZXJ0aWNhbExpbmVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihzdGFydCwgdGhpcy5pbmRleCwgY3ApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEdyb3VwU3BlY2lmaWVyW1VdIDo6XG4gICAgLy8gICBbZW1wdHldXG4gICAgLy8gICBgP2AgR3JvdXBOYW1lWz9VXVxuICAgIHByaXZhdGUgZ3JvdXBTcGVjaWZpZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xhc3RTdHJWYWx1ZSA9IFwiXCJcbiAgICAgICAgaWYgKHRoaXMuZWF0KFF1ZXN0aW9uTWFyaykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVhdEdyb3VwTmFtZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9ncm91cE5hbWVzLmhhcyh0aGlzLl9sYXN0U3RyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwTmFtZXMuYWRkKHRoaXMuX2xhc3RTdHJWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJEdXBsaWNhdGUgY2FwdHVyZSBncm91cCBuYW1lXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBncm91cFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gR3JvdXBOYW1lW1VdIDo6XG4gICAgLy8gICBgPGAgUmVnRXhwSWRlbnRpZmllck5hbWVbP1VdIGA+YFxuICAgIHByaXZhdGUgZWF0R3JvdXBOYW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgPSBcIlwiXG4gICAgICAgIGlmICh0aGlzLmVhdChMZXNzVGhhblNpZ24pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lYXRSZWdFeHBJZGVudGlmaWVyTmFtZSgpICYmIHRoaXMuZWF0KEdyZWF0ZXJUaGFuU2lnbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yYWlzZShcIkludmFsaWQgY2FwdHVyZSBncm91cCBuYW1lXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gUmVnRXhwSWRlbnRpZmllck5hbWVbVV0gOjpcbiAgICAvLyAgIFJlZ0V4cElkZW50aWZpZXJTdGFydFs/VV1cbiAgICAvLyAgIFJlZ0V4cElkZW50aWZpZXJOYW1lWz9VXSBSZWdFeHBJZGVudGlmaWVyUGFydFs/VV1cbiAgICBwcml2YXRlIGVhdFJlZ0V4cElkZW50aWZpZXJOYW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgPSBcIlwiXG4gICAgICAgIGlmICh0aGlzLmVhdFJlZ0V4cElkZW50aWZpZXJTdGFydCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgKz0gU3RyaW5nLmZyb21Db2RlUG9pbnQodGhpcy5fbGFzdEludFZhbHVlKVxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZWF0UmVnRXhwSWRlbnRpZmllclBhcnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RTdHJWYWx1ZSArPSBTdHJpbmcuZnJvbUNvZGVQb2ludCh0aGlzLl9sYXN0SW50VmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIFJlZ0V4cElkZW50aWZpZXJTdGFydFtVXSA6OlxuICAgIC8vICAgVW5pY29kZUlEU3RhcnRcbiAgICAvLyAgIGAkYFxuICAgIC8vICAgYF9gXG4gICAgLy8gICBgXFxgIFJlZ0V4cFVuaWNvZGVFc2NhcGVTZXF1ZW5jZVs/VV1cbiAgICBwcml2YXRlIGVhdFJlZ0V4cElkZW50aWZpZXJTdGFydCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGxldCBjcCA9IHRoaXMuY3VycmVudENvZGVQb2ludFxuICAgICAgICB0aGlzLmFkdmFuY2UoKVxuXG4gICAgICAgIGlmIChjcCA9PT0gUmV2ZXJzZVNvbGlkdXMgJiYgdGhpcy5lYXRSZWdFeHBVbmljb2RlRXNjYXBlU2VxdWVuY2UoKSkge1xuICAgICAgICAgICAgY3AgPSB0aGlzLl9sYXN0SW50VmFsdWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWdFeHBJZGVudGlmaWVyU3RhcnQoY3ApKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSBjcFxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluZGV4ICE9PSBzdGFydCkge1xuICAgICAgICAgICAgdGhpcy5yZXdpbmQoc3RhcnQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gUmVnRXhwSWRlbnRpZmllclBhcnRbVV0gOjpcbiAgICAvLyAgIFVuaWNvZGVJRENvbnRpbnVlXG4gICAgLy8gICBgJGBcbiAgICAvLyAgIGBfYFxuICAgIC8vICAgYFxcYCBSZWdFeHBVbmljb2RlRXNjYXBlU2VxdWVuY2VbP1VdXG4gICAgLy8gICA8Wnduaj5cbiAgICAvLyAgIDxad2o+XG4gICAgcHJpdmF0ZSBlYXRSZWdFeHBJZGVudGlmaWVyUGFydCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGxldCBjcCA9IHRoaXMuY3VycmVudENvZGVQb2ludFxuICAgICAgICB0aGlzLmFkdmFuY2UoKVxuXG4gICAgICAgIGlmIChjcCA9PT0gUmV2ZXJzZVNvbGlkdXMgJiYgdGhpcy5lYXRSZWdFeHBVbmljb2RlRXNjYXBlU2VxdWVuY2UoKSkge1xuICAgICAgICAgICAgY3AgPSB0aGlzLl9sYXN0SW50VmFsdWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNSZWdFeHBJZGVudGlmaWVyUGFydChjcCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IGNwXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5kZXggIT09IHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1zdHJpY3QtQXRvbUVzY2FwZVxuICAgIHByaXZhdGUgZWF0QXRvbUVzY2FwZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5lYXRCYWNrcmVmZXJlbmNlKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZWF0Q2hhcmFjdGVyQ2xhc3NFc2NhcGUoKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRDaGFyYWN0ZXJFc2NhcGUoKSB8fFxuICAgICAgICAgICAgKHRoaXMuX25GbGFnICYmIHRoaXMuZWF0S0dyb3VwTmFtZSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RyaWN0IHx8IHRoaXMuX3VGbGFnKSB7XG4gICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBlc2NhcGVcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIGVhdEJhY2tyZWZlcmVuY2UoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICBpZiAodGhpcy5lYXREZWNpbWFsRXNjYXBlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSB0aGlzLl9sYXN0SW50VmFsdWVcbiAgICAgICAgICAgIGlmIChuIDw9IHRoaXMuX251bUNhcHR1cmluZ1BhcmVucykge1xuICAgICAgICAgICAgICAgIHRoaXMub25CYWNrcmVmZXJlbmNlKHN0YXJ0IC0gMSwgdGhpcy5pbmRleCwgbilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWlzZShcIkludmFsaWQgZXNjYXBlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIGVhdEtHcm91cE5hbWUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICBpZiAodGhpcy5lYXQoTGF0aW5TbWFsbExldHRlckspKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lYXRHcm91cE5hbWUoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMuX2xhc3RTdHJWYWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tyZWZlcmVuY2VOYW1lcy5hZGQoZ3JvdXBOYW1lKVxuICAgICAgICAgICAgICAgIHRoaXMub25CYWNrcmVmZXJlbmNlKHN0YXJ0IC0gMSwgdGhpcy5pbmRleCwgZ3JvdXBOYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBuYW1lZCByZWZlcmVuY2VcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1zdHJpY3QtQ2hhcmFjdGVyRXNjYXBlXG4gICAgcHJpdmF0ZSBlYXRDaGFyYWN0ZXJFc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmVhdENvbnRyb2xFc2NhcGUoKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRDQ29udHJvbExldHRlcigpIHx8XG4gICAgICAgICAgICB0aGlzLmVhdFplcm8oKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRIZXhFc2NhcGVTZXF1ZW5jZSgpIHx8XG4gICAgICAgICAgICB0aGlzLmVhdFJlZ0V4cFVuaWNvZGVFc2NhcGVTZXF1ZW5jZSgpIHx8XG4gICAgICAgICAgICAoIXRoaXMuc3RyaWN0ICYmIHRoaXMuZWF0TGVnYWN5T2N0YWxFc2NhcGVTZXF1ZW5jZSgpKSB8fFxuICAgICAgICAgICAgdGhpcy5lYXRJZGVudGl0eUVzY2FwZSgpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihzdGFydCAtIDEsIHRoaXMuaW5kZXgsIHRoaXMuX2xhc3RJbnRWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlYXRDQ29udHJvbExldHRlcigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpblNtYWxsTGV0dGVyQykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVhdENvbnRyb2xMZXR0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBwcml2YXRlIGVhdFplcm8oKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENvZGVQb2ludCA9PT0gRGlnaXRaZXJvICYmXG4gICAgICAgICAgICAhaXNEZWNpbWFsRGlnaXQodGhpcy5uZXh0Q29kZVBvaW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IDBcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLUNvbnRyb2xFc2NhcGVcbiAgICBwcml2YXRlIGVhdENvbnRyb2xFc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpblNtYWxsTGV0dGVyVCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IENoYXJhY3RlclRhYnVsYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJOKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gTGluZUZlZWRcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJWKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gTGluZVRhYnVsYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJGKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gRm9ybUZlZWRcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJSKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gQ2FycmlhZ2VSZXR1cm5cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtQ29udHJvbExldHRlclxuICAgIHByaXZhdGUgZWF0Q29udHJvbExldHRlcigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY3AgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgaWYgKGlzTGF0aW5MZXR0ZXIoY3ApKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gY3AgJSAweDIwXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLVJlZ0V4cFVuaWNvZGVFc2NhcGVTZXF1ZW5jZVxuICAgIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBwcml2YXRlIGVhdFJlZ0V4cFVuaWNvZGVFc2NhcGVTZXF1ZW5jZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG5cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJVKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWF0Rml4ZWRIZXhEaWdpdHMoNCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWFkID0gdGhpcy5fbGFzdEludFZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VGbGFnICYmIGxlYWQgPj0gMHhkODAwICYmIGxlYWQgPD0gMHhkYmZmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlYWRTdXJyb2dhdGVFbmQgPSB0aGlzLmluZGV4XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWF0KFJldmVyc2VTb2xpZHVzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXQoTGF0aW5TbWFsbExldHRlclUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVhdEZpeGVkSGV4RGlnaXRzKDQpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhaWwgPSB0aGlzLl9sYXN0SW50VmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFpbCA+PSAweGRjMDAgJiYgdHJhaWwgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxlYWQgLSAweGQ4MDApICogMHg0MDAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHJhaWwgLSAweGRjMDApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgxMDAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdpbmQobGVhZFN1cnJvZ2F0ZUVuZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gbGVhZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuX3VGbGFnICYmXG4gICAgICAgICAgICAgICAgdGhpcy5lYXQoTGVmdEN1cmx5QnJhY2tldCkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmVhdEhleERpZ2l0cygpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5lYXQoUmlnaHRDdXJseUJyYWNrZXQpICYmXG4gICAgICAgICAgICAgICAgaXNWYWxpZFVuaWNvZGUodGhpcy5fbGFzdEludFZhbHVlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0cmljdCB8fCB0aGlzLl91RmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJJbnZhbGlkIHVuaWNvZGUgZXNjYXBlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1JZGVudGl0eUVzY2FwZVxuICAgIHByaXZhdGUgZWF0SWRlbnRpdHlFc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl91RmxhZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWF0U3ludGF4Q2hhcmFjdGVyKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZWF0KFNvbGlkdXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gU29saWR1c1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRJZGVudGl0eUVzY2FwZSh0aGlzLmN1cnJlbnRDb2RlUG9pbnQpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgaXNWYWxpZElkZW50aXR5RXNjYXBlKGNwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNwID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWlzSWRDb250aW51ZShjcClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgY3AgIT09IExhdGluU21hbGxMZXR0ZXJDICYmXG4gICAgICAgICAgICAoIXRoaXMuX25GbGFnIHx8IGNwICE9PSBMYXRpblNtYWxsTGV0dGVySylcbiAgICAgICAgKVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLURlY2ltYWxFc2NhcGVcbiAgICBwcml2YXRlIGVhdERlY2ltYWxFc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IDBcbiAgICAgICAgbGV0IGNwID0gdGhpcy5jdXJyZW50Q29kZVBvaW50XG4gICAgICAgIGlmIChjcCA+PSBEaWdpdE9uZSAmJiBjcCA8PSBEaWdpdE5pbmUpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSAxMCAqIHRoaXMuX2xhc3RJbnRWYWx1ZSArIChjcCAtIERpZ2l0WmVybylcbiAgICAgICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgfSB3aGlsZSAoXG4gICAgICAgICAgICAgICAgKGNwID0gdGhpcy5jdXJyZW50Q29kZVBvaW50KSA+PSBEaWdpdFplcm8gJiZcbiAgICAgICAgICAgICAgICBjcCA8PSBEaWdpdE5pbmVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtQ2hhcmFjdGVyQ2xhc3NFc2NhcGVcbiAgICBwcml2YXRlIGVhdENoYXJhY3RlckNsYXNzRXNjYXBlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcblxuICAgICAgICBpZiAodGhpcy5lYXQoTGF0aW5TbWFsbExldHRlckQpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSAtMVxuICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUNoYXJhY3RlclNldChzdGFydCAtIDEsIHRoaXMuaW5kZXgsIFwiZGlnaXRcIiwgZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpbkNhcGl0YWxMZXR0ZXJEKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gLTFcbiAgICAgICAgICAgIHRoaXMub25Fc2NhcGVDaGFyYWN0ZXJTZXQoc3RhcnQgLSAxLCB0aGlzLmluZGV4LCBcImRpZ2l0XCIsIHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpblNtYWxsTGV0dGVyUykpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IC0xXG4gICAgICAgICAgICB0aGlzLm9uRXNjYXBlQ2hhcmFjdGVyU2V0KHN0YXJ0IC0gMSwgdGhpcy5pbmRleCwgXCJzcGFjZVwiLCBmYWxzZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluQ2FwaXRhbExldHRlclMpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSAtMVxuICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUNoYXJhY3RlclNldChzdGFydCAtIDEsIHRoaXMuaW5kZXgsIFwic3BhY2VcIiwgdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJXKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gLTFcbiAgICAgICAgICAgIHRoaXMub25Fc2NhcGVDaGFyYWN0ZXJTZXQoc3RhcnQgLSAxLCB0aGlzLmluZGV4LCBcIndvcmRcIiwgZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpbkNhcGl0YWxMZXR0ZXJXKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gLTFcbiAgICAgICAgICAgIHRoaXMub25Fc2NhcGVDaGFyYWN0ZXJTZXQoc3RhcnQgLSAxLCB0aGlzLmluZGV4LCBcIndvcmRcIiwgdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVnYXRlID0gZmFsc2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdUZsYWcgJiZcbiAgICAgICAgICAgIHRoaXMuZWNtYVZlcnNpb24gPj0gMjAxOCAmJlxuICAgICAgICAgICAgKHRoaXMuZWF0KExhdGluU21hbGxMZXR0ZXJQKSB8fFxuICAgICAgICAgICAgICAgIChuZWdhdGUgPSB0aGlzLmVhdChMYXRpbkNhcGl0YWxMZXR0ZXJQKSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gLTFcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmVhdChMZWZ0Q3VybHlCcmFja2V0KSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZWF0VW5pY29kZVByb3BlcnR5VmFsdWVFeHByZXNzaW9uKCkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmVhdChSaWdodEN1cmx5QnJhY2tldClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQoXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0eVwiLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0S2V5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RWYWxWYWx1ZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBwcm9wZXJ0eSBuYW1lXCIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBVbmljb2RlUHJvcGVydHlWYWx1ZUV4cHJlc3Npb24gOjpcbiAgICAvLyAgIFVuaWNvZGVQcm9wZXJ0eU5hbWUgYD1gIFVuaWNvZGVQcm9wZXJ0eVZhbHVlXG4gICAgLy8gICBMb25lVW5pY29kZVByb3BlcnR5TmFtZU9yVmFsdWVcbiAgICBwcml2YXRlIGVhdFVuaWNvZGVQcm9wZXJ0eVZhbHVlRXhwcmVzc2lvbigpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG5cbiAgICAgICAgLy8gVW5pY29kZVByb3BlcnR5TmFtZSBgPWAgVW5pY29kZVByb3BlcnR5VmFsdWVcbiAgICAgICAgaWYgKHRoaXMuZWF0VW5pY29kZVByb3BlcnR5TmFtZSgpICYmIHRoaXMuZWF0KEVxdWFsc1NpZ24pKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0S2V5VmFsdWUgPSB0aGlzLl9sYXN0U3RyVmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLmVhdFVuaWNvZGVQcm9wZXJ0eVZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0VmFsVmFsdWUgPSB0aGlzLl9sYXN0U3RyVmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWRVbmljb2RlUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0S2V5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0VmFsVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yYWlzZShcIkludmFsaWQgcHJvcGVydHkgbmFtZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmV3aW5kKHN0YXJ0KVxuXG4gICAgICAgIC8vIExvbmVVbmljb2RlUHJvcGVydHlOYW1lT3JWYWx1ZVxuICAgICAgICBpZiAodGhpcy5lYXRMb25lVW5pY29kZVByb3BlcnR5TmFtZU9yVmFsdWUoKSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZU9yVmFsdWUgPSB0aGlzLl9sYXN0U3RyVmFsdWVcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkVW5pY29kZVByb3BlcnR5KFwiR2VuZXJhbF9DYXRlZ29yeVwiLCBuYW1lT3JWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0S2V5VmFsdWUgPSBcIkdlbmVyYWxfQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RWYWxWYWx1ZSA9IG5hbWVPclZhbHVlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1ZhbGlkVW5pY29kZVByb3BlcnR5TmFtZShuYW1lT3JWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0S2V5VmFsdWUgPSBuYW1lT3JWYWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RWYWxWYWx1ZSA9IFwiXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yYWlzZShcIkludmFsaWQgcHJvcGVydHkgbmFtZVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIFVuaWNvZGVQcm9wZXJ0eU5hbWUgOjpcbiAgICAvLyAgIFVuaWNvZGVQcm9wZXJ0eU5hbWVDaGFyYWN0ZXJzXG4gICAgcHJpdmF0ZSBlYXRVbmljb2RlUHJvcGVydHlOYW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgPSBcIlwiXG4gICAgICAgIHdoaWxlIChpc1VuaWNvZGVQcm9wZXJ0eU5hbWVDaGFyYWN0ZXIodGhpcy5jdXJyZW50Q29kZVBvaW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFN0clZhbHVlICs9IFN0cmluZy5mcm9tQ29kZVBvaW50KHRoaXMuY3VycmVudENvZGVQb2ludClcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RTdHJWYWx1ZSAhPT0gXCJcIlxuICAgIH1cblxuICAgIC8vIFVuaWNvZGVQcm9wZXJ0eVZhbHVlIDo6XG4gICAgLy8gICBVbmljb2RlUHJvcGVydHlWYWx1ZUNoYXJhY3RlcnNcbiAgICBwcml2YXRlIGVhdFVuaWNvZGVQcm9wZXJ0eVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9sYXN0U3RyVmFsdWUgPSBcIlwiXG4gICAgICAgIHdoaWxlIChpc1VuaWNvZGVQcm9wZXJ0eVZhbHVlQ2hhcmFjdGVyKHRoaXMuY3VycmVudENvZGVQb2ludCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTdHJWYWx1ZSArPSBTdHJpbmcuZnJvbUNvZGVQb2ludCh0aGlzLmN1cnJlbnRDb2RlUG9pbnQpXG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0U3RyVmFsdWUgIT09IFwiXCJcbiAgICB9XG5cbiAgICAvLyBMb25lVW5pY29kZVByb3BlcnR5TmFtZU9yVmFsdWUgOjpcbiAgICAvLyAgIFVuaWNvZGVQcm9wZXJ0eVZhbHVlQ2hhcmFjdGVyc1xuICAgIHByaXZhdGUgZWF0TG9uZVVuaWNvZGVQcm9wZXJ0eU5hbWVPclZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lYXRVbmljb2RlUHJvcGVydHlWYWx1ZSgpXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtQ2hhcmFjdGVyQ2xhc3NcbiAgICBwcml2YXRlIGVhdENoYXJhY3RlckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgaWYgKHRoaXMuZWF0KExlZnRTcXVhcmVCcmFja2V0KSkge1xuICAgICAgICAgICAgY29uc3QgbmVnYXRlID0gdGhpcy5lYXQoQ2lyY3VtZmxleEFjY2VudClcbiAgICAgICAgICAgIHRoaXMub25DaGFyYWN0ZXJDbGFzc0VudGVyKHN0YXJ0LCBuZWdhdGUpXG4gICAgICAgICAgICB0aGlzLmNsYXNzUmFuZ2VzKClcbiAgICAgICAgICAgIGlmICghdGhpcy5lYXQoUmlnaHRTcXVhcmVCcmFja2V0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJVbnRlcm1pbmF0ZWQgY2hhcmFjdGVyIGNsYXNzXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uQ2hhcmFjdGVyQ2xhc3NMZWF2ZShzdGFydCwgdGhpcy5pbmRleCwgbmVnYXRlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1DbGFzc1Jhbmdlc1xuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLU5vbmVtcHR5Q2xhc3NSYW5nZXNcbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1Ob25lbXB0eUNsYXNzUmFuZ2VzTm9EYXNoXG4gICAgcHJpdmF0ZSBjbGFzc1JhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5pbmRleFxuICAgICAgICB3aGlsZSAodGhpcy5lYXRDbGFzc0F0b20oKSkge1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2xhc3RJbnRWYWx1ZVxuICAgICAgICAgICAgY29uc3QgaHlwaGVuU3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgICAgICBpZiAodGhpcy5lYXQoSHlwaGVuTWludXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihoeXBoZW5TdGFydCwgdGhpcy5pbmRleCwgSHlwaGVuTWludXMpXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lYXRDbGFzc0F0b20oKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuX2xhc3RJbnRWYWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ID09PSAtMSB8fCByaWdodCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0cmljdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJJbnZhbGlkIGNoYXJhY3RlciBjbGFzc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9vcHRpb25zLmRpc2FibGVDaGtDaGFyYWN0ZXJDbGFzc1JhbmdlICYmIGxlZnQgPiByaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZShcIlJhbmdlIG91dCBvZiBvcmRlciBpbiBjaGFyYWN0ZXIgY2xhc3NcIilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFyYWN0ZXJDbGFzc1JhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1DbGFzc0F0b21cbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1DbGFzc0F0b21Ob0Rhc2hcbiAgICBwcml2YXRlIGVhdENsYXNzQXRvbSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG5cbiAgICAgICAgaWYgKHRoaXMuZWF0KFJldmVyc2VTb2xpZHVzKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWF0Q2xhc3NFc2NhcGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fdUZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaXNlKFwiSW52YWxpZCBlc2NhcGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmV3aW5kKHN0YXJ0KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3AgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgaWYgKGNwICE9PSAtMSAmJiBjcCAhPT0gUmlnaHRTcXVhcmVCcmFja2V0KSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gY3BcbiAgICAgICAgICAgIHRoaXMub25DaGFyYWN0ZXIoc3RhcnQsIHRoaXMuaW5kZXgsIGNwKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1DbGFzc0VzY2FwZVxuICAgIHByaXZhdGUgZWF0Q2xhc3NFc2NhcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbmRleFxuXG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpblNtYWxsTGV0dGVyQikpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IEJhY2tzcGFjZVxuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihzdGFydCAtIDEsIHRoaXMuaW5kZXgsIEJhY2tzcGFjZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdUZsYWcgJiYgdGhpcy5lYXQoSHlwaGVuTWludXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSBIeXBoZW5NaW51c1xuICAgICAgICAgICAgdGhpcy5vbkNoYXJhY3RlcihzdGFydCAtIDEsIHRoaXMuaW5kZXgsIEh5cGhlbk1pbnVzKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fdUZsYWcgJiYgdGhpcy5lYXQoTGF0aW5TbWFsbExldHRlckMpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lYXRDbGFzc0NvbnRyb2xMZXR0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFyYWN0ZXIoc3RhcnQgLSAxLCB0aGlzLmluZGV4LCB0aGlzLl9sYXN0SW50VmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmV3aW5kKHN0YXJ0KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWF0Q2hhcmFjdGVyQ2xhc3NFc2NhcGUoKSB8fCB0aGlzLmVhdENoYXJhY3RlckVzY2FwZSgpXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2Qtc3RyaWN0LUNsYXNzQ29udHJvbExldHRlclxuICAgIHByaXZhdGUgZWF0Q2xhc3NDb250cm9sTGV0dGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjcCA9IHRoaXMuY3VycmVudENvZGVQb2ludFxuICAgICAgICBpZiAoaXNEZWNpbWFsRGlnaXQoY3ApIHx8IGNwID09PSBMb3dMaW5lKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gY3AgJSAweDIwXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLUhleEVzY2FwZVNlcXVlbmNlXG4gICAgcHJpdmF0ZSBlYXRIZXhFc2NhcGVTZXF1ZW5jZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIGlmICh0aGlzLmVhdChMYXRpblNtYWxsTGV0dGVyWCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVhdEZpeGVkSGV4RGlnaXRzKDIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl91RmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMucmFpc2UoXCJJbnZhbGlkIGVzY2FwZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXdpbmQoc3RhcnQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtRGVjaW1hbERpZ2l0c1xuICAgIHByaXZhdGUgZWF0RGVjaW1hbERpZ2l0cygpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG5cbiAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gMFxuICAgICAgICB3aGlsZSAoaXNEZWNpbWFsRGlnaXQodGhpcy5jdXJyZW50Q29kZVBvaW50KSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID1cbiAgICAgICAgICAgICAgICAxMCAqIHRoaXMuX2xhc3RJbnRWYWx1ZSArIGRpZ2l0VG9JbnQodGhpcy5jdXJyZW50Q29kZVBvaW50KVxuICAgICAgICAgICAgdGhpcy5hZHZhbmNlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4ICE9PSBzdGFydFxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLUhleERpZ2l0c1xuICAgIHByaXZhdGUgZWF0SGV4RGlnaXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW5kZXhcbiAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gMFxuICAgICAgICB3aGlsZSAoaXNIZXhEaWdpdCh0aGlzLmN1cnJlbnRDb2RlUG9pbnQpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPVxuICAgICAgICAgICAgICAgIDE2ICogdGhpcy5fbGFzdEludFZhbHVlICsgZGlnaXRUb0ludCh0aGlzLmN1cnJlbnRDb2RlUG9pbnQpXG4gICAgICAgICAgICB0aGlzLmFkdmFuY2UoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4ICE9PSBzdGFydFxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLXN0cmljdC1MZWdhY3lPY3RhbEVzY2FwZVNlcXVlbmNlXG4gICAgLy8gQWxsb3dzIG9ubHkgMC0zNzcob2N0YWwpIGkuZS4gMC0yNTUoZGVjaW1hbCkuXG4gICAgcHJpdmF0ZSBlYXRMZWdhY3lPY3RhbEVzY2FwZVNlcXVlbmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5lYXRPY3RhbERpZ2l0KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG4xID0gdGhpcy5fbGFzdEludFZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5lYXRPY3RhbERpZ2l0KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuMiA9IHRoaXMuX2xhc3RJbnRWYWx1ZVxuICAgICAgICAgICAgICAgIGlmIChuMSA8PSAzICYmIHRoaXMuZWF0T2N0YWxEaWdpdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IG4xICogNjQgKyBuMiAqIDggKyB0aGlzLl9sYXN0SW50VmFsdWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSBuMSAqIDggKyBuMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEludFZhbHVlID0gbjFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi84LjAvI3Byb2QtT2N0YWxEaWdpdFxuICAgIHByaXZhdGUgZWF0T2N0YWxEaWdpdCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY3AgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgaWYgKGlzT2N0YWxEaWdpdChjcCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSBjcCAtIERpZ2l0WmVyb1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0SW50VmFsdWUgPSAwXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvOC4wLyNwcm9kLUhleDREaWdpdHNcbiAgICAvLyBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1IZXhEaWdpdFxuICAgIC8vIEFuZCBIZXhEaWdpdCBIZXhEaWdpdCBpbiBodHRwczovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzguMC8jcHJvZC1IZXhFc2NhcGVTZXF1ZW5jZVxuICAgIHByaXZhdGUgZWF0Rml4ZWRIZXhEaWdpdHMobGVuZ3RoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmluZGV4XG4gICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgY3AgPSB0aGlzLmN1cnJlbnRDb2RlUG9pbnRcbiAgICAgICAgICAgIGlmICghaXNIZXhEaWdpdChjcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJld2luZChzdGFydClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnRWYWx1ZSA9IDE2ICogdGhpcy5fbGFzdEludFZhbHVlICsgZGlnaXRUb0ludChjcClcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG4iXX0=