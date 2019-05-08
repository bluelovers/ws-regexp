import { Alternative, Assertion, Backreference, CapturingGroup, Character, CharacterClass, CharacterClassRange, CharacterSet, Flags, Group, Node, Pattern, Quantifier, RegExpLiteral } from "./ast";
/**
 * The visitor to walk on AST.
 */
export declare class RegExpVisitor {
    private readonly _handlers;
    /**
     * Initialize this visitor.
     * @param handlers Callbacks for each node.
     */
    constructor(handlers: RegExpVisitor.Handlers);
    /**
     * Visit a given node and descendant nodes.
     * @param node The root node to visit tree.
     */
    visit(node: Node): void;
    private visitAlternative;
    private visitAssertion;
    private visitBackreference;
    private visitCapturingGroup;
    private visitCharacter;
    private visitCharacterClass;
    private visitCharacterClassRange;
    private visitCharacterSet;
    private visitFlags;
    private visitGroup;
    private visitPattern;
    private visitQuantifier;
    private visitRegExpLiteral;
}
export declare namespace RegExpVisitor {
    interface Handlers {
        onAlternativeEnter?(node: Alternative): void;
        onAlternativeLeave?(node: Alternative): void;
        onAssertionEnter?(node: Assertion): void;
        onAssertionLeave?(node: Assertion): void;
        onBackreferenceEnter?(node: Backreference): void;
        onBackreferenceLeave?(node: Backreference): void;
        onCapturingGroupEnter?(node: CapturingGroup): void;
        onCapturingGroupLeave?(node: CapturingGroup): void;
        onCharacterEnter?(node: Character): void;
        onCharacterLeave?(node: Character): void;
        onCharacterClassEnter?(node: CharacterClass): void;
        onCharacterClassLeave?(node: CharacterClass): void;
        onCharacterClassRangeEnter?(node: CharacterClassRange): void;
        onCharacterClassRangeLeave?(node: CharacterClassRange): void;
        onCharacterSetEnter?(node: CharacterSet): void;
        onCharacterSetLeave?(node: CharacterSet): void;
        onFlagsEnter?(node: Flags): void;
        onFlagsLeave?(node: Flags): void;
        onGroupEnter?(node: Group): void;
        onGroupLeave?(node: Group): void;
        onPatternEnter?(node: Pattern): void;
        onPatternLeave?(node: Pattern): void;
        onQuantifierEnter?(node: Quantifier): void;
        onQuantifierLeave?(node: Quantifier): void;
        onRegExpLiteralEnter?(node: RegExpLiteral): void;
        onRegExpLiteralLeave?(node: RegExpLiteral): void;
    }
}
