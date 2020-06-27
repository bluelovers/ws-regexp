"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePinyinType = void 0;
const types_1 = require("../types");
function handlePinyinType(pinyinType) {
    if (typeof pinyinType !== 'number' || !(pinyinType in types_1.EnumPinyinType)) {
        pinyinType = types_1.EnumPinyinType.han;
    }
    return pinyinType;
}
exports.handlePinyinType = handlePinyinType;
//# sourceMappingURL=uni2zhuyin.js.map