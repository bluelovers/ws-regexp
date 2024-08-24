"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hangulReplace = hangulReplace;
const hangulPattern_1 = require("./unicode/hangulPattern");
function hangulReplace(text, callback) {
    return text.replace(hangulPattern_1.hangulPattern, callback);
}
exports.default = hangulReplace;
//# sourceMappingURL=hangulReplace.js.map