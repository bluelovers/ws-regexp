"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAll = exports.execall = void 0;
/// <reference lib="es2018.regexp" />
const clone_regexp_1 = __importDefault(require("@regexp-cjk/clone-regexp"));
__exportStar(require("./lib/types"), exports);
const types_1 = require("./lib/types");
function execall(inputRegExp, input, options) {
    let match;
    options = options || {};
    const { resetLastIndex = true, cloneRegexp, removeHiddenData } = options;
    const matches = [];
    const re = clone_regexp_1.default(inputRegExp, options);
    const isGlobal = re.global;
    if (resetLastIndex) {
        re.lastIndex = 0;
    }
    let lastIndex = re.lastIndex;
    let { rightContext, leftContext } = options;
    rightContext = !!rightContext;
    leftContext = !!leftContext;
    while (match = re.exec(input)) {
        delete match.input;
        matches.push(Object.assign(match, {
            match: match[0],
            sub: match.slice(1),
            // @ts-ignore
            leftContext: leftContext && RegExp.leftContext,
            // @ts-ignore
            rightContext: rightContext && RegExp.rightContext,
            [types_1.SYMBOL]: removeHiddenData ? null : matches,
        }));
        lastIndex = re.lastIndex;
        if (!isGlobal) {
            break;
        }
    }
    if (!removeHiddenData) {
        Object.defineProperties(matches, {
            re: {
                value: re,
                enumerable: false,
                configurable: false,
                writable: false,
            },
            input: {
                value: input,
                enumerable: false,
                configurable: false,
                writable: false,
            },
            lastIndex: {
                value: lastIndex,
                enumerable: false,
                configurable: false,
                writable: false,
            },
        });
    }
    return matches;
}
exports.execall = execall;
exports.execAll = execall;
exports.default = execall;
//# sourceMappingURL=index.js.map