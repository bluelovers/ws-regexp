"use strict";
const _cloneRegexp = require("clone-regexp");
const S = Symbol.for('execall');
function execAll(inputRegExp, input, options) {
    let match;
    options = options || {};
    const cloneRegexp = options.cloneRegexp || _cloneRegexp;
    let matches = [];
    let re = cloneRegexp(inputRegExp);
    let isGlobal = re.global;
    if (options.resetLastIndex) {
        re.lastIndex = 0;
    }
    let lastIndex = 0;
    let { rightContext, leftContext } = options;
    rightContext = !!rightContext;
    leftContext = !!leftContext;
    // @ts-ignore
    while (match = re.exec(input)) {
        delete match.input;
        matches.push(Object.assign(match, {
            match: match[0],
            sub: match.slice(1),
            // @ts-ignore
            leftContext: leftContext && RegExp.leftContext,
            // @ts-ignore
            rightContext: rightContext && RegExp.rightContext,
            [S]: matches,
        }));
        lastIndex = re.lastIndex;
        if (!isGlobal) {
            break;
        }
    }
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
    return matches;
}
// @ts-ignore
let _execAll = execAll;
// @ts-ignore
exports.default = _execAll;
_execAll.SYMBOL = S;
// @ts-ignore
_execAll.default = _execAll.execall = execAll;
Object.defineProperty(_execAll, "__esModule", { value: true });
module.exports = _execAll;
