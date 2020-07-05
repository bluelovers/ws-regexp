"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChainRowResult = void 0;
function handleChainRowResult({ regexp, backref, }, str, match, { allowFallbackToSource }) {
    let ret;
    if (match !== null && typeof match !== 'undefined') {
        if (backref) {
            const isNamedBackref = isNaN(backref);
            if (isNamedBackref) {
                if (!(backref in match.groups)) {
                    throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid named capture referenced '${backref}'`);
                }
                ret = match.groups[backref];
            }
            else if (!(backref in match)) {
                throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid index referenced ${backref}`);
            }
            else {
                ret = match[backref];
            }
        }
        else {
            ret = match[0];
        }
    }
    if (typeof ret === 'undefined' && allowFallbackToSource) {
        ret = str;
    }
    return ret;
}
exports.handleChainRowResult = handleChainRowResult;
exports.default = handleChainRowResult;
//# sourceMappingURL=handleChainRowResult.js.map