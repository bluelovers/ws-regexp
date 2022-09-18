"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPattern = exports.hackRegenerate = exports.regexpClassToObject = exports.regenerate = void 0;
const tslib_1 = require("tslib");
const regexp_parser_event_1 = require("regexp-parser-event");
const regenerate_1 = tslib_1.__importDefault(require("regenerate"));
exports.regenerate = regenerate_1.default;
const regexpu_core_v4_1 = require("@regexp-cjk/regexpu-core-v4");
/**
 * convert Specified type RegExp to hacked regenerate object
 *
 * @param {RegExp} re
 * @param {string} flags
 * @returns {regenerate.IRegenerateObject}
 */
function regexpClassToObject(re, flags) {
    if (flags == null) {
        flags = re.flags;
    }
    const hasUnicodeFlag = flags.includes('u');
    const sourceOrigin = re.source;
    let source = (0, regexpu_core_v4_1.rewritePatternV4)(sourceOrigin, flags, {
        unicodePropertyEscape: true,
        useUnicodeFlag: hasUnicodeFlag,
    });
    let ev = regexp_parser_event_1.ParserEventEmitter.create(source, flags);
    let new_obj;
    ev.on("class" /* ParserEventEmitterEvent.class */, function (ast, eventName, ev, ...argv) {
        if (!isPattern(ast.parent) || ast.parent.elements.length != 1) {
            throw new TypeError(`this regexp should only has class, but got ${source}`);
        }
        if (new_obj == null) {
            new_obj = (0, regenerate_1.default)();
        }
        else {
            throw new TypeError(`only allow one class, but got ${source}`);
        }
        ast.elements.forEach(sub_ast => {
            switch (sub_ast.type) {
                case "CharacterClassRange" /* EnumTypeNode.CharacterClassRange */:
                    new_obj.addRange(sub_ast.min.value, sub_ast.max.value);
                    break;
                case "Character" /* EnumTypeNode.Character */:
                    new_obj.add(sub_ast.value);
                    break;
                default:
                    throw new TypeError(`unknown ast ${JSON.stringify(sub_ast)}`);
                    break;
            }
        });
    });
    ev.resume();
    if (new_obj == null) {
        if (ev.astSource.elements.length == 1) {
            let ast = ev.astSource.elements[0];
            if (ast.type === "Character" /* EnumTypeNode.Character */) {
                new_obj = (0, regenerate_1.default)();
                new_obj.add(ast.value);
            }
        }
        if (new_obj == null) {
            throw new TypeError(`not support ${ev}`);
        }
    }
    return hackRegenerate(new_obj, flags, hasUnicodeFlag);
}
exports.regexpClassToObject = regexpClassToObject;
function hackRegenerate(obj, flags, hasUnicodeFlag) {
    Object.defineProperties(obj, {
        flags: {
            get() {
                return flags;
            }
        },
        toStringOrigin: {
            enumerable: false,
            value: regenerate_1.default.prototype.toString,
        },
        toString: {
            enumerable: false,
            value: ((old) => {
                return function (...options) {
                    if (options[0] == null) {
                        options[0] = {
                            hasUnicodeFlag,
                        };
                    }
                    // @ts-ignore
                    let source = old.apply(this, options);
                    if (!/^\[.*\]$/.test(source)) {
                        return `[${source}]`;
                    }
                    return source;
                };
            })(obj.toString),
        },
        toRegExp: {
            enumerable: false,
            value: ((old) => {
                return function (...options) {
                    if (options[0] == null) {
                        options[0] = flags;
                    }
                    // @ts-ignore
                    return old.apply(this, options);
                };
            })(obj.toRegExp),
        },
        clone: {
            enumerable: false,
            value: ((old) => {
                return function (...options) {
                    // @ts-ignore
                    let new_obj = old.apply(this, options);
                    return hackRegenerate(new_obj, flags, hasUnicodeFlag);
                };
            })(obj.clone),
        },
    });
    return obj;
}
exports.hackRegenerate = hackRegenerate;
function isPattern(ast) {
    return (ast.type == "Pattern" /* EnumTypeNode.Pattern */);
}
exports.isPattern = isPattern;
exports.default = regexpClassToObject;
//# sourceMappingURL=index.js.map