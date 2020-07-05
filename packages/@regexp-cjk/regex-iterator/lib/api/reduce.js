"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports._reduceCore = void 0;
const handleChainInput_1 = require("../util/handleChainInput");
const _each_1 = require("./_each");
const handleChainRowResult_1 = require("../util/handleChainRowResult");
function* _reduceCore(input, chain, options = {}) {
    let { allowFallbackToSource } = options;
    chain = chain.slice();
    const { regexp: re, backref } = handleChainInput_1.handleChainInput(chain.shift(), options);
    const options2 = {
        ...options,
        global: false,
    };
    for (const m of _each_1._each(input, re, options)) {
        let str = handleChainRowResult_1.handleChainRowResult({
            regexp: re,
            backref,
            match: m.match,
            allowFallbackToSource,
        }, m.match[0]);
        if (chain.length > 0) {
            for (const row of chain) {
                let { regexp, backref } = handleChainInput_1.handleChainInput(row, options2);
                const match = str.match(regexp);
                str = handleChainRowResult_1.handleChainRowResult({
                    regexp,
                    backref,
                    match,
                    allowFallbackToSource,
                }, str);
            }
        }
        yield str;
    }
}
exports._reduceCore = _reduceCore;
function reduce(input, chain, options = {}) {
    return [..._reduceCore(input, chain, options)];
}
exports.reduce = reduce;
exports.default = reduce;
//# sourceMappingURL=reduce.js.map