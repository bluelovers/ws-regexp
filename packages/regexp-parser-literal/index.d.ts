import regexpp = require('regexpp2');
import { AST } from 'regexpp2';
export declare const EMOJI_REGEX: RegExp;
export declare const defaultRegExpParser: regexpp.RegExpParser;
export declare function createRegExpParser(options?: regexpp.RegExpParser.Options): regexpp.RegExpParser;
export declare function parseRegExp(input: string, objRegExpParser?: regexpp.RegExpParser): regexpp.AST.RegExpLiteral;
export declare function parseFlags(input: string, objRegExpParser?: regexpp.RegExpParser): regexpp.AST.Flags;
export declare function parsePattern(input: string, uFlag?: boolean | string, objRegExpParser?: regexpp.RegExpParser): regexpp.AST.Pattern;
export declare function fakePatternToRegExpLiteral(pattern: AST.Pattern | string, flags?: string | AST.Flags, objRegExpParser?: regexpp.RegExpParser): AST.RegExpLiteral;
export declare type IAstToStringOptions = {
    debugChanged?: boolean | number;
    noUniqueClass?: boolean;
    doUniqueClassEmoji?: boolean;
    sortClass?: boolean;
};
export declare function astToString(ast: AST.Element & INodePlus | AST.Node & INodePlus, options?: IAstToStringOptions): string;
export declare type INodePlus = {
    changed?: boolean;
    old_raw?: string;
};
declare const _default: typeof import(".");
export default _default;
