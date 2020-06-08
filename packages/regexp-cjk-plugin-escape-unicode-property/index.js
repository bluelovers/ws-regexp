"use strict";
/**
 * Created by user on 2019/6/15.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicodePropertyEscape = exports.checkUnicodePropertyEscape = exports.astUnicodePropertyCharacterSet = exports.createZhRegExpCorePlugin = void 0;
const regexp_parser_event_1 = __importDefault(require("regexp-parser-event"));
const rewrite_pattern_1 = require("@regexp-cjk/rewrite-pattern");
const plugin_1 = require("regexp-cjk/lib/plugin");
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
                if (_do) {
                    ev.on("uniset" /* uniset */, function (ast, eventName, ev) {
                        if (plugin_1.astNotChanged(ast) && astUnicodePropertyCharacterSet(ast)) {
                            let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);
                            if (raw !== ast.raw) {
                                ast.raw = raw;
                                ev.emitChange(ast);
                            }
                        }
                    });
                    ev.on("class" /* class */, function (ast, eventName, ev) {
                        if (plugin_1.astNotChanged(ast) && /\\p{/.test(ast.raw)) {
                            let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);
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
exports.createZhRegExpCorePlugin = createZhRegExpCorePlugin;
function astUnicodePropertyCharacterSet(ast) {
    return (ast.kind === "property" /* UnicodePropertyCharacterSet */);
}
exports.astUnicodePropertyCharacterSet = astUnicodePropertyCharacterSet;
function checkUnicodePropertyEscape(ast) {
    if (ast.value == 'Punctuation') {
        return true;
    }
}
exports.checkUnicodePropertyEscape = checkUnicodePropertyEscape;
function unicodePropertyEscape(raw, flags, useUnicodeFlag) {
    return rewrite_pattern_1.rewritePatternCore(raw, flags, {
        unicodePropertyEscape: true,
        useUnicodeFlag,
    });
}
exports.unicodePropertyEscape = unicodePropertyEscape;
exports.default = createZhRegExpCorePlugin;
//# sourceMappingURL=index.js.map