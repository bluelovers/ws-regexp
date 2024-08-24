"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.log_dir = log_dir;
exports._createFnTestPattern = _createFnTestPattern;
const pattern_1 = require("../pattern");
const util_1 = require("util");
//util.inspect.defaultOptions.colors = true;
function log_dir(...argv) {
    argv = argv.reduce(function (a, b) {
        let c = (0, util_1.inspect)(b, {
            colors: true,
        });
        a.push(c);
        return a;
    }, []);
    console.log(...argv);
}
function _createFnTestPattern(initTestPatterns) {
    return (name, 
    // @ts-ignore
    RegExpClass = RegExp, testPatterns = initTestPatterns) => {
        // @ts-ignore
        return (0, pattern_1.testPattern)(name, RegExpClass, testPatterns);
    };
}
//# sourceMappingURL=index.js.map