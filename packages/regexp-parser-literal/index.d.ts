import { AST, RegExpParser } from 'regexpp2';
export declare const EMOJI_REGEX: RegExp;
export declare const defaultRegExpParser: RegExpParser;
export declare function createRegExpParser(options?: RegExpParser.Options): RegExpParser;
export declare function parseRegExp(input: string, objRegExpParser?: RegExpParser): AST.RegExpLiteral;
export declare function parseFlags(input: string, objRegExpParser?: RegExpParser): AST.Flags;
export declare function parsePattern(input: string, uFlag?: boolean | string, objRegExpParser?: RegExpParser): AST.Pattern;
export declare function fakePatternToRegExpLiteral(pattern: AST.Pattern | string, flags?: string | AST.Flags, objRegExpParser?: RegExpParser): AST.RegExpLiteral;
export type IAstToStringOptions = {
    debugChanged?: boolean | number;
    noUniqueClass?: boolean;
    doUniqueClassEmoji?: boolean;
    sortClass?: boolean;
};
export declare function astToString(ast: AST.Element & INodePlus | AST.Node & INodePlus, options?: IAstToStringOptions): string;
export type INodePlus = {
    changed?: boolean;
    old_raw?: string;
};
declare const _default: typeof import("./index");
export default _default;
