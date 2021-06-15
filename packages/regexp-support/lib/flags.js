"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagsPattern = exports.FlagsName = void 0;
var FlagsName;
(function (FlagsName) {
    FlagsName["multiline"] = "m";
    FlagsName["m"] = "m";
    FlagsName["global"] = "g";
    FlagsName["g"] = "g";
    FlagsName["ignoreCase"] = "i";
    FlagsName["i"] = "i";
    // ---------------
    FlagsName["sticky"] = "y";
    FlagsName["y"] = "y";
    FlagsName["unicode"] = "u";
    FlagsName["u"] = "u";
    // ---------------
    /**
     * dot match all mode
     * node.js 10
     *
     * @link http://2ality.com/2017/07/regexp-dotall-flag.html
     * @code
     * /^.$/.test('\n') // => false
     * /^.$/s.test('\n') // => true
     * /^[^]$/.test('\n') // => true
     *
     * @type {string}
     */
    FlagsName["dotAll"] = "s";
    FlagsName["s"] = "s";
    // ---------------
    FlagsName["freeSpacing"] = "x";
    FlagsName["x"] = "x";
    FlagsName["indices"] = "d";
    FlagsName["d"] = "d";
    FlagsName["n"] = "n";
})(FlagsName = exports.FlagsName || (exports.FlagsName = {}));
Object
    .keys(FlagsName)
    .forEach(function (v) {
    // @ts-ignore
    FlagsName[FlagsName[v]] = FlagsName[v];
});
exports.FlagsPattern = {
    s: [
        ['^.$', '\n', true],
    ],
    d: [
        [
            'a+(?<Z>z)?', 'xaaaz', null, (re, value, input, pattern, RegExpClass, flag, ...argv) => {
                let ret = re.exec(input);
                if (ret.indices[0][0] === 1
                    && ret.indices[0][1] === 5
                    && ret.indices[1][0] === 4
                    && ret.indices[1][1] === 5
                    && ret.indices.groups.Z[0] === 4
                    && ret.indices.groups.Z[1] === 5) {
                    return true;
                }
                return false;
            },
        ],
    ],
};
exports.default = FlagsName;
//# sourceMappingURL=flags.js.map