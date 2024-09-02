"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJamoDictionary = getJamoDictionary;
exports.searchJamo = searchJamo;
exports.handleRomanizeOptions = handleRomanizeOptions;
const jamo_1 = require("./jamo");
function getJamoDictionary(jamo, idx) {
    if (typeof jamo === 'number') {
        jamo = String.fromCodePoint(jamo);
    }
    return jamo_1.ListJamoRoman[idx].find(o => o.jamo === jamo) ||
        jamo_1.ListJamoRoman[idx].find(o => o.compatJamo === jamo);
}
function searchJamo(node, params, prevNode) {
    const { method, vowelNext, consonantNext, consonantPrev } = params || {
        method: "RR" /* EnumOptionsRomanizeMethod.RR */,
    };
    if (typeof node === "string") {
        return node;
    }
    if (!node) {
        if (prevNode) {
            console.warn(prevNode);
        }
        throw new Error("No node found after" + JSON.stringify(prevNode));
    }
    // treat empty string (initial silent ieung/ㅇ as truthy)
    if (node.roman || typeof node.roman === "string") {
        return next(node.roman);
    }
    if (method && (node[method] || typeof node[method] === "string")) {
        return next(node[method]);
    }
    // @ts-ignore
    if (vowelNext && (node.vowelNext || typeof node.vowelNext === "string")) {
        // @ts-ignore
        return next(node.vowelNext);
    }
    if (consonantNext || consonantPrev) {
        const assimilation = String.fromCodePoint(consonantNext || consonantPrev);
        if (typeof node[assimilation] === "string") {
            return node[assimilation];
        }
        else if (node[assimilation]) {
            return node[assimilation];
        }
    }
    // @ts-ignore
    if (node.default || typeof node.default === "string") {
        // @ts-ignore
        return next(node.default);
    }
    throw new Error("Unimplemented: " + JSON.stringify(node, null, 2));
    function next(nextNode) {
        return searchJamo(nextNode, params, node);
    }
}
function handleRomanizeOptions(options) {
    var _a, _b;
    if (typeof options === 'string') {
        options = {
            method: options,
        };
    }
    else {
        options = {
            ...options
        };
    }
    (_a = options.method) !== null && _a !== void 0 ? _a : (options.method = "RR" /* EnumOptionsRomanizeMethod.RR */);
    (_b = options.hyphenate) !== null && _b !== void 0 ? _b : (options.hyphenate = options.method === "RRT" /* EnumOptionsRomanizeMethod.RRT */ || undefined);
    return options;
}
//# sourceMappingURL=utils.js.map