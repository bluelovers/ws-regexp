"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternSupport = {
    namedCapturingGroups: false,
};
exports.PatternTest = {
    namedCapturingGroups: [
        ['U\\+(?<naïve嬢の日常>[0-9A-F]{4})', '', 'U+2620', {
                groups: { 'naïve嬢の日常': '2620' },
            }, function (r, value, input) {
                let ret = r.exec(input);
                return ret.groups && Object
                    .entries(ret.groups)
                    .every(function (v) {
                    let [key, v1] = v;
                    let v2 = value.groups[key];
                    //console.log(key, v1, v2, v1 === v2);
                    return v1 === v2;
                });
            }],
    ],
};
function testPattern(name, RegExpClass = RegExp, testPattern = exports.PatternTest) {
    if (testPattern[name] && testPattern[name].length) {
        let bool = false;
        try {
            bool = testPattern[name].every(function (v) {
                let [pattern, flag, input, value, fn] = v;
                let bool;
                let r = new RegExpClass(pattern, flag);
                if (fn) {
                    if (typeof fn == 'function') {
                        bool = fn(r, value, input, pattern, RegExpClass, flag);
                    }
                    else {
                        bool = r[fn](input) === value;
                    }
                }
                else {
                    bool = r.exec(input) === value;
                }
                //console.log(bool);
                return bool;
            }) === true;
            //console.log(bool);
        }
        catch (e) {
            bool = false;
        }
        return bool;
    }
    return null;
}
exports.testPattern = testPattern;
exports.default = exports.PatternSupport;
