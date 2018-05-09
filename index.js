"use strict";
const cloneRegexp = require("clone-regexp");
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
let _execAll = execAll;
_execAll.default = _execAll.execAll = execAll;
module.exports = _execAll;
