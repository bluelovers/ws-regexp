"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const regexpp = require("regexpp2");
const EmojiRegex = require("emoji-regex");
const uni_string_1 = require("uni-string");
// @ts-ignore
exports.EMOJI_REGEX = EmojiRegex();
exports.defaultRegExpParser = createRegExpParser({
    disableChkCharacterClassRange: true,
});
function createRegExpParser(options) {
    return new regexpp.RegExpParser(options);
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
                            a = a.concat(uni_string_1.default.split(s, ''));
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
                            aaa = array_hyper_unique_1.array_unique(aaa);
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
                a = array_hyper_unique_1.array_unique(a);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJEQUFrRDtBQUNsRCxvQ0FBcUM7QUFFckMsMENBQTJDO0FBQzNDLDJDQUFpQztBQUVqQyxhQUFhO0FBQ0EsUUFBQSxXQUFXLEdBQVcsVUFBVSxFQUFFLENBQUM7QUFFbkMsUUFBQSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztJQUNyRCw2QkFBNkIsRUFBRSxJQUFJO0NBQ25DLENBQUMsQ0FBQztBQUVILFNBQWdCLGtCQUFrQixDQUFDLE9BQXNDO0lBRXhFLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFIRCxnREFHQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxLQUFhLEVBQUUsZUFBZSxHQUFHLDJCQUFtQjtJQUUvRSxLQUFLLEdBQUcsS0FBSztTQUNYLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQ3RCO0lBRUQsT0FBTyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFSRCxrQ0FRQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxLQUFhLEVBQUUsZUFBZSxHQUFHLDJCQUFtQjtJQUU5RSxPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUhELGdDQUdDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEtBQWEsRUFBRSxRQUEwQixLQUFLLEVBQUUsZUFBZSxHQUFHLDJCQUFtQjtJQUVqSCxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDNUI7UUFDQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUNsQztJQUVELEtBQUssR0FBRyxLQUFLO1NBQ1gsT0FBTyxDQUFDLEtBQUssRUFBRSxL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T0Qsa0JBQWUsT0FBb0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgYXJyYXlfdW5pcXVlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcbmltcG9ydCByZWdleHBwID0gcmVxdWlyZSgncmVnZXhwcDInKTtcbmltcG9ydCB7IEFTVCB9IGZyb20gJ3JlZ2V4cHAyJztcbmltcG9ydCBFbW9qaVJlZ2V4ID0gcmVxdWlyZSgnZW1vamktcmVnZXgnKTtcbmltcG9ydCBVU3RyaW5nIGZyb20gJ3VuaS1zdHJpbmcnO1xuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgRU1PSklfUkVHRVg6IFJlZ0V4cCA9IEVtb2ppUmVnZXgoKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZWdFeHBQYXJzZXIgPSBjcmVhdGVSZWdFeHBQYXJzZXIoe1xuXHRkaXNhYmxlQ2hrQ2hhcmFjdGVyQ2xhc3NSYW5nZTogdHJ1ZSxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVnRXhwUGFyc2VyKG9wdGlvbnM/OiByZWdleHBwLlJlZ0V4cFBhcnNlci5PcHRpb25zKVxue1xuXHRyZXR1cm4gbmV3IHJlZ2V4cHAuUmVnRXhwUGFyc2VyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZWdFeHAoaW5wdXQ6IHN0cmluZywgb2JqUmVnRXhwUGFyc2VyID0gZGVmYXVsdFJlZ0V4cFBhcnNlcilcbntcblx0aW5wdXQgPSBpbnB1dFxuXHRcdC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcblx0XHQucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG5cdDtcblxuXHRyZXR1cm4gb2JqUmVnRXhwUGFyc2VyLnBhcnNlTGl0ZXJhbChpbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZsYWdzKGlucHV0OiBzdHJpbmcsIG9ialJlZ0V4cFBhcnNlciA9IGRlZmF1bHRSZWdFeHBQYXJzZXIpXG57XG5cdHJldHVybiBvYmpSZWdFeHBQYXJzZXIucGFyc2VGbGFncyhpbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhdHRlcm4oaW5wdXQ6IHN0cmluZywgdUZsYWc6IGJvb2xlYW4gfCBzdHJpbmcgPSBmYWxzZSwgb2JqUmVnRXhwUGFyc2VyID0gZGVmYXVsdFJlZ0V4cFBhcnNlcilcbntcblx0aWYgKHR5cGVvZiB1RmxhZyA9PSAnc3RyaW5nJylcblx0e1xuXHRcdHVGbGFnID0gcGFyc2VGbGFncyh1RmxhZykudW5pY29kZTtcblx0fVxuXG5cdGlucHV0ID0gaW5wdXRcblx0XHQucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG5cdFx0LnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuXHQ7XG5cblx0cmV0dXJuIG9ialJlZ0V4cFBhcnNlci5wYXJzZVBhdHRlcm4oaW5wdXQsIDAsIGlucHV0Lmxlbmd0aCwgdUZsYWcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFrZVBhdHRlcm5Ub1JlZ0V4cExpdGVyYWwocGF0dGVybjogQVNULlBhdHRlcm4gfCBzdHJpbmcsXG5cdGZsYWdzOiBzdHJpbmcgfCBBU1QuRmxhZ3MgPSAnJyxcblx0b2JqUmVnRXhwUGFyc2VyID0gZGVmYXVsdFJlZ0V4cFBhcnNlclxuKTogQVNULlJlZ0V4cExpdGVyYWxcbntcblx0bGV0IGRhdGE6IEFTVC5SZWdFeHBMaXRlcmFsO1xuXG5cdGlmICghZmxhZ3MpXG5cdHtcblx0XHRmbGFncyA9ICcnO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBwYXR0ZXJuID09ICdzdHJpbmcnKVxuXHR7XG5cdFx0ZGF0YSA9IHBhcnNlUmVnRXhwKGAvJHtwYXR0ZXJufS8ke3R5cGVvZiBmbGFncyA9PSAnc3RyaW5nJyA/IGZsYWdzIDogYXN0VG9TdHJpbmcoZmxhZ3MpfWAsIG9ialJlZ0V4cFBhcnNlcik7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0ZmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZycgPyBwYXJzZUZsYWdzKGZsYWdzLCBvYmpSZWdFeHBQYXJzZXIpIDogZmxhZ3M7XG5cdFx0cGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09ICdzdHJpbmcnID8gcGFyc2VQYXR0ZXJuKHBhdHRlcm4sIGZsYWdzLnVuaWNvZGUsIG9ialJlZ0V4cFBhcnNlcikgOiBwYXR0ZXJuO1xuXG5cdFx0ZGF0YSA9IDxBU1QuUmVnRXhwTGl0ZXJhbD57XG5cdFx0XHR0eXBlOiBcIlJlZ0V4cExpdGVyYWxcIixcblx0XHRcdHBhcmVudDogbnVsbCxcblx0XHRcdHN0YXJ0OiAwLFxuXHRcdFx0ZW5kOiBwYXR0ZXJuLmVuZCArIGZsYWdzLmVuZCArIDIsXG5cdFx0XHRyYXc6IGAvJHtwYXR0ZXJuLnJhd30vJHtmbGFncy5yYXd9YCxcblx0XHRcdHBhdHRlcm4sXG5cdFx0XHRmbGFncyxcblx0XHR9O1xuXG5cdFx0cGF0dGVybi5wYXJlbnQgPSBkYXRhO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCB0eXBlIElBc3RUb1N0cmluZ09wdGlvbnMgPSB7XG5cdGRlYnVnQ2hhbmdlZD86IGJvb2xlYW4gfCBudW1iZXIsXG5cblx0bm9VbmlxdWVDbGFzcz86IGJvb2xlYW4sXG5cdGRvVW5pcXVlQ2xhc3NFbW9qaT86IGJvb2xlYW4sXG5cblx0c29ydENsYXNzPzogYm9vbGVhbixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdFRvU3RyaW5nKGFzdDogQVNULkVsZW1lbnQgJiBJTm9kZVBsdXMgfCBBU1QuTm9kZSAmIElOb2RlUGx1cyxcblx0b3B0aW9uczogSUFzdFRvU3RyaW5nT3B0aW9ucyA9IHt9XG4pOiBzdHJpbmdcbntcblx0bGV0IHNvdXJjZTogc3RyaW5nO1xuXHRsZXQgX3VwZGF0ZV86IGJvb2xlYW47XG5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmRlYnVnQ2hhbmdlZCA9PSAnbnVtYmVyJyAmJiBvcHRpb25zLmRlYnVnQ2hhbmdlZCA+PSA5OSlcblx0e1xuXHRcdC8vIGRlYnVnIG1vZGVcblx0XHRhc3QuY2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHRsZXQgY2hhbmdlZCA9IG9wdGlvbnMuZGVidWdDaGFuZ2VkO1xuXG5cdC8vY29uc29sZS5sb2coNjY2LCBhc3QudHlwZSwgYXN0LmNoYW5nZWQsIGNoYW5nZWQpO1xuXG5cdHN3aXRjaCAoYXN0LnR5cGUpXG5cdHtcblx0XHRjYXNlICdSZWdFeHBMaXRlcmFsJzpcblxuXHRcdFx0aWYgKGNoYW5nZWQgfHwgYXN0LmNoYW5nZWQpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSA9IGAvJHthc3RUb1N0cmluZyhhc3QucGF0dGVybiwgb3B0aW9ucyl9LyR7YXN0VG9TdHJpbmcoYXN0LmZsYWdzLCBvcHRpb25zKX1gO1xuXG5cdFx0XHRcdF91cGRhdGVfID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlICdQYXR0ZXJuJzpcblxuXHRcdFx0aWYgKGNoYW5nZWQgfHwgYXN0LmNoYW5nZWQpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSA9IGFzdC5lbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGl0ZW06IEFTVC5Ob2RlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YS5wdXNoKGFzdFRvU3RyaW5nKGl0ZW0sIG9wdGlvbnMpKTtcblxuXHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHR9LCBbXSkuam9pbignJyk7XG5cblx0XHRcdFx0X3VwZGF0ZV8gPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdRdWFudGlmaWVyJzpcblxuXHRcdFx0c291cmNlID0gYXN0VG9TdHJpbmcoYXN0LmVsZW1lbnQsIG9wdGlvbnMpO1xuXG5cdFx0XHRpZiAoYXN0LnJhdy5pbmRleE9mKHNvdXJjZSkgIT09IDAgJiYgL14oPzpcXHtbXFxkLF0rXFx9fFsqKz9dKSQvLnRlc3QoYXN0LnJhdykpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSArPSBhc3QucmF3O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoYXN0Lm1pbiA9PSAxICYmIGFzdC5tYXggPT0gSW5maW5pdHkpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSArPSAnKyc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChhc3QubWluID09IDAgJiYgYXN0Lm1heCA9PSBJbmZpbml0eSlcblx0XHRcdHtcblx0XHRcdFx0c291cmNlICs9ICcqJztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGFzdC5taW4gPT0gMCAmJiBhc3QubWF4ID09IDEpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSArPSAnPyc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSArPSBgeyR7YXN0Lm1pbn0sJHthc3QubWF4fX1gO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWFzdC5ncmVlZHkpXG5cdFx0XHR7XG5cdFx0XHRcdHNvdXJjZSArPSAnPyc7XG5cdFx0XHR9XG5cblx0XHRcdF91cGRhdGVfID0gdHJ1ZTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnQXNzZXJ0aW9uJzpcblx0XHRjYXNlICdDYXB0dXJpbmdHcm91cCc6XG5cdFx0Y2FzZSAnR3JvdXAnOlxuXHRcdGNhc2UgJ0NoYXJhY3RlckNsYXNzJzpcblxuXHRcdFx0aWYgKGFzdC5jaGFuZ2VkKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGlmIChhc3QuZWxlbWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgZG9fdW5pcXVlID0gIW9wdGlvbnMubm9VbmlxdWVDbGFzcztcblxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRsZXQgYWFhID0gYXN0LmVsZW1lbnRzXG5cdFx0XHRcdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChhLCBpdGVtOiBBU1QuTm9kZSAmIElOb2RlUGx1cylcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHMgPSBhc3RUb1N0cmluZyhpdGVtLCBvcHRpb25zKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZG9fdW5pcXVlXG5cdFx0XHRcdFx0XHRcdFx0JiYgaXRlbS50eXBlID09ICdDaGFyYWN0ZXJDbGFzc1JhbmdlJ1xuXHRcdFx0XHRcdFx0XHRcdCYmIGl0ZW0ub2xkX3Jhd1xuXHRcdFx0XHRcdFx0XHRcdCYmIC8tL3UudGVzdChpdGVtLm9sZF9yYXcpICYmICEvLS91LnRlc3Qocylcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0YSA9IGEuY29uY2F0KFVTdHJpbmcuc3BsaXQocywgJycpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRhLnB1c2gocyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0XHRcdH0sIFtdIGFzIHN0cmluZ1tdKVxuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdGlmIChhc3QudHlwZSA9PSAnQ2hhcmFjdGVyQ2xhc3MnICYmIChkb191bmlxdWUgfHwgb3B0aW9ucy5zb3J0Q2xhc3MpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChkb191bmlxdWUgJiYgRU1PSklfUkVHRVgudGVzdChhc3QucmF3KSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IGxhc3RfaXNfZW1vamk6IGJvb2xlYW47XG5cdFx0XHRcdFx0XHRcdGxldCBsYXN0X2lzX3p3ajogYm9vbGVhbjtcblxuXHRcdFx0XHRcdFx0XHRsZXQgRU1PSklfU1BMSVQgPSBuZXcgUmVnRXhwKCcoJyArIEVNT0pJX1JFR0VYLnNvdXJjZSArICcpJywgRU1PSklfUkVHRVguZmxhZ3MpO1xuXG5cdFx0XHRcdFx0XHRcdGFhYSA9IGFhYS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGI6IHN0cmluZylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGxldCBjdXJyZW50X2lzX3p3aiA9IC9cXHUyMDBELy50ZXN0KGIpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBjdXJyZW50X2lzX2Vtb2ppID0gRU1PSklfUkVHRVgudGVzdChiKTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChsYXN0X2lzX2Vtb2ppKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBsYXN0X2kgPSBhLmxlbmd0aCAtIDE7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50X2lzX2Vtb2ppKVxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhW2xhc3RfaV0gKz0gYjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuZG9VbmlxdWVDbGFzc0Vtb2ppKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHRleHQgPSBhLnBvcCgpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgYyA9IHRleHQuc3BsaXQoRU1PSklfU1BMSVQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGEgPSBhLmNvbmNhdChjKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGEucHVzaChiKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGEucHVzaChiKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRsYXN0X2lzX2Vtb2ppID0gY3VycmVudF9pc19lbW9qaTtcblx0XHRcdFx0XHRcdFx0XHRsYXN0X2lzX3p3aiA9IGN1cnJlbnRfaXNfendqO1xuXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0XHRcdH0sIFtdKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKGRvX3VuaXF1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YWFhID0gYXJyYXlfdW5pcXVlKGFhYSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLnNvcnRDbGFzcylcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YWFhLnNvcnQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzb3VyY2UgPSBhYWEuam9pbignJyk7XG5cblx0XHRcdFx0XHRzd2l0Y2ggKGFzdC50eXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNhc2UgJ0NhcHR1cmluZ0dyb3VwJzpcblx0XHRcdFx0XHRcdFx0c291cmNlID0gJygnICsgc291cmNlICsgJyknO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ0dyb3VwJzpcblx0XHRcdFx0XHRcdFx0c291cmNlID0gJyg/OicgKyBzb3VyY2UgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAnQ2hhcmFjdGVyQ2xhc3MnOlxuXHRcdFx0XHRcdFx0XHRzb3VyY2UgPSAnWycgKyAoYXN0Lm5lZ2F0ZSA/ICdeJyA6ICcnKSArIHNvdXJjZSArICddJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdBc3NlcnRpb24nOlxuXG5cdFx0XHRcdFx0XHRcdGxldCBhID0gW10gYXMgc3RyaW5nW107XG5cblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhhc3QpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChhc3Qua2luZCA9PSAnbG9va2JlaGluZCcpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRhLnB1c2goJzwnKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdFx0YS5wdXNoKGFzdC5uZWdhdGUgPyAnIScgOiAnPScpO1xuXG5cdFx0XHRcdFx0XHRcdHNvdXJjZSA9ICcoPycgKyBhLmpvaW4oJycpICsgc291cmNlICsgJyknO1xuXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF91cGRhdGVfID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgJ0Rpc2p1bmN0aW9uJzpcblxuXHRcdFx0aWYgKGFzdC5jaGFuZ2VkKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYSA9IChhc3QuYWx0ZXJuYXRpdmVzIGFzIEFTVC5BbHRlcm5hdGl2ZUVsZW1lbnRbXVtdKVxuXHRcdFx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGl0ZW1zKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxldCBzb3VyY2UgPSBpdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGl0ZW06IEFTVC5Ob2RlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRhLnB1c2goYXN0VG9TdHJpbmcoaXRlbSwgb3B0aW9ucykpO1xuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHRcdFx0fSwgW10pLmpvaW4oJycpO1xuXG5cdFx0XHRcdFx0XHRhLnB1c2goc291cmNlKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdFx0fSwgW10gYXMgc3RyaW5nW10pXG5cdFx0XHRcdDtcblxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGEgPSBhcnJheV91bmlxdWU8c3RyaW5nPihhKTtcblxuXHRcdFx0XHRzb3VyY2UgPSBhLmpvaW4oJ3wnKTtcblx0XHRcdFx0X3VwZGF0ZV8gPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHQvL3NvdXJjZSA9IGFzdC5yYXc7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdGlmICghX3VwZGF0ZV8pXG5cdHtcblx0XHRzb3VyY2UgPSBhc3QucmF3O1xuXHR9XG5cblx0aWYgKDAgJiYgc291cmNlICE9PSBhc3QucmF3KVxuXHR7XG5cdFx0Y29uc29sZS53YXJuKHtcblx0XHRcdHR5cGU6IGFzdC50eXBlLFxuXHRcdFx0c291cmNlLFxuXHRcdFx0cmF3OiBhc3QucmF3LFxuXHRcdH0pO1xuXHR9XG5cblx0aWYgKF91cGRhdGVfKVxuXHR7XG5cdFx0Ly9jb25zb2xlLmRpcihzb3VyY2UpO1xuXG5cdFx0YXN0Lm9sZF9yYXcgPSBhc3QucmF3O1xuXHRcdGFzdC5yYXcgPSBzb3VyY2U7XG5cdFx0YXN0LmNoYW5nZWQgPSBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBzb3VyY2U7XG59XG5cbmV4cG9ydCB0eXBlIElOb2RlUGx1cyA9IHtcblx0Y2hhbmdlZD86IGJvb2xlYW4sXG5cdG9sZF9yYXc/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCAoJy4vaW5kZXgnKTtcbiJdfQ==