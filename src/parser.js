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
        util_1.assert(element.type !== "Disjunction");
        element.parent = parent;
    }
    return elements;
}
function addAlternativeElement(parent, node) {
    if (parent.type === "Disjunction") {
        util_1.last(parent.alternatives).push(node);
    }
    else {
        parent.elements.push(node);
    }
}
function addCommonElement(parent, node) {
    if (parent.type === "Disjunction") {
        util_1.last(parent.alternatives).push(node);
    }
    else if (parent.type === "CharacterClass") {
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
        this.ecmaVersion = (options && options.ecmaVersion) || 2018;
        this.disableChkCharacterClassRange = Boolean(options && options.disableChkCharacterClassRange);
    }
    get pattern() {
        if (this._node.type !== "Pattern") {
            throw new Error("UnknownError");
        }
        return this._node;
    }
    get flags() {
        if (this._flags.type !== "Flags") {
            throw new Error("UnknownError");
        }
        return this._flags;
    }
    onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll) {
        this._flags = {
            type: "Flags",
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
            type: "Pattern",
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
        if (parentNode.type === "Disjunction" ||
            parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        const prevNode = util_1.last(parentNode.elements);
        if (prevNode != null && prevNode.type === "Disjunction") {
            this._node = prevNode;
            prevNode.alternatives.push([]);
        }
        else {
            this._node = {
                type: "Disjunction",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        this._node = {
            type: "Group",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        this._node = {
            type: "CapturingGroup",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        // Replace the last element.
        const elements = parentNode.type === "Disjunction"
            ? util_1.last(parentNode.alternatives)
            : parentNode.elements;
        const prevNode = elements.pop();
        const node = {
            type: "Quantifier",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        this._node = {
            type: "Assertion",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        addAlternativeElement(parentNode, {
            type: "Assertion",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onWordBoundaryAssertion(start, end, kind, negate) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        addAlternativeElement(parentNode, {
            type: "Assertion",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        addAlternativeElement(parentNode, {
            type: "CharacterSet",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            kind,
        });
    }
    onEscapeCharacterSet(start, end, kind, negate) {
        addCommonElement(this._node, {
            type: "CharacterSet",
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
            type: "CharacterSet",
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
            type: "Character",
            parent: this._node,
            start,
            end,
            raw: this.source.slice(start, end),
            value,
        });
    }
    onBackreference(start, end, ref) {
        const parentNode = this._node;
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        const node = {
            type: "Backreference",
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
        if (parentNode.type === "CharacterClass") {
            throw new Error("UnknownError");
        }
        this._node = {
            type: "CharacterClass",
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
        if (parentNode.type !== "CharacterClass") {
            throw new Error("UnknownError");
        }
        // Replace the last three elements.
        const elements = parentNode.elements;
        const rightNode = elements.pop();
        elements.pop(); // hyphen
        const leftNode = elements.pop();
        const node = {
            type: "CharacterClassRange",
            parent: parentNode,
            start,
            end,
            raw: this.source.slice(start, end),
            min: leftNode,
            max: rightNode,
        };
        util_1.assert(leftNode != null && leftNode.type === "Character");
        util_1.assert(rightNode != null && rightNode.type === "Character");
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
            type: "RegExpLiteral",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUJBLGlDQUFxQztBQUNyQywyQ0FBNkM7QUFVN0MsTUFBTSxZQUFZLEdBQUcsRUFBYSxDQUFBO0FBQ2xDLE1BQU0sVUFBVSxHQUFHLEVBQVcsQ0FBQTtBQUM5QixNQUFNLG1CQUFtQixHQUFHLEVBQW9CLENBQUE7QUFFaEQ7Ozs7R0FJRztBQUNILFNBQVMscUJBQXFCLENBQzFCLFFBQW1CLEVBQ25CLE1BQW1CO0lBRW5CLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzVCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxDQUFBO1FBQ3RDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQzFCO0lBQ0QsT0FBTyxRQUFnQyxDQUFBO0FBQzNDLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUMxQixNQUt5QixFQUN6QixJQU9tQjtJQUVuQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO1FBQy9CLFdBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3hDO1NBQU07UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUM3QjtBQUNMLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUNyQixNQUFzQixFQUN0QixJQUFrRTtJQUVsRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO1FBQy9CLFdBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3hDO1NBQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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TyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FDUixNQUFjLEVBQ2QsUUFBZ0IsQ0FBQyxFQUNqQixNQUFjLE1BQU0sQ0FBQyxNQUFNLEVBQzNCLFFBQWlCLEtBQUs7UUFFdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUE7SUFDOUIsQ0FBQztDQUNKO0FBOUVELG9DQThFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWx0ZXJuYXRpdmVFbGVtZW50LFxuICAgIEFueUNoYXJhY3RlclNldCxcbiAgICBBc3NlcnRpb24sXG4gICAgQmFja3JlZmVyZW5jZSxcbiAgICBDYXB0dXJpbmdHcm91cCxcbiAgICBDaGFyYWN0ZXIsXG4gICAgQ2hhcmFjdGVyQ2xhc3MsXG4gICAgQ2hhcmFjdGVyQ2xhc3NSYW5nZSxcbiAgICBEaXNqdW5jdGlvbixcbiAgICBFbGVtZW50LFxuICAgIEVzY2FwZUNoYXJhY3RlclNldCxcbiAgICBGbGFncyxcbiAgICBHcm91cCxcbiAgICBSZWdFeHBMaXRlcmFsLFxuICAgIExvb2thcm91bmRBc3NlcnRpb24sXG4gICAgUGF0dGVybixcbiAgICBRdWFudGlmaWFibGVFbGVtZW50LFxuICAgIFF1YW50aWZpZXIsXG4gICAgVW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0LFxufSBmcm9tIFwiLi9hc3RcIlxuaW1wb3J0IHsgYXNzZXJ0LCBsYXN0IH0gZnJvbSBcIi4vdXRpbFwiXG5pbXBvcnQgeyBSZWdFeHBWYWxpZGF0b3IgfSBmcm9tIFwiLi92YWxpZGF0b3JcIlxuXG5leHBvcnQgdHlwZSBBcHBlbmRhYmxlTm9kZSA9XG4gICAgfCBQYXR0ZXJuXG4gICAgfCBEaXNqdW5jdGlvblxuICAgIHwgR3JvdXBcbiAgICB8IENhcHR1cmluZ0dyb3VwXG4gICAgfCBDaGFyYWN0ZXJDbGFzc1xuICAgIHwgTG9va2Fyb3VuZEFzc2VydGlvblxuXG5jb25zdCBEdW1teVBhdHRlcm4gPSB7fSBhcyBQYXR0ZXJuXG5jb25zdCBEdW1teUZsYWdzID0ge30gYXMgRmxhZ3NcbmNvbnN0IER1bW15Q2FwdHVyaW5nR3JvdXAgPSB7fSBhcyBDYXB0dXJpbmdHcm91cFxuXG4vKipcbiAqIENvbnZlcnQgZ2l2ZW4gZWxlbWVudHMgdG8gYW4gYWx0ZXJuYXRpdmUuXG4gKiBUaGlzIGRvZXNuJ3QgY2xvbmUgdGhlIGFycmF5LCBzbyB0aGUgcmV0dXJuIHZhbHVlIGlzIGBlbGVtZW50c2AgaXRzZWxmLlxuICogQHBhcmFtIGVsZW1lbnRzIEVsZW1lbnRzIHRvIGNvbnZlcnQuXG4gKi9cbmZ1bmN0aW9uIGVsZW1lbnRzVG9BbHRlcm5hdGl2ZShcbiAgICBlbGVtZW50czogRWxlbWVudFtdLFxuICAgIHBhcmVudDogRGlzanVuY3Rpb24sXG4pOiBBbHRlcm5hdGl2ZUVsZW1lbnRbXSB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnR5cGUgIT09IFwiRGlzanVuY3Rpb25cIilcbiAgICAgICAgZWxlbWVudC5wYXJlbnQgPSBwYXJlbnRcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzIGFzIEFsdGVybmF0aXZlRWxlbWVudFtdXG59XG5cbmZ1bmN0aW9uIGFkZEFsdGVybmF0aXZlRWxlbWVudChcbiAgICBwYXJlbnQ6XG4gICAgICAgIHwgUGF0dGVyblxuICAgICAgICB8IERpc2p1bmN0aW9uXG4gICAgICAgIHwgR3JvdXBcbiAgICAgICAgfCBDYXB0dXJpbmdHcm91cFxuICAgICAgICB8IExvb2thcm91bmRBc3NlcnRpb24sXG4gICAgbm9kZTpcbiAgICAgICAgfCBHcm91cFxuICAgICAgICB8IENhcHR1cmluZ0dyb3VwXG4gICAgICAgIHwgUXVhbnRpZmllclxuICAgICAgICB8IENoYXJhY3RlckNsYXNzXG4gICAgICAgIHwgQXNzZXJ0aW9uXG4gICAgICAgIHwgQW55Q2hhcmFjdGVyU2V0XG4gICAgICAgIHwgQmFja3JlZmVyZW5jZSxcbik6IHZvaWQge1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gXCJEaXNqdW5jdGlvblwiKSB7XG4gICAgICAgIGxhc3QocGFyZW50LmFsdGVybmF0aXZlcykhLnB1c2gobm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuZWxlbWVudHMucHVzaChub2RlKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkQ29tbW9uRWxlbWVudChcbiAgICBwYXJlbnQ6IEFwcGVuZGFibGVOb2RlLFxuICAgIG5vZGU6IEVzY2FwZUNoYXJhY3RlclNldCB8IFVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldCB8IENoYXJhY3Rlcixcbik6IHZvaWQge1xuICAgIGlmIChwYXJlbnQudHlwZSA9PT0gXCJEaXNqdW5jdGlvblwiKSB7XG4gICAgICAgIGxhc3QocGFyZW50LmFsdGVybmF0aXZlcykhLnB1c2gobm9kZSlcbiAgICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSBcIkNoYXJhY3RlckNsYXNzXCIpIHtcbiAgICAgICAgcGFyZW50LmVsZW1lbnRzLnB1c2gobm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuZWxlbWVudHMucHVzaChub2RlKVxuICAgIH1cbn1cblxuY2xhc3MgUmVnRXhwUGFyc2VyU3RhdGUge1xuICAgIHJlYWRvbmx5IHN0cmljdDogYm9vbGVhblxuICAgIHJlYWRvbmx5IGVjbWFWZXJzaW9uOiA1IHwgMjAxNSB8IDIwMTYgfCAyMDE3IHwgMjAxOFxuXG4gICAgcmVhZG9ubHkgZGlzYWJsZUNoa0NoYXJhY3RlckNsYXNzUmFuZ2U6IGJvb2xlYW5cblxuICAgIHByaXZhdGUgX25vZGU6IEFwcGVuZGFibGVOb2RlID0gRHVtbXlQYXR0ZXJuXG4gICAgcHJpdmF0ZSBfZmxhZ3M6IEZsYWdzID0gRHVtbXlGbGFnc1xuICAgIHByaXZhdGUgX2Rpc2p1bmN0aW9uU3RhcnRTdGFjazogbnVtYmVyW10gPSBbXVxuICAgIHByaXZhdGUgX2JhY2tyZWZlcmVuY2VzOiBCYWNrcmVmZXJlbmNlW10gPSBbXVxuICAgIHByaXZhdGUgX2NhcHR1cmluZ0dyb3VwczogQ2FwdHVyaW5nR3JvdXBbXSA9IFtdXG5cbiAgICBzb3VyY2U6IHN0cmluZyA9IFwiXCJcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBSZWdFeHBQYXJzZXIuT3B0aW9ucykge1xuICAgICAgICB0aGlzLnN0cmljdCA9IEJvb2xlYW4ob3B0aW9ucyAmJiBvcHRpb25zLnN0cmljdClcbiAgICAgICAgdGhpcy5lY21hVmVyc2lvbiA9IChvcHRpb25zICYmIG9wdGlvbnMuZWNtYVZlcnNpb24pIHx8IDIwMThcbiAgICAgICAgdGhpcy5kaXNhYmxlQ2hrQ2hhcmFjdGVyQ2xhc3NSYW5nZSA9IEJvb2xlYW4ob3B0aW9ucyAmJiBvcHRpb25zLmRpc2FibGVDaGtDaGFyYWN0ZXJDbGFzc1JhbmdlKVxuICAgIH1cblxuICAgIGdldCBwYXR0ZXJuKCk6IFBhdHRlcm4ge1xuICAgICAgICBpZiAodGhpcy5fbm9kZS50eXBlICE9PSBcIlBhdHRlcm5cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVcbiAgICB9XG5cbiAgICBnZXQgZmxhZ3MoKTogRmxhZ3Mge1xuICAgICAgICBpZiAodGhpcy5fZmxhZ3MudHlwZSAhPT0gXCJGbGFnc1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZmxhZ3NcbiAgICB9XG5cbiAgICBvbkZsYWdzKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgZ2xvYmFsOiBib29sZWFuLFxuICAgICAgICBpZ25vcmVDYXNlOiBib29sZWFuLFxuICAgICAgICBtdWx0aWxpbmU6IGJvb2xlYW4sXG4gICAgICAgIHVuaWNvZGU6IGJvb2xlYW4sXG4gICAgICAgIHN0aWNreTogYm9vbGVhbixcbiAgICAgICAgZG90QWxsOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mbGFncyA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiRmxhZ3NcIixcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgcmF3OiB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgIGdsb2JhbCxcbiAgICAgICAgICAgIGlnbm9yZUNhc2UsXG4gICAgICAgICAgICBtdWx0aWxpbmUsXG4gICAgICAgICAgICB1bmljb2RlLFxuICAgICAgICAgICAgc3RpY2t5LFxuICAgICAgICAgICAgZG90QWxsLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXR0ZXJuRW50ZXIoc3RhcnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJQYXR0ZXJuXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW10sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmFja3JlZmVyZW5jZXMubGVuZ3RoID0gMFxuICAgICAgICB0aGlzLl9jYXB0dXJpbmdHcm91cHMubGVuZ3RoID0gMFxuICAgIH1cblxuICAgIG9uUGF0dGVybkxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25vZGUuZW5kID0gZW5kXG4gICAgICAgIHRoaXMuX25vZGUucmF3ID0gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZClcblxuICAgICAgICBmb3IgKGNvbnN0IHJlZmVyZW5jZSBvZiB0aGlzLl9iYWNrcmVmZXJlbmNlcykge1xuICAgICAgICAgICAgY29uc3QgcmVmID0gcmVmZXJlbmNlLnJlZlxuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiByZWYgPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl9jYXB0dXJpbmdHcm91cHNbcmVmIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9jYXB0dXJpbmdHcm91cHMuZmluZChnID0+IGcubmFtZSA9PT0gcmVmKSFcbiAgICAgICAgICAgIHJlZmVyZW5jZS5yZXNvbHZlZCA9IGdyb3VwXG4gICAgICAgICAgICBncm91cC5yZWZlcmVuY2VzLnB1c2gocmVmZXJlbmNlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNqdW5jdGlvbkVudGVyKHN0YXJ0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlzanVuY3Rpb25TdGFydFN0YWNrLnB1c2goc3RhcnQpXG4gICAgfVxuXG4gICAgb25EaXNqdW5jdGlvbkxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Rpc2p1bmN0aW9uU3RhcnRTdGFjay5wb3AoKVxuICAgIH1cblxuICAgIG9uQWx0ZXJuYXRpdmVFbnRlcihzdGFydDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYXJlbnROb2RlLnR5cGUgPT09IFwiRGlzanVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgcGFyZW50Tm9kZS50eXBlID09PSBcIkNoYXJhY3RlckNsYXNzXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duRXJyb3JcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXZOb2RlID0gbGFzdChwYXJlbnROb2RlLmVsZW1lbnRzKVxuICAgICAgICBpZiAocHJldk5vZGUgIT0gbnVsbCAmJiBwcmV2Tm9kZS50eXBlID09PSBcIkRpc2p1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGUgPSBwcmV2Tm9kZVxuICAgICAgICAgICAgcHJldk5vZGUuYWx0ZXJuYXRpdmVzLnB1c2goW10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiRGlzanVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGxhc3QodGhpcy5fZGlzanVuY3Rpb25TdGFydFN0YWNrKSEsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCxcbiAgICAgICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWx0ZXJuYXRpdmVzOiBbXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudHNUb0FsdGVybmF0aXZlKFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuZWxlbWVudHMsXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRoaXMuX25vZGUuYWx0ZXJuYXRpdmVzLnB1c2goZWxlbWVudHMsIFtdKVxuICAgICAgICAgICAgcGFyZW50Tm9kZS5lbGVtZW50cyA9IFt0aGlzLl9ub2RlXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbHRlcm5hdGl2ZUxlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZS5lbmQgPSBlbmRcbiAgICAgICAgdGhpcy5fbm9kZS5yYXcgPSB0aGlzLnNvdXJjZS5zbGljZSh0aGlzLl9ub2RlLnN0YXJ0LCBlbmQpXG4gICAgICAgIHRoaXMuX25vZGUgPSB0aGlzLl9ub2RlLnBhcmVudCBhcyBBcHBlbmRhYmxlTm9kZVxuICAgIH1cblxuICAgIG9uR3JvdXBFbnRlcihzdGFydDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJHcm91cFwiLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgICAgICAgcmF3OiBcIlwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdLFxuICAgICAgICB9XG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB0aGlzLl9ub2RlKVxuICAgIH1cblxuICAgIG9uR3JvdXBMZWF2ZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2RlLmVuZCA9IGVuZFxuICAgICAgICB0aGlzLl9ub2RlLnJhdyA9IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gICAgICAgIHRoaXMuX25vZGUgPSB0aGlzLl9ub2RlLnBhcmVudCBhcyBBcHBlbmRhYmxlTm9kZVxuICAgIH1cblxuICAgIG9uQ2FwdHVyaW5nR3JvdXBFbnRlcihzdGFydDogbnVtYmVyLCBuYW1lOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJDYXB0dXJpbmdHcm91cFwiLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHN0YXJ0LFxuICAgICAgICAgICAgcmF3OiBcIlwiLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXSxcbiAgICAgICAgICAgIHJlZmVyZW5jZXM6IFtdLFxuICAgICAgICB9XG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB0aGlzLl9ub2RlKVxuICAgICAgICB0aGlzLl9jYXB0dXJpbmdHcm91cHMucHVzaCh0aGlzLl9ub2RlKVxuICAgIH1cblxuICAgIG9uQ2FwdHVyaW5nR3JvdXBMZWF2ZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIG5hbWU6IHN0cmluZyB8IG51bGwsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25vZGUuZW5kID0gZW5kXG4gICAgICAgIHRoaXMuX25vZGUucmF3ID0gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZClcbiAgICAgICAgdGhpcy5fbm9kZSA9IHRoaXMuX25vZGUucGFyZW50IGFzIEFwcGVuZGFibGVOb2RlXG4gICAgfVxuXG4gICAgb25RdWFudGlmaWVyKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAgbWluOiBudW1iZXIsXG4gICAgICAgIG1heDogbnVtYmVyLFxuICAgICAgICBncmVlZHk6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBsYXN0IGVsZW1lbnQuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID1cbiAgICAgICAgICAgIHBhcmVudE5vZGUudHlwZSA9PT0gXCJEaXNqdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgPyBsYXN0KHBhcmVudE5vZGUuYWx0ZXJuYXRpdmVzKSFcbiAgICAgICAgICAgICAgICA6IHBhcmVudE5vZGUuZWxlbWVudHNcbiAgICAgICAgY29uc3QgcHJldk5vZGUgPSBlbGVtZW50cy5wb3AoKSFcbiAgICAgICAgY29uc3Qgbm9kZTogUXVhbnRpZmllciA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiUXVhbnRpZmllclwiLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgZ3JlZWR5LFxuICAgICAgICAgICAgZWxlbWVudDogcHJldk5vZGUgYXMgUXVhbnRpZmlhYmxlRWxlbWVudCxcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGUpXG4gICAgICAgIHByZXZOb2RlLnBhcmVudCA9IG5vZGVcbiAgICB9XG5cbiAgICBvbkxvb2thcm91bmRBc3NlcnRpb25FbnRlcihcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJsb29rYWhlYWRcIiB8IFwibG9va2JlaGluZFwiLFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ub2RlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJBc3NlcnRpb25cIixcbiAgICAgICAgICAgIHBhcmVudDogcGFyZW50Tm9kZSxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBzdGFydCxcbiAgICAgICAgICAgIHJhdzogXCJcIixcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgICBlbGVtZW50czogW10sXG4gICAgICAgIH0gYXMgTG9va2Fyb3VuZEFzc2VydGlvblxuICAgICAgICBhZGRBbHRlcm5hdGl2ZUVsZW1lbnQocGFyZW50Tm9kZSwgdGhpcy5fbm9kZSlcbiAgICB9XG5cbiAgICBvbkxvb2thcm91bmRBc3NlcnRpb25MZWF2ZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGtpbmQ6IFwibG9va2FoZWFkXCIgfCBcImxvb2tiZWhpbmRcIixcbiAgICAgICAgbmVnYXRlOiBib29sZWFuLFxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ub2RlLmVuZCA9IGVuZFxuICAgICAgICB0aGlzLl9ub2RlLnJhdyA9IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gICAgICAgIHRoaXMuX25vZGUgPSB0aGlzLl9ub2RlLnBhcmVudCBhcyBBcHBlbmRhYmxlTm9kZVxuICAgIH1cblxuICAgIG9uRWRnZUFzc2VydGlvbihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwga2luZDogXCJzdGFydFwiIHwgXCJlbmRcIik6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBcIkNoYXJhY3RlckNsYXNzXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd25FcnJvclwiKVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiQXNzZXJ0aW9uXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uV29yZEJvdW5kYXJ5QXNzZXJ0aW9uKFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJ3b3JkXCIsXG4gICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX25vZGVcbiAgICAgICAgaWYgKHBhcmVudE5vZGUudHlwZSA9PT0gXCJDaGFyYWN0ZXJDbGFzc1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duRXJyb3JcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEFsdGVybmF0aXZlRWxlbWVudChwYXJlbnROb2RlLCB7XG4gICAgICAgICAgICB0eXBlOiBcIkFzc2VydGlvblwiLFxuICAgICAgICAgICAgcGFyZW50OiBwYXJlbnROb2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkFueUNoYXJhY3RlclNldChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwga2luZDogXCJhbnlcIik6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fbm9kZVxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBcIkNoYXJhY3RlckNsYXNzXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd25FcnJvclwiKVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiQ2hhcmFjdGVyU2V0XCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uRXNjYXBlQ2hhcmFjdGVyU2V0KFxuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlcixcbiAgICAgICAga2luZDogXCJkaWdpdFwiIHwgXCJzcGFjZVwiIHwgXCJ3b3JkXCIsXG4gICAgICAgIG5lZ2F0ZTogYm9vbGVhbixcbiAgICApOiB2b2lkIHtcbiAgICAgICAgYWRkQ29tbW9uRWxlbWVudCh0aGlzLl9ub2RlLCB7XG4gICAgICAgICAgICB0eXBlOiBcIkNoYXJhY3RlclNldFwiLFxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLl9ub2RlLFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICByYXc6IHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldChcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZW5kOiBudW1iZXIsXG4gICAgICAgIGtpbmQ6IFwicHJvcGVydHlcIixcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsLFxuICAgICAgICBuZWdhdGU6IGJvb2xlYW4sXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGFkZENvbW1vbkVsZW1lbnQodGhpcy5fbm9kZSwge1xuICAgICAgICAgICAgdHlwZTogXCJDaGFyYWN0ZXJTZXRcIixcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy5fbm9kZSxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgcmF3OiB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkNoYXJhY3RlcihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBhZGRDb21tb25FbGVtZW50KHRoaXMuX25vZGUsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiQ2hhcmFjdGVyXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMuX25vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkJhY2tyZWZlcmVuY2Uoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHJlZjogbnVtYmVyIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlOiBCYWNrcmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJCYWNrcmVmZXJlbmNlXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICByZWYsXG4gICAgICAgICAgICByZXNvbHZlZDogRHVtbXlDYXB0dXJpbmdHcm91cCxcbiAgICAgICAgfVxuICAgICAgICBhZGRBbHRlcm5hdGl2ZUVsZW1lbnQocGFyZW50Tm9kZSwgbm9kZSlcbiAgICAgICAgdGhpcy5fYmFja3JlZmVyZW5jZXMucHVzaChub2RlKVxuICAgIH1cblxuICAgIG9uQ2hhcmFjdGVyQ2xhc3NFbnRlcihzdGFydDogbnVtYmVyLCBuZWdhdGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX25vZGVcbiAgICAgICAgaWYgKHBhcmVudE5vZGUudHlwZSA9PT0gXCJDaGFyYWN0ZXJDbGFzc1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duRXJyb3JcIilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25vZGUgPSB7XG4gICAgICAgICAgICB0eXBlOiBcIkNoYXJhY3RlckNsYXNzXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZDogc3RhcnQsXG4gICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgICBlbGVtZW50czogW10sXG4gICAgICAgIH1cbiAgICAgICAgYWRkQWx0ZXJuYXRpdmVFbGVtZW50KHBhcmVudE5vZGUsIHRoaXMuX25vZGUpXG4gICAgfVxuXG4gICAgb25DaGFyYWN0ZXJDbGFzc0xlYXZlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBuZWdhdGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbm9kZS5lbmQgPSBlbmRcbiAgICAgICAgdGhpcy5fbm9kZS5yYXcgPSB0aGlzLnNvdXJjZS5zbGljZShzdGFydCwgZW5kKVxuICAgICAgICB0aGlzLl9ub2RlID0gdGhpcy5fbm9kZS5wYXJlbnQgYXMgQXBwZW5kYWJsZU5vZGVcbiAgICB9XG5cbiAgICBvbkNoYXJhY3RlckNsYXNzUmFuZ2UoXG4gICAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICAgIGVuZDogbnVtYmVyLFxuICAgICAgICBtaW46IG51bWJlcixcbiAgICAgICAgbWF4OiBudW1iZXIsXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9ub2RlXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnR5cGUgIT09IFwiQ2hhcmFjdGVyQ2xhc3NcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93bkVycm9yXCIpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBsYXN0IHRocmVlIGVsZW1lbnRzLlxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHBhcmVudE5vZGUuZWxlbWVudHNcbiAgICAgICAgY29uc3QgcmlnaHROb2RlID0gZWxlbWVudHMucG9wKCkgYXMgQ2hhcmFjdGVyXG4gICAgICAgIGVsZW1lbnRzLnBvcCgpIC8vIGh5cGhlblxuICAgICAgICBjb25zdCBsZWZ0Tm9kZSA9IGVsZW1lbnRzLnBvcCgpIGFzIENoYXJhY3RlclxuICAgICAgICBjb25zdCBub2RlOiBDaGFyYWN0ZXJDbGFzc1JhbmdlID0ge1xuICAgICAgICAgICAgdHlwZTogXCJDaGFyYWN0ZXJDbGFzc1JhbmdlXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICBtaW46IGxlZnROb2RlLFxuICAgICAgICAgICAgbWF4OiByaWdodE5vZGUsXG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0KGxlZnROb2RlICE9IG51bGwgJiYgbGVmdE5vZGUudHlwZSA9PT0gXCJDaGFyYWN0ZXJcIilcbiAgICAgICAgYXNzZXJ0KHJpZ2h0Tm9kZSAhPSBudWxsICYmIHJpZ2h0Tm9kZS50eXBlID09PSBcIkNoYXJhY3RlclwiKVxuICAgICAgICBsZWZ0Tm9kZS5wYXJlbnQgPSBub2RlXG4gICAgICAgIHJpZ2h0Tm9kZS5wYXJlbnQgPSBub2RlXG4gICAgICAgIGVsZW1lbnRzLnB1c2gobm9kZSlcbiAgICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVnRXhwUGFyc2VyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW9ucyBmb3IgUmVnRXhwUGFyc2VyIGNvbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBleHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZsYWcgdG8gZGlzYWJsZSBBbm5leCBCIHN5bnRheC4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuICAgICAgICAgKi9cbiAgICAgICAgc3RyaWN0PzogYm9vbGVhblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFQ01BU2NyaXB0IHZlcnNpb24uIERlZmF1bHQgaXMgYDIwMThgLlxuICAgICAgICAgKiAtIGAyMDE1YCBhZGRlZCBgdWAgYW5kIGB5YCBmbGFncy5cbiAgICAgICAgICogLSBgMjAxOGAgYWRkZWQgYHNgIGZsYWcsIE5hbWVkIENhcHR1cmluZyBHcm91cCwgTG9va2JlaGluZCBBc3NlcnRpb24sXG4gICAgICAgICAqICAgYW5kIFVuaWNvZGUgUHJvcGVydHkgRXNjYXBlLlxuICAgICAgICAgKi9cbiAgICAgICAgZWNtYVZlcnNpb24/OiA1IHwgMjAxNSB8IDIwMTYgfCAyMDE3IHwgMjAxOFxuXG4gICAgICAgIGRpc2FibGVDaGtDaGFyYWN0ZXJDbGFzc1JhbmdlPzogYm9vbGVhblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZ0V4cFBhcnNlciB7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFJlZ0V4cFBhcnNlclN0YXRlXG4gICAgcHJpdmF0ZSBfdmFsaWRhdG9yOiBSZWdFeHBWYWxpZGF0b3JcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBwYXJzZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2YgcGFyc2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBSZWdFeHBQYXJzZXIuT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IG5ldyBSZWdFeHBQYXJzZXJTdGF0ZShvcHRpb25zKVxuICAgICAgICB0aGlzLl92YWxpZGF0b3IgPSBuZXcgUmVnRXhwVmFsaWRhdG9yKHRoaXMuX3N0YXRlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGEgcmVndWxhciBleHByZXNzaW9uIGxpdGVyYWwuIEUuZy4gXCIvYWJjL2dcIlxuICAgICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBjb2RlIHRvIHBhcnNlLlxuICAgICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSBlbmQgVGhlIGVuZCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybnMgVGhlIEFTVCBvZiB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIHBhcnNlTGl0ZXJhbChcbiAgICAgICAgc291cmNlOiBzdHJpbmcsXG4gICAgICAgIHN0YXJ0OiBudW1iZXIgPSAwLFxuICAgICAgICBlbmQ6IG51bWJlciA9IHNvdXJjZS5sZW5ndGgsXG4gICAgKTogUmVnRXhwTGl0ZXJhbCB7XG4gICAgICAgIHRoaXMuX3N0YXRlLnNvdXJjZSA9IHNvdXJjZVxuICAgICAgICB0aGlzLl92YWxpZGF0b3IudmFsaWRhdGVMaXRlcmFsKHNvdXJjZSwgc3RhcnQsIGVuZClcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IHRoaXMuX3N0YXRlLnBhdHRlcm5cbiAgICAgICAgY29uc3QgZmxhZ3MgPSB0aGlzLl9zdGF0ZS5mbGFnc1xuICAgICAgICBjb25zdCBsaXRlcmFsOiBSZWdFeHBMaXRlcmFsID0ge1xuICAgICAgICAgICAgdHlwZTogXCJSZWdFeHBMaXRlcmFsXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgIHJhdzogc291cmNlLFxuICAgICAgICAgICAgcGF0dGVybixcbiAgICAgICAgICAgIGZsYWdzLFxuICAgICAgICB9XG4gICAgICAgIHBhdHRlcm4ucGFyZW50ID0gbGl0ZXJhbFxuICAgICAgICBmbGFncy5wYXJlbnQgPSBsaXRlcmFsXG4gICAgICAgIHJldHVybiBsaXRlcmFsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYSByZWd1bGFyIGV4cHJlc3Npb24gZmxhZ3MuIEUuZy4gXCJnaW1cIlxuICAgICAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBjb2RlIHRvIHBhcnNlLlxuICAgICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSBlbmQgVGhlIGVuZCBpbmRleCBpbiB0aGUgc291cmNlIGNvZGUuXG4gICAgICogQHJldHVybnMgVGhlIEFTVCBvZiB0aGUgZ2l2ZW4gZmxhZ3MuXG4gICAgICovXG4gICAgcGFyc2VGbGFncyhcbiAgICAgICAgc291cmNlOiBzdHJpbmcsXG4gICAgICAgIHN0YXJ0OiBudW1iZXIgPSAwLFxuICAgICAgICBlbmQ6IG51bWJlciA9IHNvdXJjZS5sZW5ndGgsXG4gICAgKTogRmxhZ3Mge1xuICAgICAgICB0aGlzLl9zdGF0ZS5zb3VyY2UgPSBzb3VyY2VcbiAgICAgICAgdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlRmxhZ3Moc291cmNlLCBzdGFydCwgZW5kKVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUuZmxhZ3NcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuLiBFLmcuIFwiYWJjXCJcbiAgICAgKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2UgY29kZSB0byBwYXJzZS5cbiAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIHN0YXJ0IGluZGV4IGluIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgaW5kZXggaW4gdGhlIHNvdXJjZSBjb2RlLlxuICAgICAqIEBwYXJhbSB1RmxhZyBUaGUgZmxhZyB0byBzZXQgdW5pY29kZSBtb2RlLlxuICAgICAqIEByZXR1cm5zIFRoZSBBU1Qgb2YgdGhlIGdpdmVuIHBhdHRlcm4uXG4gICAgICovXG4gICAgcGFyc2VQYXR0ZXJuKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgc3RhcnQ6IG51bWJlciA9IDAsXG4gICAgICAgIGVuZDogbnVtYmVyID0gc291cmNlLmxlbmd0aCxcbiAgICAgICAgdUZsYWc6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApOiBQYXR0ZXJuIHtcbiAgICAgICAgdGhpcy5fc3RhdGUuc291cmNlID0gc291cmNlXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZVBhdHRlcm4oc291cmNlLCBzdGFydCwgZW5kLCB1RmxhZylcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnBhdHRlcm5cbiAgICB9XG59XG4iXX0=