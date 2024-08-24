"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cns2uni = cns2uni;
function cns2uni(cns) {
    var _a, _b;
    return (_b = (_a = require('./cns/unicode/cns2uni.bmp.json')[cns]) !== null && _a !== void 0 ? _a : require('./cns/unicode/cns2uni.2.json')[cns]) !== null && _b !== void 0 ? _b : require('./cns/unicode/cns2uni.15.json')[cns];
}
exports.default = cns2uni;
//# sourceMappingURL=cns2uni.js.map