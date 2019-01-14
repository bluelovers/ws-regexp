"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const util = require("util");
//util.inspect.defaultOptions.colors = true;
function log_dir(...argv) {
    argv = argv.reduce(function (a, b) {
        let c = util.inspect(b, {
            colors: true,
        });
        a.push(c);
        return a;
    }, []);
    console.log(...argv);
}
exports.log_dir = log_dir;
function require_default(file) {
    let data = require(file);
    return data.__esModule && data.default || data;
}
exports.require_default = require_default;
function _createFnTestPattern(initTestPatterns) {
    return (name, 
    // @ts-ignore
    RegExpClass = RegExp, testPatterns = initTestPatterns) => {
        return pattern_1.testPattern(name, RegExpClass, testPatterns);
    };
}
exports._createFnTestPattern = _createFnTestPattern;
exports.default = exports;
