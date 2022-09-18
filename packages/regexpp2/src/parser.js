"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpParser = void 0;
const util_1 = require("./util");
const validator_1 = require("./validator");
const DummyPattern = {};
const DummyFlags = {};
const DummyCapturingGroup = {};
/**
 * Convert given elements to an alternative.
 * This doesn't clone the array, so the return value is `elements` itself.
 * @param elements Elements to convert.
 */
function elementsToAlternative(elements, parent) {
    for (const element of elements) {
        (0, util_1.assert)(element.type !== "Disjunction" /* EnumTypeNode.Disjunction */);
        element.parent = parent;
    }
    return elements;
}
function addAlternativeElement(parent, node) {
    if (parent.type === "Disjunction" /* EnumTypeNode.Disjunction */) {
        (0, util_1.last)(parent.alternatives).push(node);
    }
    else {
        parent.elements.push(node);
    }
}
function addCommonElement(parent, node) {
    if (parent.type === "Disjunction" /* EnumTypeNode.Disjunction */) {
        (0, util_1.last)(parent.alternatives).push(node);
    }
    else if (parent.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
        parent.elements.push(node);
    }
    else {
        parent.elements.push(node);
    }
}
class RegExpParserState {
    constructor(options) {
        this._node = DummyPattern;
        this._flags = DummyFlags;
        this._disjunctionStartStack = [];
        this._backreferences = [];
        this._capturingGroups = [];
        this.source = "";
        this.strict = Boolean(options && options.strict);
        this.ecmaVersion = (options && options.ecmaVersion) || 2018 /* EnumEcmaVersion.v2018 */;
        this.disableChkCharacterClassRange = Boolean(options && options.disableChkCharacterClassRange);
    }
    get pattern() {
        if (this._node.type !== "Pattern" /* EnumTypeNode.Pattern */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        return this._node;
    }
    get flags() {
        if (this._flags.type !== "Flags" /* EnumTypeNode.Flags */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        return this._flags;
    }
    onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll) {
        this._flags = {
            type: "Flags" /* EnumTypeNode.Flags */,
            parent: null,
            start,
            end,
            raw: this.source.slice(start, end),
            global,
            ignoreCase,
            multiline,
            unicode,
            sticky,
            dotAll,
        };
    }
    onPatternEnter(start) {
        this._node = {
            type: "Pattern" /* EnumTypeNode.Pattern */,
            parent: null,
            start,
            end: start,
            raw: "",
            elements: [],
        };
        this._backreferences.length = 0;
        this._capturingGroups.length = 0;
    }
    onPatternLeave(start, end) {
        this._node.end = end;
        this._node.raw = this.source.slice(start, end);
        for (const reference of this._backreferences) {
            const ref = reference.ref;
            const group = typeof ref === "number"
                ? this._capturingGroups[ref - 1]
                : this._capturingGroups.find(g => g.name === ref);
            reference.resolved = group;
            group.references.push(reference);
        }
    }
    onDisjunctionEnter(start) {
        this._disjunctionStartStack.push(start);
    }
    onDisjunctionLeave(start, end) {
        this._disjunctionStartStack.pop();
    }
    onAlternativeEnter(start, index) {
        if (index === 0) {
            return;
        }
        const parentNode = this._node;
        if (parentNode.type === "Disjunction" /* EnumTypeNode.Disjunction */ ||
            parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        const prevNode = (0, util_1.last)(parentNode.elements);
        if (prevNode != null && prevNode.type === "Disjunction" /* EnumTypeNode.Disjunction */) {
            this._node = prevNode;
            prevNode.alternatives.push([]);
        }
        else {
            this._node = {
                type: "Disjunction" /* EnumTypeNode.Disjunction */,
                parent: parentNode,
                start: (0, util_1.last)(this._disjunctionStartStack),
                end: start,
                raw: "",
                alternatives: [],
            };
            const elements = elementsToAlternative(parentNode.elements, this._node);
            this._node.alternatives.push(elements, []);
            parentNode.elements = [this._node];
        }
    }
    onAlternativeLeave(start, end, index) {
        if (index === 0) {
            return;
        }
        this._node.end = end;
        this._node.raw = this.source.slice(this._node.start, end);
        this._node = this._node.parent;
    }
    onGroupEnter(start) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        this._node = {
            type: "Group" /* EnumTypeNode.Group */,
            parent: parentNode,
            start,
            end: start,
            raw: "",
            elements: [],
        };
        addAlternativeElement(parentNode, this._node);
    }
    onGroupLeave(start, end) {
        this._node.end = end;
        this._node.raw = this.source.slice(start, end);
        this._node = this._node.parent;
    }
    onCapturingGroupEnter(start, name) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        this._node = {
            type: "CapturingGroup" /* EnumTypeNode.CapturingGroup */,
            parent: parentNode,
            start,
            end: start,
            raw: "",
            name,
            elements: [],
            references: [],
        };
        addAlternativeElement(parentNode, this._node);
        this._capturingGroups.push(this._node);
    }
    onCapturingGroupLeave(start, end, name) {
        this._node.end = end;
        this._node.raw = this.source.slice(start, end);
        this._node = this._node.parent;
    }
    onQuantifier(start, end, min, max, greedy) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        // Replace the last element.
        const elements = parentNode.type === "Disjunction" /* EnumTypeNode.Disjunction */
            ? (0, util_1.last)(parentNode.alternatives)
            : parentNode.elements;
        const prevNode = elements.pop();
        const node = {
            type: "Quantifier" /* EnumTypeNode.Quantifier */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min,
            max,
            greedy,
            element: prevNode,
        };
        elements.push(node);
        prevNode.parent = node;
    }
    onLookaroundAssertionEnter(start, kind, negate) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        this._node = {
            type: "Assertion" /* EnumTypeNode.Assertion */,
            parent: parentNode,
            start,
            end: start,
            raw: "",
            kind,
            negate,
            elements: [],
        };
        addAlternativeElement(parentNode, this._node);
    }
    onLookaroundAssertionLeave(start, end, kind, negate) {
        this._node.end = end;
        this._node.raw = this.source.slice(start, end);
        this._node = this._node.parent;
    }
    onEdgeAssertion(start, end, kind) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "Assertion" /* EnumTypeNode.EdgeAssertion */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onWordBoundaryAssertion(start, end, kind, negate) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "Assertion" /* EnumTypeNode.WordBoundaryAssertion */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            negate,
        });
    }
    onAnyCharacterSet(start, end, kind) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "CharacterSet" /* EnumTypeNode.AnyCharacterSet */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onEscapeCharacterSet(start, end, kind, negate) {
        addCommonElement(this._node, {
            type: "CharacterSet" /* EnumTypeNode.EscapeCharacterSet */,
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            negate,
        });
    }
    onUnicodePropertyCharacterSet(start, end, kind, key, value, negate) {
        addCommonElement(this._node, {
            type: "CharacterSet" /* EnumTypeNode.UnicodePropertyCharacterSet */,
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
            key,
            value,
            negate,
        });
    }
    onCharacter(start, end, value) {
        addCommonElement(this._node, {
            type: "Character" /* EnumTypeNode.Character */,
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            value,
        });
    }
    onBackreference(start, end, ref) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        const node = {
            type: "Backreference" /* EnumTypeNode.Backreference */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            ref,
            resolved: DummyCapturingGroup,
        };
        addAlternativeElement(parentNode, node);
        this._backreferences.push(node);
    }
    onCharacterClassEnter(start, negate) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        this._node = {
            type: "CharacterClass" /* EnumTypeNode.CharacterClass */,
            parent: parentNode,
            start,
            end: start,
            raw: "",
            negate,
            elements: [],
        };
        addAlternativeElement(parentNode, this._node);
    }
    onCharacterClassLeave(start, end, negate) {
        this._node.end = end;
        this._node.raw = this.source.slice(start, end);
        this._node = this._node.parent;
    }
    onCharacterClassRange(start, end, min, max) {
        const parentNode = this._node;
        if (parentNode.type !== "CharacterClass" /* EnumTypeNode.CharacterClass */) {
            throw new Error("UnknownError" /* EnumError.UnknownError */);
        }
        // Replace the last three elements.
        const elements = parentNode.elements;
        const rightNode = elements.pop();
        elements.pop(); // hyphen
        const leftNode = elements.pop();
        const node = {
            type: "CharacterClassRange" /* EnumTypeNode.CharacterClassRange */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min: leftNode,
            max: rightNode,
        };
        (0, util_1.assert)(leftNode != null && leftNode.type === "Character" /* EnumTypeNode.Character */);
        (0, util_1.assert)(rightNode != null && rightNode.type === "Character" /* EnumTypeNode.Character */);
        leftNode.parent = node;
        rightNode.parent = node;
        elements.push(node);
    }
}
class RegExpParser {
    /**
     * Initialize this parser.
     * @param options The options of parser.
     */
    constructor(options) {
        this._state = new RegExpParserState(options);
        this._validator = new validator_1.RegExpValidator(this._state);
    }
    /**
     * Parse a regular expression literal. E.g. "/abc/g"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given regular expression.
     */
    parseLiteral(source, start = 0, end = source.length) {
        this._state.source = source;
        this._validator.validateLiteral(source, start, end);
        const pattern = this._state.pattern;
        const flags = this._state.flags;
        const literal = {
            type: "RegExpLiteral" /* EnumTypeNode.RegExpLiteral */,
            parent: null,
            start,
            end,
            raw: source,
            pattern,
            flags,
        };
        pattern.parent = literal;
        flags.parent = literal;
        return literal;
    }
    /**
     * Parse a regular expression flags. E.g. "gim"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given flags.
     */
    parseFlags(source, start = 0, end = source.length) {
        this._state.source = source;
        this._validator.validateFlags(source, start, end);
        return this._state.flags;
    }
    /**
     * Parse a regular expression pattern. E.g. "abc"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     * @returns The AST of the given pattern.
     */
    parsePattern(source, start = 0, end = source.length, uFlag = false) {
        this._state.source = source;
        this._validator.validatePattern(source, start, end, uFlag);
        return this._state.pattern;
    }
}
exports.RegExpParser = RegExpParser;
//# sourceMappingURL=parser.js.map