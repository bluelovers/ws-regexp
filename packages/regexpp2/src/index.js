"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegExpLiteral = exports.parseRegExpLiteral = exports.RegExpValidator = exports.RegExpParser = exports.AST = void 0;
const AST = __importStar(require("./ast"));
exports.AST = AST;
const parser_1 = require("./parser");
Object.defineProperty(exports, "RegExpParser", { enumerable: true, get: function () { return parser_1.RegExpParser; } });
const validator_1 = require("./validator");
Object.defineProperty(exports, "RegExpValidator", { enumerable: true, get: function () { return validator_1.RegExpValidator; } });
//import { RegExpVisitor } from "./visitor"
__exportStar(require("./const"), exports);
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