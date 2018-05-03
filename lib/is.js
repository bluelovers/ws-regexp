"use strict";
/**
 * Created by user on 2018/5/3/003.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_support_1 = require("regexp-support");
const REGEXP_TO_STRING_TAG = regexp_support_1.default.objectStringTag;
function isRegExp(r) {
    if ((r instanceof RegExp) || Object.prototype.toString.call(r) === REGEXP_TO_STRING_TAG) {
        return r;
    }
    return null;
}
exports.isRegExp = isRegExp;
exports.default = isRegExp;
