/**
 * The type which includes all nodes.
 */
import { EnumKindAssertion, EnumKindCharacterSet, EnumKindEdgeAssertion, EnumKindEscapeCharacterSet, EnumTypeNode } from './const';
export declare type Node = BranchNode | LeafNode;
/**
 * The type which includes all branch nodes.
 */
export declare type BranchNode = RegExpLiteral | Pattern | Disjunction | Group | CapturingGroup | Quantifier | CharacterClass | LookaroundAssertion | CharacterClassRange;
/**
 * The type which includes all leaf nodes.
 */
export declare type LeafNode = BoundaryAssertion | CharacterSet | Character | Backreference | Flags;
/**
 * The type which includes all atom nodes.
 */
export declare type Element = Disjunction | Group | CapturingGroup | Quantifier | CharacterClass | Assertion | CharacterSet | Character | Backreference;
/**
 * The type which includes all character class atom nodes.
 */
export declare type CharacterClassElement = EscapeCharacterSet | UnicodePropertyCharacterSet | Character | CharacterClassRange;
/**
 * The type which includes all atom nodes that Alternative node can have as children.
 */
export declare type AlternativeElement = Group | CapturingGroup | Quantifier | CharacterClass | Assertion | CharacterSet | Character | Backreference;
/**
 * The type which includes all atom nodes that Quantifier node can have as children.
 */
export declare type QuantifiableElement = Group | CapturingGroup | CharacterClass | LookaheadAssertion | CharacterSet | Character | Backreference;
/**
 * The type which defines common properties for all node types.
 */
export interface NodeBase {
    /** The node type. */
    type: Node["type"];
    /** The parent node. */
    parent: Node["parent"];
    /** The 0-based index that this node starts. */
    start: number;
    /** The 0-based index that this node ends. */
    end: number;
    /** The raw text of this node. */
    raw: string;
}
/**
 * The root node.
 */
export interface RegExpLiteral extends NodeBase {
    type: EnumTypeNode.RegExpLiteral;
    parent: null;
    pattern: Pattern;
    flags: Flags;
}
/**
 * The pattern.
 */
export interface Pattern extends NodeBase {
    type: EnumTypeNode.Pattern;
    parent: RegExpLiteral | null;
    elements: Element[];
}
/**
 * The disjunction.
 * E.g. `a|b`
 */
export interface Disjunction extends NodeBase {
    type: EnumTypeNode.Disjunction;
    parent: Pattern | Group | CapturingGroup | LookaroundAssertion;
    alternatives: AlternativeElement[][];
}
/**
 * The uncapturing group.
 * E.g. `(?:ab)`
 */
export interface Group extends NodeBase {
    type: EnumTypeNode.Group;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    elements: Element[];
}
/**
 * The capturing group.
 * E.g. `(ab)`, `(?<name>ab)`
 */
export interface CapturingGroup extends NodeBase {
    type: EnumTypeNode.CapturingGroup;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    name: string | null;
    elements: Element[];
    references: Backreference[];
}
/**
 * The lookaround assertion.
 */
export declare type LookaroundAssertion = LookaheadAssertion | LookbehindAssertion;
/**
 * The lookahead assertion.
 * E.g. `(?=ab)`, `(?!ab)`
 */
export interface LookaheadAssertion extends NodeBase {
    type: EnumTypeNode.LookaheadAssertion;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    kind: EnumKindAssertion.LookaheadAssertion;
    negate: boolean;
    elements: Element[];
}
/**
 * The lookbehind assertion.
 * E.g. `(?<=ab)`, `(?<!ab)`
 */
export interface LookbehindAssertion extends NodeBase {
    type: EnumTypeNode.LookbehindAssertion;
    parent: Pattern | Disjunction | Group | CapturingGroup | LookaroundAssertion;
    kind: EnumKindAssertion.LookbehindAssertion;
    negate: boolean;
    elements: Element[];
}
/**
 * The quantifier.
 * E.g. `a?`, `a*`, `a+`, `a{1,2}`, `a??`, `a*?`, `a+?`, `a{1,2}?`
 */
export interface Quantifier extends NodeBase {
    type: EnumTypeNode.Quantifier;
    parent: Pattern | Disjunction | Group | CapturingGroup | LookaroundAssertion;
    min: number;
    max: number;
    greedy: boolean;
    element: QuantifiableElement;
}
/**
 * The character class.
 * E.g. `[ab]`, `[^ab]`
 */
export interface CharacterClass extends NodeBase {
    type: EnumTypeNode.CharacterClass;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    negate: boolean;
    elements: CharacterClassElement[];
}
/**
 * The character class.
 * E.g. `[a-b]`
 */
export interface CharacterClassRange extends NodeBase {
    type: EnumTypeNode.CharacterClassRange;
    parent: CharacterClass;
    min: Character;
    max: Character;
}
/**
 * The assertion.
 */
export declare type Assertion = BoundaryAssertion | LookaroundAssertion;
/**
 * The boundary assertion.
 */
export declare type BoundaryAssertion = EdgeAssertion | WordBoundaryAssertion;
/**
 * The edge boundary assertion.
 * E.g. `^`, `$`
 */
export interface EdgeAssertion extends NodeBase {
    type: EnumTypeNode.EdgeAssertion;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    kind: EnumKindEdgeAssertion;
}
/**
 * The word bondary assertion.
 * E.g. `\b`, `\B`
 */
export interface WordBoundaryAssertion extends NodeBase {
    type: EnumTypeNode.WordBoundaryAssertion;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    kind: EnumKindAssertion.WordBoundaryAssertion;
    negate: boolean;
}
/**
 * The character set.
 */
export declare type CharacterSet = AnyCharacterSet | EscapeCharacterSet | UnicodePropertyCharacterSet;
/**
 * The dot.
 * E.g. `.`
 */
export interface AnyCharacterSet extends NodeBase {
    type: EnumTypeNode.AnyCharacterSet;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    kind: EnumKindCharacterSet.AnyCharacterSet;
}
/**
 * The character class escape.
 * E.g. `\d`, `\s`, `\w`, `\D`, `\S`, `\W`
 */
export interface EscapeCharacterSet extends NodeBase {
    type: EnumTypeNode.EscapeCharacterSet;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | CharacterClass | LookaroundAssertion;
    kind: EnumKindEscapeCharacterSet;
    negate: boolean;
}
/**
 * The unicode property escape.
 * E.g. `\p{ASCII}`, `\P{ASCII}`, `\p{Script=Hiragana}`
 */
export interface UnicodePropertyCharacterSet extends NodeBase {
    type: EnumTypeNode.UnicodePropertyCharacterSet;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | CharacterClass | LookaroundAssertion;
    kind: EnumKindCharacterSet.UnicodePropertyCharacterSet;
    key: string;
    value: string | null;
    negate: boolean;
}
/**
 * The character.
 * This includes escape sequences which mean a character.
 * E.g. `a`, `あ`, `✿`, `\x65`, `\u0065`, `\u{65}`, `\/`
 */
export interface Character extends NodeBase {
    type: EnumTypeNode.Character;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | CharacterClass | LookaroundAssertion | CharacterClassRange;
    value: number;
}
/**
 * The backreference.
 * E.g. `\1`, `\k<name>`
 */
export interface Backreference extends NodeBase {
    type: EnumTypeNode.Backreference;
    parent: Pattern | Disjunction | Group | CapturingGroup | Quantifier | LookaroundAssertion;
    ref: number | string;
    resolved: CapturingGroup;
}
/**
 * The flags.
 */
export interface Flags extends NodeBase {
    type: EnumTypeNode.Flags;
    parent: RegExpLiteral | null;
    dotAll: boolean;
    global: boolean;
    ignoreCase: boolean;
    multiline: boolean;
    sticky: boolean;
    unicode: boolean;
}
declare const _default: typeof import("./ast");
export default _default;
