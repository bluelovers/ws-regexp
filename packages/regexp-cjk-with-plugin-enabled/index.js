"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zhRegExpWithPluginEnabled = void 0;
const regexp_cjk_1 = require("regexp-cjk");
const regexp_cjk_plugin_extra_1 = require("regexp-cjk-plugin-extra");
const regexp_cjk_plugin_escape_unicode_property_1 = require("regexp-cjk-plugin-escape-unicode-property");
/**
 * zhRegExp from all plugin enabled with unsafe options
 */
exports.zhRegExpWithPluginEnabled = regexp_cjk_1.zhRegExp.use({
    onCore: [
        (0, regexp_cjk_plugin_escape_unicode_property_1.createZhRegExpCorePlugin)({
            escapeAuto: true,
        }),
    ],
    on: [
        (0, regexp_cjk_plugin_extra_1.createZhRegExpPlugin)({
            autoVoice: true,
            autoLocale: true,
            autoDeburr: true,
            autoFullHalf: true,
        })
    ],
    unsafe: true,
    greedyTable: 2,
});
exports.default = exports.zhRegExpWithPluginEnabled;
//# sourceMappingURL=index.js.map