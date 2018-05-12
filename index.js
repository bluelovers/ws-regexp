"use strict";
const cloneRegexp = require("clone-regexp");
const S = Symbol.for('execall');
function execAll(inputRegExp, input) {
    let match;
    let matches = [];
    let re = cloneRegexp(inputRegExp);
    let isGlobal = re.global;
    while (match = re.exec(input)) {
        delete match.input;
        matches.push(Object.assign(match, {
            match: match[0],
            sub: match.slice(1),
            [S]: matches,
        }));
        if (!isGlobal) {
            break;
        }
    }
    Object.defineProperties(matches, {
        re: {
            value: re,
            enumerable: false,
            configurable: true,
        },
        input: {
            value: input,
            enumerable: false,
            configurable: true,
        },
    });
    return matches;
}
// @ts-ignore
let _execAll = execAll;
_execAll.SYMBOL = S;
_execAll.default = _execAll.execall = execAll;
module.exports = _execAll;
