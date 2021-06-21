"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hangulReplace = void 0;
const tslib_1 = require("tslib");
const hangulPattern_1 = tslib_1.__importDefault(require("./unicode/hangulPattern"));
function hangulReplace(text, callback) { return text.replace(hangulPattern_1.default, callback); }
exports.hangulReplace = hangulReplace;
exports.default = hangulReplace;
//# sourceMappingURL=hangulReplace.js.map