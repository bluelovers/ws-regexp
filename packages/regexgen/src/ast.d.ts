import regenerate, { IRegenerateObject } from 'regenerate';
/**
 * Represents an alternation (e.g. `foo|bar`)
 */
export declare class Alternation {
    precedence: number;
    options: any;
    constructor(...options: any[]);
    flatten(options: any): any;
    get length(): any;
    toString(flags: any): any;
}
/**
 * Represents a character class (e.g. [0-9a-z])
 */
export declare class CharClass {
    precedence: number;
    set: IRegenerateObject;
    constructor(a: any, b: any);
    get length(): number;
    get isSingleCharacter(): boolean;
    get isSingleCodepoint(): boolean;
    toString(flags: any): string;
    getCharClass(): regenerate.IRegenerateObject;
}
/**
 * Represents a concatenation (e.g. `foo`)
 */
export declare class Concatenation {
    precedence: number;
    a: any;
    b: any;
    constructor(a: any, b: any);
    get length(): any;
    toString(flags: any): any;
    getLiteral(side: any): any;
    removeSubstring(side: any, len: any): any;
}
/**
 * Represents a repetition (e.g. `a*` or `a?`)
 */
export declare class Repetition {
    precedence: number;
    expr: any;
    type: any;
    constructor(expr: any, type: any);
    get length(): any;
    toString(flags: any): any;
}
/**
 * Represents a literal (e.g. a string)
 */
export declare class Literal {
    precedence: number;
    value: any;
    constructor(value: any);
    get isEmpty(): boolean;
    get isSingleCharacter(): boolean;
    get isSingleCodepoint(): boolean;
    get length(): any;
    toString(flags: any): any;
    getCharClass(): any;
    getLiteral(): any;
    removeSubstring(side: any, len: any): Literal;
}
export declare function parens(exp: any, parent: any, flags: any): any;
