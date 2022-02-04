"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAll = exports.execall = void 0;
const tslib_1 = require("tslib");
/// <reference lib="es2018.regexp" />
const clone_regexp_1 = tslib_1.__importDefault(require("@regexp-cjk/clone-regexp"));
tslib_1.__exportStar(require("./lib/types"), exports);
const types_1 = require("./lib/types");
function execall(inputRegExp, input, options) {
    let match;
    options = options || {};
    const { resetLastIndex = true, cloneRegexp, removeHiddenData } = options;
    const matches = [];
    const re = (0, clone_regexp_1.default)(inputRegExp, options);
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