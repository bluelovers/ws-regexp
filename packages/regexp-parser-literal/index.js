"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astToString = exports.fakePatternToRegExpLiteral = exports.parsePattern = exports.parseFlags = exports.parseRegExp = exports.createRegExpParser = exports.defaultRegExpParser = exports.EMOJI_REGEX = void 0;
const tslib_1 = require("tslib");
const array_hyper_unique_1 = require("array-hyper-unique");
const regexpp2_1 = require("regexpp2");
const emoji_regex_1 = tslib_1.__importDefault(require("emoji-regex"));
const uni_string_1 = require("uni-string");
// @ts-ignore
exports.EMOJI_REGEX = (0, emoji_regex_1.default)();
exports.defaultRegExpParser = createRegExpParser({
    disableChkCharacterClassRange: true,
});
function createRegExpParser(options) {
    return new regexpp2_1.RegExpParser(options);
}
exports.createRegExpParser = createRegExpParser;
function parseRegExp(input, objRegExpParser = exports.defaultRegExpParser) {
    input = input
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
    return objRegExpParser.parseLiteral(input);
}
exports.parseRegExp = parseRegExp;
function parseFlags(input, objRegExpParser = exports.defaultRegExpParser) {
    return objRegExpParser.parseFlags(input);
}
exports.parseFlags = parseFlags;
function parsePattern(input, uFlag = false, objRegExpParser = exports.defaultRegExpParser) {
    if (typeof uFlag == 'string') {
        uFlag = parseFlags(uFlag).unicode;
    }
    input = input
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
    return objRegExpParser.parsePattern(input, 0, input.length, uFlag);
}
exports.parsePattern = parsePattern;
function fakePatternToRegExpLiteral(pattern, flags = '', objRegExpParser = exports.defaultRegExpParser) {
    let data;
    if (!flags) {
        flags = '';
    }
    if (typeof pattern == 'string') {
        data = parseRegExp(`/${pattern}/${typeof flags == 'string' ? flags : astToString(flags)}`, objRegExpParser);
    }
    else {
        flags = typeof flags == 'string' ? parseFlags(flags, objRegExpParser) : flags;
        pattern = typeof pattern == 'string' ? parsePattern(pattern, flags.unicode, objRegExpParser) : pattern;
        data = {
            type: "RegExpLiteral",
            parent: null,
            start: 0,
            end: pattern.end + flags.end + 2,
            raw: `/${pattern.raw}/${flags.raw}`,
            pattern,
            flags,
        };
        pattern.parent = data;
    }
    return data;
}
exports.fakePatternToRegExpLiteral = fakePatternToRegExpLiteral;
function astToString(ast, options = {}) {
    let source;
    let _update_;
    if (typeof options.debugChanged == 'number' && options.debugChanged >= 99) {
        // debug mode
        ast.changed = true;
    }
    let changed = options.debugChanged;
    //console.log(666, ast.type, ast.changed, changed);
    switch (ast.type) {
        case 'RegExpLiteral':
            if (changed || ast.changed) {
                source = `/${astToString(ast.pattern, options)}/${astToString(ast.flags, options)}`;
                _update_ = true;
            }
            break;
        case 'Pattern':
            if (changed || ast.changed) {
                source = ast.elements.reduce(function (a, item) {
                    a.push(astToString(item, options));
                    return a;
                }, []).join('');
                _update_ = true;
            }
            break;
        case 'Quantifier':
            source = astToString(ast.element, options);
            if (ast.raw.indexOf(source) !== 0 && /^(?:\{[\d,]+\}|[*+?])$/.test(ast.raw)) {
                source += ast.raw;
            }
            else if (ast.min == 1 && ast.max == Infinity) {
                source += '+';
            }
            else if (ast.min == 0 && ast.max == Infinity) {
                source += '*';
            }
            else if (ast.min == 0 && ast.max == 1) {
                source += '?';
            }
            else {
                source += `{${ast.min},${ast.max}}`;
            }
            if (!ast.greedy) {
                source += '?';
            }
            _update_ = true;
            break;
        case 'Assertion':
        case 'CapturingGroup':
        case 'Group':
        case 'CharacterClass':
            if (ast.changed) {
                // @ts-ignore
                if (ast.elements) {
                    let do_unique = !options.noUniqueClass;
                    // @ts-ignore
                    let aaa = ast.elements
                        .reduce(function (a, item) {
                        let s = astToString(item, options);
                        if (do_unique
                            && item.type == 'CharacterClassRange'
                            && item.old_raw
                            && /-/u.test(item.old_raw) && !/-/u.test(s)) {
                            a = a.concat(uni_string_1.UString.split(s, ''));
                        }
                        else {
                            a.push(s);
                        }
                        return a;
                    }, []);
                    if (ast.type == 'CharacterClass' && (do_unique || options.sortClass)) {
                        if (do_unique && exports.EMOJI_REGEX.test(ast.raw)) {
                            let last_is_emoji;
                            let last_is_zwj;
                            let EMOJI_SPLIT = new RegExp('(' + exports.EMOJI_REGEX.source + ')', exports.EMOJI_REGEX.flags);
                            aaa = aaa.reduce(function (a, b) {
                                let current_is_zwj = /\u200D/.test(b);
                                let current_is_emoji = exports.EMOJI_REGEX.test(b);
                                if (last_is_emoji) {
                                    let last_i = a.length - 1;
                                    if (current_is_emoji) {
                                        a[last_i] += b;
                                    }
                                    else {
                                        if (options.doUniqueClassEmoji) {
                                            let text = a.pop();
                                            let c = text.split(EMOJI_SPLIT);
                                            a = a.concat(c);
                                        }
                                        a.push(b);
                                    }
                                }
                                else {
                                    a.push(b);
                                }
                                last_is_emoji = current_is_emoji;
                                last_is_zwj = current_is_zwj;
                                return a;
                            }, []);
                        }
                        if (do_unique) {
                            aaa = (0, array_hyper_unique_1.array_unique)(aaa);
                        }
                        if (options.sortClass) {
                            aaa.sort();
                        }
                    }
                    source = aaa.join('');
                    switch (ast.type) {
                        case 'CapturingGroup':
                            source = '(' + source + ')';
                            break;
                        case 'Group':
                            source = '(?:' + source + ')';
                            break;
                        case 'CharacterClass':
                            source = '[' + (ast.negate ? '^' : '') + source + ']';
                            break;
                        case 'Assertion':
                            let a = [];
                            //console.log(ast);
                            if (ast.kind == 'lookbehind') {
                                a.push('<');
                            }
                            // @ts-ignore
                            a.push(ast.negate ? '!' : '=');
                            source = '(?' + a.join('') + source + ')';
                            break;
                    }
                    _update_ = true;
                }
            }
            break;
        case 'Disjunction':
            if (ast.changed) {
                let a = ast.alternatives
                    .reduce(function (a, items) {
                    let source = items.reduce(function (a, item) {
                        a.push(astToString(item, options));
                        return a;
                    }, []).join('');
                    a.push(source);
                    return a;
                }, []);
                // @ts-ignore
                a = (0, array_hyper_unique_1.array_unique)(a);
                source = a.join('|');
                _update_ = true;
            }
            break;
        default:
            //source = ast.raw;
            break;
    }
    if (!_update_) {
        source = ast.raw;
    }
    if (0 && source !== ast.raw) {
        console.warn({
            type: ast.type,
            source,
            raw: ast.raw,
        });
    }
    if (_update_) {
        //console.dir(source);
        ast.old_raw = ast.raw;
        ast.raw = source;
        ast.changed = false;
    }
    return source;
}
exports.astToString = astToString;
exports.default = exports;
//# sourceMappingURL=index.js.map