"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpSyntaxError = void 0;
class RegExpSyntaxError extends SyntaxError {
    constructor(source, uFlag, index, message) {
        /*eslint-disable no-param-reassign */
        if (source) {
            if (source[0] !== "/") {
                source = `/${source}/${uFlag ? "u" : ""}`;
            }
            source = `: ${source}`;
        }
        /*eslint-enable no-param-reassign */
        super(`Invalid regular expression${source}: ${message}`);
        this.index = index;
    }
}
exports.RegExpSyntaxError = RegExpSyntaxError;
//# sourceMappingURL=regexp-syntax-error.js.map