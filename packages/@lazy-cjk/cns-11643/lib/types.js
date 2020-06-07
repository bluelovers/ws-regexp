"use strict";
/**
 * Created by user on 2020/5/30.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumPinyinType = exports.EnumPinyinMode = void 0;
var EnumPinyinMode;
(function (EnumPinyinMode) {
    /**
     * 「CNS_pinyin_1」以調值(數字)呈現
     */
    EnumPinyinMode[EnumPinyinMode["num"] = 0] = "num";
    /**
     * 「CNS_pinyin_2」以聲調符號呈現
     * @type {EnumPinyinMode.tone}
     */
    EnumPinyinMode[EnumPinyinMode["tone"] = 1] = "tone";
})(EnumPinyinMode = exports.EnumPinyinMode || (exports.EnumPinyinMode = {}));
var EnumPinyinType;
(function (EnumPinyinType) {
    /**
     * 漢語(han)
     */
    EnumPinyinType[EnumPinyinType["han"] = 0] = "han";
    /**
     * 注音第二式(zuin2)
     */
    EnumPinyinType[EnumPinyinType["zuin2"] = 1] = "zuin2";
    /**
     * 耶魯(yale)
     */
    EnumPinyinType[EnumPinyinType["yale"] = 2] = "yale";
    /**
     * 韋式(wei)
     */
    EnumPinyinType[EnumPinyinType["wei"] = 3] = "wei";
})(EnumPinyinType = exports.EnumPinyinType || (exports.EnumPinyinType = {}));
//# sourceMappingURL=types.js.map