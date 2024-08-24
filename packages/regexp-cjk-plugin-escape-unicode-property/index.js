"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZhRegExpCorePlugin = createZhRegExpCorePlugin;
exports.astUnicodePropertyCharacterSet = astUnicodePropertyCharacterSet;
exports.checkUnicodePropertyEscape = checkUnicodePropertyEscape;
exports.unicodePropertyEscape = unicodePropertyEscape;
const tslib_1 = require("tslib");
const regexp_parser_event_1 = tslib_1.__importDefault(require("regexp-parser-event"));
const rewrite_pattern_1 = require("@regexp-cjk/rewrite-pattern");
const plugin_1 = require("regexp-cjk/lib/plugin");
const escape_unicode_property_1 = require("@regexp-cjk/escape-unicode-property");
const util_1 = require("@regexp-cjk/escape-unicode-property/lib/util");
/**
 * use regexpu for escape unicode property
 * avoid some system or browser not fully support unicode property
 */
function createZhRegExpCorePlugin(options = {}) {
    const { escapeAuto = true, escapeAll } = options;
    return {
        afterStart(opts) {
            if (escapeAuto || escapeAll) {
                const { str, flags } = opts;
                const _flags = flags || '';
                const useUnicodeFlag = _flags.includes('u');
                let ev = regexp_parser_event_1.default.create(str, flags || '');
                let _do = escapeAll || escapeAuto && /\\p\{[^{}]+\}/i.test(str);
                const _escapeOpts = (0, util_1.handleOptions)({
                    useUnicodeFlag,
                }, _flags);
                if (_do) {
                    ev.on("uniset" /* ParserEventEmitterEvent.uniset */, function (ast, eventName, ev) {
                        if ((0, plugin_1.astNotChanged)(ast) && astUnicodePropertyCharacterSet(ast)) {
                            let raw = (0, escape_unicode_property_1.escapeUnicodePropertyPatternCore)(ast.raw, _escapeOpts.flags, _escapeOpts.options);
                            if (raw !== ast.raw) {
                                ast.raw = raw;
                                ev.emitChange(ast);
                            }
                        }
                    });
                    ev.on("class" /* ParserEventEmitterEvent.class */, function (ast, eventName, ev) {
                        if ((0, plugin_1.astNotChanged)(ast) && (0, escape_unicode_property_1.hasUnicodePropertyPattern)(ast.raw)) {
                            let raw = (0, escape_unicode_property_1.escapeUnicodePropertyPatternCore)(ast.raw, _escapeOpts.flags, _escapeOpts.options);
                            if (raw !== ast.raw) {
                                ast.raw = raw;
                                delete ast.elements;
                                ev.emitChange(ast);
                            }
                        }
                    });
                }
                ev.resume();
                opts.str = ev.getSource();
            }
            return opts;
        }
    };
}
function astUnicodePropertyCharacterSet(ast) {
    return (ast.kind === "property" /* EnumKindCharacterSet.UnicodePropertyCharacterSet */);
}
function checkUnicodePropertyEscape(ast) {
    if (ast.value == 'Punctuation') {
        return true;
    }
}
/**
 * use @regexp-cjk/escape-unicode-property
 *
 * @deprecated
 */
function unicodePropertyEscape(raw, flags, useUnicodeFlag) {
    return (0, rewrite_pattern_1.rewritePatternCore)(raw, flags, {
        unicodePropertyEscape: true,
        useUnicodeFlag,
    });
}
exports.default = createZhRegExpCorePlugin;
//# sourceMappingURL=index.js.map