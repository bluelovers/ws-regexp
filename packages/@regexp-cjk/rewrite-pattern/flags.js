"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteFlags = exports.flagsOrderReverse = exports.EnumFlagMap = void 0;
var EnumFlagMap;
(function (EnumFlagMap) {
    EnumFlagMap["global"] = "g";
    EnumFlagMap["ignoreCase"] = "i";
    EnumFlagMap["multiline"] = "m";
    EnumFlagMap["dotAll"] = "s";
    EnumFlagMap["sticky"] = "y";
    EnumFlagMap["unicode"] = "u";
})(EnumFlagMap = exports.EnumFlagMap || (exports.EnumFlagMap = {}));
exports.flagsOrderReverse = [
    'sticky',
    'unicode',
    'dotAll',
    'multiline',
    'ignoreCase',
    'global',
];
function rewriteFlags(flags, options) {
    if (typeof flags === 'object') {
        ([flags, options] = ['', flags]);
    }
    flags = (flags !== null && flags !== void 0 ? flags : '');
    Object.entries(options !== null && options !== void 0 ? options : {})
        .forEach(([key, bool]) => {
        const _flag = EnumFlagMap[key];
        if (typeof _flag === 'string') {
            if (bool === false && flags !== '') {
                flags = flags.replace(_flag, '');
            }
            else if (bool === true && !flags.includes(_flag)) {
                flags = _flag + flags;
            }
        }
    });
    return flags;
}
exports.rewriteFlags = rewriteFlags;
exports.default = rewriteFlags;
//# sourceMappingURL=flags.js.map