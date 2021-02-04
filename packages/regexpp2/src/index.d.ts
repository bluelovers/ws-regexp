import * as AST from "./ast";
import { RegExpParser } from "./parser";
import { RegExpValidator } from "./validator";
export * from "./const";
export { AST, RegExpParser, RegExpValidator };
/**
 * Parse a given regular expression literal then make AST object.
 * @param source The source code to parse.
 * @param options The options to parse.
 * @returns The AST of the regular expression.
 */
export declare function parseRegExpLiteral(source: string | RegExp, options?: RegExpParser.Options): AST.RegExpLiteral;
/**
 * Validate a given regular expression literal.
 * @param source The source code to validate.
 * @param options The options to validate.
 */
export declare function validateRegExpLiteral(source: string, options?: RegExpValidator.Options): void;
declare const _default: typeof import("./index");
export default _default;
