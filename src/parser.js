"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        util_1.assert(element.type !== "Disjunction" /* Disjunction */);
        element.parent = parent;
    }
    return elements;
}
function addAlternativeElement(parent, node) {
    if (parent.type === "Disjunction" /* Disjunction */) {
        util_1.last(parent.alternatives).push(node);
    }
    else {
        parent.elements.push(node);
    }
}
function addCommonElement(parent, node) {
    if (parent.type === "Disjunction" /* Disjunction */) {
        util_1.last(parent.alternatives).push(node);
    }
    else if (parent.type === "CharacterClass" /* CharacterClass */) {
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
        this.ecmaVersion = (options && options.ecmaVersion) || 2018 /* v2018 */;
        this.disableChkCharacterClassRange = Boolean(options && options.disableChkCharacterClassRange);
    }
    get pattern() {
        if (this._node.type !== "Pattern" /* Pattern */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        return this._node;
    }
    get flags() {
        if (this._flags.type !== "Flags" /* Flags */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        return this._flags;
    }
    onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll) {
        this._flags = {
            type: "Flags" /* Flags */,
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
            type: "Pattern" /* Pattern */,
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
        if (parentNode.type === "Disjunction" /* Disjunction */ ||
            parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        const prevNode = util_1.last(parentNode.elements);
        if (prevNode != null && prevNode.type === "Disjunction" /* Disjunction */) {
            this._node = prevNode;
            prevNode.alternatives.push([]);
        }
        else {
            this._node = {
                type: "Disjunction" /* Disjunction */,
                parent: parentNode,
                start: util_1.last(this._disjunctionStartStack),
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        this._node = {
            type: "Group" /* Group */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        this._node = {
            type: "CapturingGroup" /* CapturingGroup */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        // Replace the last element.
        const elements = parentNode.type === "Disjunction" /* Disjunction */
            ? util_1.last(parentNode.alternatives)
            : parentNode.elements;
        const prevNode = elements.pop();
        const node = {
            type: "Quantifier" /* Quantifier */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        this._node = {
            type: "Assertion" /* Assertion */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "Assertion" /* EdgeAssertion */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onWordBoundaryAssertion(start, end, kind, negate) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "Assertion" /* WordBoundaryAssertion */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        addAlternativeElement(parentNode, {
            type: "CharacterSet" /* AnyCharacterSet */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onEscapeCharacterSet(start, end, kind, negate) {
        addCommonElement(this._node, {
            type: "CharacterSet" /* EscapeCharacterSet */,
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
            type: "CharacterSet" /* UnicodePropertyCharacterSet */,
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
            type: "Character" /* Character */,
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            value,
        });
    }
    onBackreference(start, end, ref) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        const node = {
            type: "Backreference" /* Backreference */,
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
        if (parentNode.type === "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        this._node = {
            type: "CharacterClass" /* CharacterClass */,
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
        if (parentNode.type !== "CharacterClass" /* CharacterClass */) {
            throw new Error("UnknownError" /* UnknownError */);
        }
        // Replace the last three elements.
        const elements = parentNode.elements;
        const rightNode = elements.pop();
        elements.pop(); // hyphen
        const leftNode = elements.pop();
        const node = {
            type: "CharacterClassRange" /* CharacterClassRange */,
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min: leftNode,
            max: rightNode,
        };
        util_1.assert(leftNode != null && leftNode.type === "Character" /* Character */);
        util_1.assert(rightNode != null && rightNode.type === "Character" /* Character */);
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
            type: "RegExpLiteral" /* RegExpLiteral */,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUJBLGlDQUFxQztBQUNyQywyQ0FBNkM7QUFvQjdDLE1BQU0sWUFBWSxHQUFHLEVBQWEsQ0FBQTtBQUNsQyxNQUFNLFVBQVUsR0FBRyxFQUFXLENBQUE7QUFDOUIsTUFBTSxtQkFBbUIsR0FBRyxFQUFvQixDQUFBO0FBRWhEOzs7O0dBSUc7QUFDSCxTQUFTLHFCQUFxQixDQUMxQixRQUFtQixFQUNuQixNQUFtQjtJQUVuQixLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtRQUM1QixhQUFNLENBQUMsT0FBTyxDQUFDLElBQUksb0NBQTZCLENBQUMsQ0FBQTtRQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtLQUMxQjtJQUNELE9BQU8sUUFBZ0MsQ0FBQTtBQUMzQyxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FDMUIsTUFLeUIsRUFDekIsSUFPbUI7SUFFbkIsSUFBSSxNQUFNLENBQUMsSUFBSSxvQ0FBNkIsRUFBRTtRQUMxQyxXQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN4QztTQUFNO1FBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDN0I7QUFDTCxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FDckIsTUFBc0IsRUFDdEIsSUFBa0U7SUFFbEUsSUFBSSxNQUFNLENBQUMsSUFBSSxvQ0FBNkIsRUFBRTtRQUMxQyxXQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN4QztTQUFNLElBQUksTUFBTSxDQUFDLElBQUksMENBQWdDLEVBQUU7UUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDN0I7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QUUsS0FBSyxDQUFDLENBQUE7UUFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTtJQUM5QixDQUFDO0NBQ0o7QUE5RUQsb0NBOEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBbHRlcm5hdGl2ZUVsZW1lbnQsXG4gICAgQW55Q2hhcmFjdGVyU2V0LFxuICAgIEFzc2VydGlvbixcbiAgICBCYWNrcmVmZXJlbmNlLFxuICAgIENhcHR1cmluZ0dyb3VwLFxuICAgIENoYXJhY3RlcixcbiAgICBDaGFyYWN0ZXJDbGFzcyxcbiAgICBDaGFyYWN0ZXJDbGFzc1JhbmdlLFxuICAgIERpc2p1bmN0aW9uLFxuICAgIEVsZW1lbnQsXG4gICAgRXNjYXBlQ2hhcmFjdGVyU2V0LFxuICAgIEZsYWdzLFxuICAgIEdyb3VwLFxuICAgIExvb2thcm91bmRBc3NlcnRpb24sXG4gICAgUGF0dGVybixcbiAgICBRdWFudGlmaWFibGVFbGVtZW50LFxuICAgIFF1YW50aWZpZXIsXG4gICAgUmVnRXhwTGl0ZXJhbCxcbiAgICBVbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQsXG59IGZyb20gXCIuL2FzdFwiXG5pbXBvcnQgeyBhc3NlcnQsIGxhc3QgfSBmcm9tIFwiLi91dGlsXCJcbmltcG9ydCB7IFJlZ0V4cFZhbGlkYXRvciB9IGZyb20gXCIuL3ZhbGlkYXRvclwiXG5pbXBvcnQge1xuICAgIEVudW1FY21hVmVyc2lvbixcbiAgICBFbnVtRXJyb3IsXG4gICAgRW51bUtpbmRBc3NlcnRpb24sXG4gICAgRW51bUtpbmRDaGFyYWN0ZXJTZXQsXG4gICAgRW51bUtpbmRFZGdlQXNzZXJ0aW9uLFxuICAgIEVudW1LaW5kRXNjYXBlQ2hhcmFjdGVyU2V0LFxuICAgIEVudW1LaW5kTG9va0Fzc2VydGlvbixcbiAgICBFbnVtVHlwZU5vZGUsXG59IGZyb20gJy4vY29uc3QnO1xuXG5leHBvcnQgdHlwZSBBcHBlbmRhYmxlTm9kZSA9XG4gICAgfCBQYXR0ZXJuXG4gICAgfCBEaXNqdW5jdGlvblxuICAgIHwgR3JvdXBcbiAgICB8IENhcHR1cmluZ0dyb3VwXG4gICAgfCBDaGFyYWN0ZXJDbGFzc1xuICAgIHwgTG9va2Fyb3VuZEFzc2VydGlvblxuXG5jb25zdCBEdW1teVBhdHRlcm4gPSB7fSBhcyBQYXR0ZXJuXG5jb25zdCBEdW1teUZsYWdzID0ge30gYXMgRmxhZ3NcbmNvbnN0IER1bW15Q2FwdHVyaW5nR3JvdXAgPSB7fSBhcyBDYXB0dXJpbmdHcm91cFxuXG4vKipcbiAqIENvbnZlcnQgZ2l2ZW4gZWxlbWVudHMgdG8gYW4gYWx0ZXJuYXRpdmUuXG4gKiBUaGlzIGRvZXNuJ3QgY2xvbmUgdGhlIGFycmF5LCBzbyB0aGUgcmV0dXJuIHZhbHVlIGlzIGBlbGVtZW50c2AgaXRzZWxmLlxuICogQHBhcmFtIGVsZW1lbnRzIEVsZW1lbnRzIHRvIGNvbnZlcnQuXG4gKi9cbmZ1bmN0aW9uIGVsZW1lbnRzVG9BbHRlcm5hdGl2ZShcbiAgICBlbGVtZW50czogRWxlbWVudFtdLFxuICAgIHBhcmVudDogRGlzanVuY3Rpb24sXG4pOiBBbHRlcm5hdGl2ZUVsZW1lbnRbXSB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnR5cGUgIT09IEVudW1UeXBlTm9kZS5EaXNqdW5jdGlvbilcbiAgICAgICAgZWxlbWVudC5wYXJlbnQgPSBwYXJlbnRcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzIGFzIEFsdGVybmF0aXZlRWxlbWVudFtdXG59XG5cbmZ1bmN0aW9uIGFkZEFsdGVybmF0aXZlRWxlbWVudChcbiAgICBwYXJlbnQ6XG4gICAgICAgIHwgUGF0dGVyblxuICAgICAgICB8IERpc2p1bmN0aW9uXG4gICAgICAgIHwgR3JvdXBcbiAgICAgICAgfCBDYXB0dXJpbmdHcm91cFxuICAgICAgICB8IExvb2thcm91bmRBc3NlcnRpb24sXG4gICAgbm9kZTpcbiAgICAgICAgfCBHcm91cFxuICAgICAgICB8IENhcHR1cmluZ0dyb3VwXG4gICAgICAgIHwgUXVhbnRpZmllclxuICAgICAgICB8IENoYXJhY3RlckNsYXNzXG4gICAgICAgIHwgQXNzZXJ0aW9uXG4gICAgICAgIHwgQW55Q2hhcmFjdGVyU2V0XG4gICAgICAgIHwgQmFja3JlZmVyZW5jZSxcbik6IHZvaWQge1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gRW51bVR5cGVOb2RlLkRpc2p1bmN0aW9uKSB7XG4gICAgICAgIGxhc3QocGFyZW50LmFsdGVybmF0aXZlcykhLnB1c2gobm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuZWxlbWVudHMucHVzaChub2RlKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkQ29tbW9uRWxlbWVudChcbiAgICBwYXJlbnQ6IEFwcGVuZGFibGVOb2RlLFxuICAgIG5vZGU6IEVzY2FwZUNoYXJhY3RlclNldCB8IFVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldCB8IENoYXJhY3Rlcixcbik6IHZvaWQge1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gRW51bVR5cGVOb2RlLkRpc2p1bmN0aW9uKSB7XG4gICAgICAgIGxhc3QocGFyZW50LmFsdGVybmF0aXZlcykhLnB1c2gobm9kZSlcbiAgICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgcGFyZW50LmVsZW1lbnRzLnB1c2gobm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuZWxlbWVudHMucHVzaChub2RlKVxuICAgIH1cbn1cblxuY2xhc3MgUmVnRXhwUGFyc2VyU3RhdGUge1xuICAgIHJlYWRvbmx5IHN0cmljdDogYm9vbGVhblxuICAgIHJlYWRvbmx5IGVjbWFWZXJzaW9uOiBFbnVtRWNtYVZlcnNpb25cblxuICAgIHJlYWRvbmx5IGRpc2FibGVDaGtDaGFyYWN0ZXJDbGFzc1JhbmdlOiBib29sZWFuXG5cbiAgICBwcml2YXRlIF9ub2RlOiBBcHBlbmRhYmxlTm9kZSA9IER1bW15UGF0dGVyblxuICAgIHByaXZhdGUgX2ZsYWdzOiBGbGFncyA9IER1bW15RmxhZ3NcbiAgICBwcml2YXRlIF9kaXNqdW5jdGlvblN0YXJ0U3RhY2s6IG51bWJlcltdID0gW11cbiAgICBwcml2YXRlIF9iYWNrcmVmZXJlbmNlczogQmFja3JlZmVyZW5jZVtdID0gW11cbiAgICBwcml2YXRlIF9jYXB0dXJpbmdHcm91cHM6IENhcHR1cmluZ0dyb3VwW10gPSBbXVxuXG4gICAgc291cmNlOiBzdHJpbmcgPSBcIlwiXG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogUmVnRXhwUGFyc2VyLk9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5zdHJpY3QgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5zdHJpY3QpXG4gICAgICAgIHRoaXMuZWNtYVZlcnNpb24gPSAob3B0aW9ucyAmJiBvcHRpb25zLmVjbWFWZXJzaW9uKSB8fCBFbnVtRWNtYVZlcnNpb24udjIwMThcbiAgICAgICAgdGhpcy5kaXNhYmxlQ2hrQ2hhcmFjdGVyQ2xhc3NSYW5nZSA9IEJvb2xlYW4ob3B0aW9ucyAmJiBvcHRpb25zLmRpc2FibGVDaGtDaGFyYWN0ZXJDbGFzc1JhbmdlKVxuICAgIH1cblxuICAgIGdldCBwYXR0ZXJuKCk6IFBhdHRlcm4ge1xuICAgICAgICBpZiAodGhpcy5fbm9kZS50eXBlICE9PSBFbnVtVHlwZU5vZGUuUGF0dGVybikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVudW1FcnJvci5Vbmtub3duRXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVcbiAgICB9XG5cbiAgICBnZXQgZmxhZ3MoKTogRmxhZ3Mge1xuICAgICAgICBpZiAodGhpcy5fZmxhZ3MudHlwZSAhPT0gRW51bVR5cGVOb2RlLkZsYWdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRW51bUVycm9yLlVua25vd25FcnJvcilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZmxhZ3NcbiAgICB9XG5cbiAgICBvbkZsYWdzKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgZ2xvYmFsOiBib29sZWFuLFxuICAgICAgICBpZ25vcmVDYXNlOiBib29sZWFuLFxuICAgICAgICBtdWx0aWxpbmU6IGJvb2xlYW4sXG4gICAgICAgIHVuaWNvZGU6IGJvb2xlYW4sXG4gICAgICAgIHN0aWNreTogYm9vbGVhbixcbiAgICAgICAgZG90QWxsOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mbGFncyA9IHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5GbGFncyxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgcmF3OiB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgIGdsb2JhbCxcbiAgICAgICAgICAgIGlnbm9yZUNhc2UsXG4gICAgICAgICAgICBtdWx0aWxpbmUsXG4gICAgICAgICAgICB1bmljb2RlLFxuICAgICAgICAgICAgc3RpY2t5LFxuICAgICAgICAgICAgZG90QWxsLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXR0ZXJuRW50ZXIoc3RhcnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogRW51bVR5cGVOb2RlLlBhdHRlcm4sXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW10sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmFja3JlZmVyZW5jZXMubGVuZ3RoID0gMFxuICAgICAgICB0aGlzLl9jYXB0dXJpbmdHcm91cHMubGVuZ3RoID0gMFxuICAgIH1cblxuICAgIG9uUGF0dGVybkxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25vZGUuZW5kID0gZW5kXG4gICAgICAgIHRoaXMuX25vZGUucmF3ID0gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZClcblxuICAgICAgICBmb3IgKGNvbnN0IHJlZmVyZW5jZSBvZiB0aGlzLl9iYWNrcmVmZXJlbmNlcykge1xuICAgICAgICAgICAgY29uc3QgcmVmID0gcmVmZXJlbmNlLnJlZlxuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiByZWYgPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9jYXB0dXJpbmdHcm91cHNbcmVmIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9jYXB0dXJpbmdHcm91cHMuZmluZChnID0+IGcubmFtZSA9PT0gcmVmKSFcbiAgICAgICAgICAgIHJlZmVyZW5jZS5yZXNvbHZlZCA9IGdyb3VwXG4gICAgICAgICAgICBncm91cC5yZWZlcmVuY2VzLnB1c2gocmVmZXJlbmNlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNqdW5jdGlvbkVudGVyKHN0YXJ0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlzanVuY3Rpb25TdGFydFN0YWNrLnB1c2goc3RhcnQpXG4gICAgfVxuXG4gICAgb25EaXNqdW5jdGlvbkxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Rpc2p1bmN0aW9uU3RhcnRTdGFjay5wb3AoKVxuICAgIH1cblxuICAgIG9uQWx0ZXJuYXRpdmVFbnRlcihzdGFydDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYXJlbnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5EaXNqdW5jdGlvbiB8fFxuICAgICAgICAgICAgcGFyZW50Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3NcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRW51bUVycm9yLlVua25vd25FcnJvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXZOb2RlID0gbGFzdChwYXJlbnROb2RlLmVsZW1lbnRzKVxuICAgICAgICBpZiAocHJldk5vZGUgIT0gbnVsbCAmJiBwcmV2Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuRGlzanVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGUgPSBwcmV2Tm9kZVxuICAgICAgICAgICAgcHJldk5vZGUuYWx0ZXJuYXRpdmVzLnB1c2goW10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5EaXNqdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGxhc3QodGhpcy5fZGlzanVuY3Rpb25TdGFydFN0YWNrKSEsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCxcbiAgICAgICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRpdmVzOiBbXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudHNUb0FsdGVybmF0aXZlKFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuZWxlbWVudHMsXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRoaXMuX25vZGUuYWx0ZXJuYXRpdmVzLnB1c2goZWxlbWVudHMsIFtdKVxuICAgICAgICAgICAgcGFyZW50Tm9kZS5lbGVtZW50cyA9IFt0aGlzLl9ub2RlXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbHRlcm5hdGl2ZUxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZS5lbmQgPSBlbmRcbiAgICAgICAgdGhpcy5fbm9kZS5yYXcgPSB0aGlzLnNvdXJjZS5zbGljZSh0aGlzLl9ub2RlLnN0YXJ0LCBlbmQpXG4gICAgICAgIHRoaXMuX25vZGUgPSB0aGlzLl9ub2RlLnBhcmVudCBhcyBBcHBlbmRhYmxlTm9kZVxuICAgIH1cblxuICAgIG9uR3JvdXBFbnRlcihzdGFydDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXJDbGFzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVudW1FcnJvci5Vbmtub3duRXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogRW51bVR5cGVOb2RlLkdyb3VwLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgICAgICAgcmF3OiBcIlwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICB9XG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB0aGlzLl9ub2RlKVxuICAgIH1cblxuICAgIG9uR3JvdXBMZWF2ZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2RlLmVuZCA9IGVuZFxuICAgICAgICB0aGlzLl9ub2RlLnJhdyA9IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gICAgICAgIHRoaXMuX25vZGUgPSB0aGlzLl9ub2RlLnBhcmVudCBhcyBBcHBlbmRhYmxlTm9kZVxuICAgIH1cblxuICAgIG9uQ2FwdHVyaW5nR3JvdXBFbnRlcihzdGFydDogbnVtYmVyLCBuYW1lOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXJDbGFzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVudW1FcnJvci5Vbmtub3duRXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogRW51bVR5cGVOb2RlLkNhcHR1cmluZ0dyb3VwLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgICAgICAgcmF3OiBcIlwiLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXSxcbiAgICAgICAgICAgIHJlZmVyZW5jZXM6IFtdLFxuICAgICAgICB9XG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB0aGlzLl9ub2RlKVxuICAgICAgICB0aGlzLl9jYXB0dXJpbmdHcm91cHMucHVzaCh0aGlzLl9ub2RlKVxuICAgIH1cblxuICAgIG9uQ2FwdHVyaW5nR3JvdXBMZWF2ZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyB8IG51bGwsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25vZGUuZW5kID0gZW5kXG4gICAgICAgIHRoaXMuX25vZGUucmF3ID0gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZClcbiAgICAgICAgdGhpcy5fbm9kZSA9IHRoaXMuX25vZGUucGFyZW50IGFzIEFwcGVuZGFibGVOb2RlXG4gICAgfVxuXG4gICAgb25RdWFudGlmaWVyKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgbWluOiBudW1iZXIsXG4gICAgICAgIG1heDogbnVtYmVyLFxuICAgICAgICBncmVlZHk6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXJDbGFzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVudW1FcnJvci5Vbmtub3duRXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBsYXN0IGVsZW1lbnQuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID1cbiAgICAgICAgICAgIHBhcmVudE5vZGUudHlwZSA9PT0gRW51bVR5cGVOb2RlLkRpc2p1bmN0aW9uXG4gICAgICAgICAgICAgICAgPyBsYXN0KHBhcmVudE5vZGUuYWx0ZXJuYXRpdmVzKSFcbiAgICAgICAgICAgICAgICA6IHBhcmVudE5vZGUuZWxlbWVudHNcbiAgICAgICAgY29uc3QgcHJldk5vZGUgPSBlbGVtZW50cy5wb3AoKSFcbiAgICAgICAgY29uc3Qgbm9kZTogUXVhbnRpZmllciA9IHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5RdWFudGlmaWVyLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgZ3JlZWR5LFxuICAgICAgICAgICAgZWxlbWVudDogcHJldk5vZGUgYXMgUXVhbnRpZmlhYmxlRWxlbWVudCxcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGUpXG4gICAgICAgIHByZXZOb2RlLnBhcmVudCA9IG5vZGVcbiAgICB9XG5cbiAgICBvbkxvb2thcm91bmRBc3NlcnRpb25FbnRlcihcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAga2luZDogRW51bUtpbmRBc3NlcnRpb24uTG9va2FoZWFkQXNzZXJ0aW9uIHwgRW51bUtpbmRBc3NlcnRpb24uTG9va2JlaGluZEFzc2VydGlvbixcbiAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFbnVtRXJyb3IuVW5rbm93bkVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbm9kZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5Bc3NlcnRpb24sXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmVnYXRlLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICB9IGFzIExvb2thcm91bmRBc3NlcnRpb25cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHRoaXMuX25vZGUpXG4gICAgfVxuXG4gICAgb25Mb29rYXJvdW5kQXNzZXJ0aW9uTGVhdmUoXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICBraW5kOiBFbnVtS2luZExvb2tBc3NlcnRpb24sXG4gICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbm9kZS5lbmQgPSBlbmRcbiAgICAgICAgdGhpcy5fbm9kZS5yYXcgPSB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKVxuICAgICAgICB0aGlzLl9ub2RlID0gdGhpcy5fbm9kZS5wYXJlbnQgYXMgQXBwZW5kYWJsZU5vZGVcbiAgICB9XG5cbiAgICBvbkVkZ2VBc3NlcnRpb24oc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGtpbmQ6IEVudW1LaW5kRWRnZUFzc2VydGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFbnVtRXJyb3IuVW5rbm93bkVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5FZGdlQXNzZXJ0aW9uLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbldvcmRCb3VuZGFyeUFzc2VydGlvbihcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGtpbmQ6IEVudW1LaW5kQXNzZXJ0aW9uLldvcmRCb3VuZGFyeUFzc2VydGlvbixcbiAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFbnVtRXJyb3IuVW5rbm93bkVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5Xb3JkQm91bmRhcnlBc3NlcnRpb24sXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmVnYXRlLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uQW55Q2hhcmFjdGVyU2V0KHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBraW5kOiBFbnVtS2luZENoYXJhY3RlclNldC5BbnlDaGFyYWN0ZXJTZXQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX25vZGVcbiAgICAgICAgaWYgKHBhcmVudE5vZGUudHlwZSA9PT0gRW51bVR5cGVOb2RlLkNoYXJhY3RlckNsYXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRW51bUVycm9yLlVua25vd25FcnJvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB7XG4gICAgICAgICAgICB0eXBlOiBFbnVtVHlwZU5vZGUuQW55Q2hhcmFjdGVyU2V0LFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkVzY2FwZUNoYXJhY3RlclNldChcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGtpbmQ6IEVudW1LaW5kRXNjYXBlQ2hhcmFjdGVyU2V0LFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGFkZENvbW1vbkVsZW1lbnQodGhpcy5fbm9kZSwge1xuICAgICAgICAgICAgdHlwZTogRW51bVR5cGVOb2RlLkVzY2FwZUNoYXJhY3RlclNldCxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy5fbm9kZSxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgcmF3OiB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQoXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICBraW5kOiBFbnVtS2luZENoYXJhY3RlclNldC5Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQsXG4gICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICB2YWx1ZTogc3RyaW5nIHwgbnVsbCxcbiAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICBhZGRDb21tb25FbGVtZW50KHRoaXMuX25vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQsXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMuX25vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25DaGFyYWN0ZXIoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgYWRkQ29tbW9uRWxlbWVudCh0aGlzLl9ub2RlLCB7XG4gICAgICAgICAgICB0eXBlOiBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyLFxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLl9ub2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25CYWNrcmVmZXJlbmNlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCByZWY6IG51bWJlciB8IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFbnVtRXJyb3IuVW5rbm93bkVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9kZTogQmFja3JlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5CYWNrcmVmZXJlbmNlLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgcmVmLFxuICAgICAgICAgICAgcmVzb2x2ZWQ6IER1bW15Q2FwdHVyaW5nR3JvdXAsXG4gICAgICAgIH1cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIG5vZGUpXG4gICAgICAgIHRoaXMuX2JhY2tyZWZlcmVuY2VzLnB1c2gobm9kZSlcbiAgICB9XG5cbiAgICBvbkNoYXJhY3RlckNsYXNzRW50ZXIoc3RhcnQ6IG51bWJlciwgbmVnYXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXJDbGFzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVudW1FcnJvci5Vbmtub3duRXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogRW51bVR5cGVOb2RlLkNoYXJhY3RlckNsYXNzLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgICAgICAgcmF3OiBcIlwiLFxuICAgICAgICAgICAgbmVnYXRlLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICB9XG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB0aGlzLl9ub2RlKVxuICAgIH1cblxuICAgIG9uQ2hhcmFjdGVyQ2xhc3NMZWF2ZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgbmVnYXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25vZGUuZW5kID0gZW5kXG4gICAgICAgIHRoaXMuX25vZGUucmF3ID0gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZClcbiAgICAgICAgdGhpcy5fbm9kZSA9IHRoaXMuX25vZGUucGFyZW50IGFzIEFwcGVuZGFibGVOb2RlXG4gICAgfVxuXG4gICAgb25DaGFyYWN0ZXJDbGFzc1JhbmdlKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgbWluOiBudW1iZXIsXG4gICAgICAgIG1heDogbnVtYmVyLFxuICAgICk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlICE9PSBFbnVtVHlwZU5vZGUuQ2hhcmFjdGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFbnVtRXJyb3IuVW5rbm93bkVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgbGFzdCB0aHJlZSBlbGVtZW50cy5cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBwYXJlbnROb2RlLmVsZW1lbnRzXG4gICAgICAgIGNvbnN0IHJpZ2h0Tm9kZSA9IGVsZW1lbnRzLnBvcCgpIGFzIENoYXJhY3RlclxuICAgICAgICBlbGVtZW50cy5wb3AoKSAvLyBoeXBoZW5cbiAgICAgICAgY29uc3QgbGVmdE5vZGUgPSBlbGVtZW50cy5wb3AoKSBhcyBDaGFyYWN0ZXJcbiAgICAgICAgY29uc3Qgbm9kZTogQ2hhcmFjdGVyQ2xhc3NSYW5nZSA9IHtcbiAgICAgICAgICAgIHR5cGU6IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXJDbGFzc1JhbmdlLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgbWluOiBsZWZ0Tm9kZSxcbiAgICAgICAgICAgIG1heDogcmlnaHROb2RlLFxuICAgICAgICB9XG4gICAgICAgIGFzc2VydChsZWZ0Tm9kZSAhPSBudWxsICYmIGxlZnROb2RlLnR5cGUgPT09IEVudW1UeXBlTm9kZS5DaGFyYWN0ZXIpXG4gICAgICAgIGFzc2VydChyaWdodE5vZGUgIT0gbnVsbCAmJiByaWdodE5vZGUudHlwZSA9PT0gRW51bVR5cGVOb2RlLkNoYXJhY3RlcilcbiAgICAgICAgbGVmdE5vZGUucGFyZW50ID0gbm9kZVxuICAgICAgICByaWdodE5vZGUucGFyZW50ID0gbm9kZVxuICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGUpXG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ0V4cFBhcnNlciB7XG4gICAgLyoqXG4gICAgICogVGhlIG9wdGlvbnMgZm9yIFJlZ0V4cFBhcnNlciBjb25zdHJ1Y3Rpb24uXG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmbGFnIHRvIGRpc2FibGUgQW5uZXggQiBzeW50YXguIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgICovXG4gICAgICAgIHN0cmljdD86IGJvb2xlYW5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRUNNQVNjcmlwdCB2ZXJzaW9uLiBEZWZhdWx0IGlzIGAyMDE4YC5cbiAgICAgICAgICogLSBgMjAxNWAgYWRkZWQgYHVgIGFuZCBgeWAgZmxhZ3MuXG4gICAgICAgICAqIC0gYDIwMThgIGFkZGVkIGBzYCBmbGFnLCBOYW1lZCBDYXB0dXJpbmcgR3JvdXAsIExvb2tiZWhpbmQgQXNzZXJ0aW9uLFxuICAgICAgICAgKiAgIGFuZCBVbmljb2RlIFByb3BlcnR5IEVzY2FwZS5cbiAgICAgICAgICovXG4gICAgICAgIGVjbWFWZXJzaW9uPzogRW51bUVjbWFWZXJzaW9uXG5cbiAgICAgICAgZGlzYWJsZUNoa0NoYXJhY3RlckNsYXNzUmFuZ2U/OiBib29sZWFuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVnRXhwUGFyc2VyIHtcbiAgICBwcml2YXRlIF9zdGF0ZTogUmVnRXhwUGFyc2VyU3RhdGVcbiAgICBwcml2YXRlIF92YWxpZGF0b3I6IFJlZ0V4cFZhbGlkYXRvclxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIHBhcnNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvZiBwYXJzZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IFJlZ0V4cFBhcnNlci5PcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gbmV3IFJlZ0V4cFBhcnNlclN0YXRlKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvciA9IG5ldyBSZWdFeHBWYWxpZGF0b3IodGhpcy5fc3RhdGUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYSByZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbC4gRS5nLiBcIi9hYmMvZ1wiXG4gICAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIGNvZGUgdG8gcGFyc2UuXG4gICAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIGVuZCBUaGUgZW5kIGluZGV4IGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcmV0dXJucyBUaGUgQVNUIG9mIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAgICovXG4gICAgcGFyc2VMaXRlcmFsKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgc3RhcnQ6IG51bWJlciA9IDAsXG4gICAgICAgIGVuZDogbnVtYmVyID0gc291cmNlLmxlbmd0aCxcbiAgICApOiBSZWdFeHBMaXRlcmFsIHtcbiAgICAgICAgdGhpcy5fc3RhdGUuc291cmNlID0gc291cmNlXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZUxpdGVyYWwoc291cmNlLCBzdGFydCwgZW5kKVxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5fc3RhdGUucGF0dGVyblxuICAgICAgICBjb25zdCBmbGFncyA9IHRoaXMuX3N0YXRlLmZsYWdzXG4gICAgICAgIGNvbnN0IGxpdGVyYWw6IFJlZ0V4cExpdGVyYWwgPSB7XG4gICAgICAgICAgICB0eXBlOiBFbnVtVHlwZU5vZGUuUmVnRXhwTGl0ZXJhbCxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgcmF3OiBzb3VyY2UsXG4gICAgICAgICAgICBwYXR0ZXJuLFxuICAgICAgICAgICAgZmxhZ3MsXG4gICAgICAgIH1cbiAgICAgICAgcGF0dGVybi5wYXJlbnQgPSBsaXRlcmFsXG4gICAgICAgIGZsYWdzLnBhcmVudCA9IGxpdGVyYWxcbiAgICAgICAgcmV0dXJuIGxpdGVyYWxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmbGFncy4gRS5nLiBcImdpbVwiXG4gICAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIGNvZGUgdG8gcGFyc2UuXG4gICAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIGVuZCBUaGUgZW5kIGluZGV4IGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcmV0dXJucyBUaGUgQVNUIG9mIHRoZSBnaXZlbiBmbGFncy5cbiAgICAgKi9cbiAgICBwYXJzZUZsYWdzKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgc3RhcnQ6IG51bWJlciA9IDAsXG4gICAgICAgIGVuZDogbnVtYmVyID0gc291cmNlLmxlbmd0aCxcbiAgICApOiBGbGFncyB7XG4gICAgICAgIHRoaXMuX3N0YXRlLnNvdXJjZSA9IHNvdXJjZVxuICAgICAgICB0aGlzLl92YWxpZGF0b3IudmFsaWRhdGVGbGFncyhzb3VyY2UsIHN0YXJ0LCBlbmQpXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZS5mbGFnc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGEgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4uIEUuZy4gXCJhYmNcIlxuICAgICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBjb2RlIHRvIHBhcnNlLlxuICAgICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSBlbmQgVGhlIGVuZCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHBhcmFtIHVGbGFnIFRoZSBmbGFnIHRvIHNldCB1bmljb2RlIG1vZGUuXG4gICAgICogQHJldHVybnMgVGhlIEFTVCBvZiB0aGUgZ2l2ZW4gcGF0dGVybi5cbiAgICAgKi9cbiAgICBwYXJzZVBhdHRlcm4oXG4gICAgICAgIHNvdXJjZTogc3RyaW5nLFxuICAgICAgICBzdGFydDogbnVtYmVyID0gMCxcbiAgICAgICAgZW5kOiBudW1iZXIgPSBzb3VyY2UubGVuZ3RoLFxuICAgICAgICB1RmxhZzogYm9vbGVhbiA9IGZhbHNlLFxuICAgICk6IFBhdHRlcm4ge1xuICAgICAgICB0aGlzLl9zdGF0ZS5zb3VyY2UgPSBzb3VyY2VcbiAgICAgICAgdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlUGF0dGVybihzb3VyY2UsIHN0YXJ0LCBlbmQsIHVGbGFnKVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucGF0dGVyblxuICAgIH1cbn1cbiJdfQ==