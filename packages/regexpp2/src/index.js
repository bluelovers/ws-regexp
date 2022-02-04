"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegExpLiteral = exports.parseRegExpLiteral = exports.RegExpValidator = exports.RegExpParser = exports.AST = void 0;
const tslib_1 = require("tslib");
const AST = tslib_1.__importStar(require("./ast"));
exports.AST = AST;
const parser_1 = require("./parser");
Object.defineProperty(exports, "RegExpParser", { enumerable: true, get: function () { return parser_1.RegExpParser; } });
const validator_1 = require("./validator");
Object.defineProperty(exports, "RegExpValidator", { enumerable: true, get: function () { return validator_1.RegExpValidator; } });
//import { RegExpVisitor } from "./visitor"
tslib_1.__exportStar(require("./const"), exports);
/**
 * Parse a given regular expression literal then make AST object.
 * @param source The source code to parse.
 * @param options The options to parse.
 * @returns The AST of the regular expression.
 */
function parseRegExpLiteral(source, options) {
    return new parser_1.RegExpParser(options).parseLiteral((source instanceof RegExp) ? source.toString() : source);
}
exports.parseRegExpLiteral = parseRegExpLiteral;
/**
 * Validate a given regular expression literal.
 * @param source The source code to validate.
 * @param options The options to validate.
 */
function validateRegExpLiteral(source, options) {
    return new validator_1.RegExpValidator(options).validateLiteral(source);
}
exports.validateRegExpLiteral = validateRegExpLiteral;
/*
export function visitRegExpAST(
    node: AST.Node,
    handlers: RegExpVisitor.Handlers,
): void {
    new RegExpVisitor(handlers).visit(node)
}
 */
exports.default = exports;
//# sourceMappingURL=index.js.map