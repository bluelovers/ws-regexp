"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hangulReplace = void 0;
const hangulPattern_1 = __importDefault(require("./unicode/hangulPattern"));
function hangulReplace(text, callback) { return text.replace(hangulPattern_1.default, callback); }
exports.hangulReplace = hangulReplace;
exports.default = hangulReplace;
//# sourceMappingURL=hangulReplace.js.map