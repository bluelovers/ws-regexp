"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChainRowResult = void 0;
function handleChainRowResult({ regexp, backref, match, allowFallbackToSource, }, str) {
    let value;
    if (match !== null && typeof match !== 'undefined') {
        if (backref) {
            const isNamedBackref = isNaN(backref);
            if (isNamedBackref) {
                if (!(backref in match.groups)) {
                    throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid named capture referenced '${backref}'`);
                }
                value = match.groups[backref];
            }
            else if (!(backref in match)) {
                throw new ReferenceError(`Invalid regular expression: ${regexp}: Invalid index referenced ${backref}`);
            }
            else {
                value = match[backref];
            }
        }
        else {
            value = match[0];
        }
    }
    if (typeof value === 'undefined' && allowFallbackToSource) {
        value = str;
    }
    return value;
}
exports.handleChainRowResult = handleChainRowResult;
exports.default = handleChainRowResult;
//# sourceMappingURL=handleChainRowResult.js.map