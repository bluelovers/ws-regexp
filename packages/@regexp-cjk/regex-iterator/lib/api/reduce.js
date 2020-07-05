"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports._reduceCore = void 0;
const handleChainInput_1 = require("../util/handleChainInput");
const _each_1 = require("./_each");
const handleChainRowResult_1 = require("../util/handleChainRowResult");
function* _reduceCore(input, chain, options = {}) {
    let { allowFallbackToSource } = options;
    chain = chain.slice();
    const _root = handleChainInput_1.handleChainInput(chain.shift(), options);
    const options2 = {
        ...options,
        global: false,
    };
    for (const m of _each_1._each(input, _root.regexp, options)) {
        let str = handleChainRowResult_1.handleChainRowResult(_root, m.match[0], m.match, options);
        if (chain.length > 0) {
            for (const row of chain) {
                let _sub = handleChainInput_1.handleChainInput(row, options2);
                const match = str.match(_sub.regexp);
                str = handleChainRowResult_1.handleChainRowResult(_sub, str, match, options2);
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