"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST = require("./ast");
exports.AST = AST;
const parser_1 = require("./parser");
exports.RegExpParser = parser_1.RegExpParser;
const validator_1 = require("./validator");
exports.RegExpValidator = validator_1.RegExpValidator;
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
