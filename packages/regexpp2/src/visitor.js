"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpVisitor = void 0;
/**
 * @deprecated merge not done, don't use
 * The visitor to walk on AST.
 */
class RegExpVisitor {
    /**
     * Initialize this visitor.
     * @param handlers Callbacks for each node.
     */
    constructor(handlers) {
        this._handlers = handlers;
    }
    /**
     * Visit a given node and descendant nodes.
     * @param node The root node to visit tree.
     */
    visit(node) {
        switch (node.type) {
            // @ts-ignore
            case "Alternative":
                this.visitAlternative(node);
                break;
            case "Assertion":
                this.visitAssertion(node);
                break;
            case "Backreference":
                this.visitBackreference(node);
                break;
            case "CapturingGroup":
                this.visitCapturingGroup(node);
                break;
            case "Character":
                this.visitCharacter(node);
                break;
            case "CharacterClass":
                this.visitCharacterClass(node);
                break;
            case "CharacterClassRange":
                this.visitCharacterClassRange(node);
                break;
            case "CharacterSet":
                this.visitCharacterSet(node);
                break;
            case "Flags":
                this.visitFlags(node);
                break;
            case "Group":
                this.visitGroup(node);
                break;
            case "Pattern":
                this.visitPattern(node);
                break;
            case "Quantifier":
                this.visitQuantifier(node);
                break;
            case "RegExpLiteral":
                this.visitRegExpLiteral(node);
                break;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    }
    // @ts-ignore
    visitAlternative(node) {
        if (this._handlers.onAlternativeEnter) {
            this._handlers.onAlternativeEnter(node);
        }
        node.elements.forEach(this.visit, this);
        if (this._handlers.onAlternativeLeave) {
            this._handlers.onAlternativeLeave(node);
        }
    }
    visitAssertion(node) {
        if (this._handlers.onAssertionEnter) {
            this._handlers.onAssertionEnter(node);
        }
        if (node.kind === "lookahead" || node.kind === "lookbehind") {
            // @ts-ignore
            node.alternatives.forEach(this.visit, this);
        }
        if (this._handlers.onAssertionLeave) {
            this._handlers.onAssertionLeave(node);
        }
    }
    visitBackreference(node) {
        if (this._handlers.onBackreferenceEnter) {
            this._handlers.onBackreferenceEnter(node);
        }
        if (this._handlers.onBackreferenceLeave) {
            this._handlers.onBackreferenceLeave(node);
        }
    }
    visitCapturingGroup(node) {
        if (this._handlers.onCapturingGroupEnter) {
            this._handlers.onCapturingGroupEnter(node);
        }
        // @ts-ignore
        node.alternatives.forEach(this.visit, this);
        if (this._handlers.onCapturingGroupLeave) {
            this._handlers.onCapturingGroupLeave(node);
        }
    }
    visitCharacter(node) {
        if (this._handlers.onCharacterEnter) {
            this._handlers.onCharacterEnter(node);
        }
        if (this._handlers.onCharacterLeave) {
            this._handlers.onCharacterLeave(node);
        }
    }
    visitCharacterClass(node) {
        if (this._handlers.onCharacterClassEnter) {
            this._handlers.onCharacterClassEnter(node);
        }
        node.elements.forEach(this.visit, this);
        if (this._handlers.onCharacterClassLeave) {
            this._handlers.onCharacterClassLeave(node);
        }
    }
    visitCharacterClassRange(node) {
        if (this._handlers.onCharacterClassRangeEnter) {
            this._handlers.onCharacterClassRangeEnter(node);
        }
        this.visitCharacter(node.min);
        this.visitCharacter(node.max);
        if (this._handlers.onCharacterClassRangeLeave) {
            this._handlers.onCharacterClassRangeLeave(node);
        }
    }
    visitCharacterSet(node) {
        if (this._handlers.onCharacterSetEnter) {
            this._handlers.onCharacterSetEnter(node);
        }
        if (this._handlers.onCharacterSetLeave) {
            this._handlers.onCharacterSetLeave(node);
        }
    }
    visitFlags(node) {
        if (this._handlers.onFlagsEnter) {
            this._handlers.onFlagsEnter(node);
        }
        if (this._handlers.onFlagsLeave) {
            this._handlers.onFlagsLeave(node);
        }
    }
    visitGroup(node) {
        if (this._handlers.onGroupEnter) {
            this._handlers.onGroupEnter(node);
        }
        // @ts-ignore
        node.alternatives.forEach(this.visit, this);
        if (this._handlers.onGroupLeave) {
            this._handlers.onGroupLeave(node);
        }
    }
    visitPattern(node) {
        if (this._handlers.onPatternEnter) {
            this._handlers.onPatternEnter(node);
        }
        // @ts-ignore
        node.alternatives.forEach(this.visit, this);
        if (this._handlers.onPatternLeave) {
            this._handlers.onPatternLeave(node);
        }
    }
    visitQuantifier(node) {
        if (this._handlers.onQuantifierEnter) {
            this._handlers.onQuantifierEnter(node);
        }
        this.visit(node.element);
        if (this._handlers.onQuantifierLeave) {
            this._handlers.onQuantifierLeave(node);
        }
    }
    visitRegExpLiteral(node) {
        if (this._handlers.onRegExpLiteralEnter) {
            this._handlers.onRegExpLiteralEnter(node);
        }
        this.visitPattern(node.pattern);
        this.visitFlags(node.flags);
        if (this._handlers.onRegExpLiteralLeave) {
            this._handlers.onRegExpLiteralLeave(node);
        }
    }
}
exports.RegExpVisitor = RegExpVisitor;
//# sourceMappingURL=visitor.js.map