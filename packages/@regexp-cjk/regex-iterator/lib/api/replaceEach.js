"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceEach = replaceEach;
const handleChainInput_1 = require("../util/handleChainInput");
function replaceEach(input, chain, options = {}) {
    for (let row of chain) {
        let [regexp, value,] = (0, handleChainInput_1.handleChainInputCore2)(row, options);
        input = input.replace(regexp, value);
    }
    return input;
}
exports.default = replaceEach;
//# sourceMappingURL=replaceEach.js.map