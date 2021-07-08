"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._createFnTestPattern = exports.log_dir = void 0;
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
exports.log_dir = log_dir;
function _createFnTestPattern(initTestPatterns) {
    return (name, 
    // @ts-ignore
    RegExpClass = RegExp, testPatterns = initTestPatterns) => {
        // @ts-ignore
        return (0, pattern_1.testPattern)(name, RegExpClass, testPatterns);
    };
}
exports._createFnTestPattern = _createFnTestPattern;
//# sourceMappingURL=index.js.map