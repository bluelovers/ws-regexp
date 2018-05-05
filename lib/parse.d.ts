/**
 * Created by user on 2018/5/3/003.
 */
import * as regexpp from 'regexpp2';
import { AST } from 'regexpp2';
export declare const EMOJI_REGEX: RegExp;
export declare const defaultRegExpParser: any;
export declare function createRegExpParser(options?: regexpp.RegExpParser.Options): any;
export declare function parseRegExp(input: string, objRegExpParser?: any): any;
export declare function parseFlags(input: string, objRegExpParser?: any): any;
export declare function parsePattern(input: string, uFlag?: boolean | string, objRegExpParser?: any): any;
export declare function fakePatternToRegExpLiteral(pattern: AST.Pattern | string, flags?: string | AST.Flags, objRegExpParser?: any): AST.RegExpLiteral;
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
import * as self from './parse';
export default self;
