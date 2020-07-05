"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._each = void 0;
const clone_regexp_1 = __importDefault(require("@regexp-cjk/clone-regexp"));
function* _each(input, re, options = {}) {
    let match;
    // @ts-ignore
    re = clone_regexp_1.default(re, options);
    const isGlobal = re.global;
    let index = -1;
    while ((match = re.exec(input)) !== null) {
        index++;
        let { leftContext, rightContext, } = RegExp;
        yield {
            match,
            re,
            index,
            data: {
                leftContext,
                rightContext,
            },
        };
        if (isGlobal !== true) {
            break;
        }
    }
}
exports._each = _each;
exports.default = _each;
//# sourceMappingURL=_each.js.map