"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * @deprecated
 */
tslib_1.__exportStar(require("./index"), exports);
const index_1 = tslib_1.__importDefault(require("./index"));
const methods = [
    'hiraganize',
    'katakanize',
    'romanize',
];
methods.forEach(function (method) {
    Object.defineProperty(String.prototype, method, {
        value: function () {
            // @ts-ignore
            return index_1.default[method].apply(this, [this].concat(arguments));
        },
        enumerable: false,
        configurable: true,
        writable: true,
    });
});
exports.default = index_1.default;
//# sourceMappingURL=sugar.js.map