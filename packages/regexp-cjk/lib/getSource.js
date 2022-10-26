"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegExpSourcePattern = exports.parseRegularExpressionString = void 0;
function parseRegularExpressionString(str) {
    const m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
    if (m) {
        const [slash, d, r, f] = m;
        return {
            source: typeof r !== 'undefined' ? r : '',
            flags: typeof f !== 'undefined' ? f : '',
            slash,
            input: str,
        };
    }
    return null;
}
exports.parseRegularExpressionString = parseRegularExpressionString;
function getRegExpSourcePattern(opts) {
    const { str, options } = opts;
    const { defaultFlags } = options;
    const hasFlags = typeof opts.flags == 'string';
    let source;
    let flags;
    if (str instanceof RegExp) {
        ({ source, flags } = str);
    }
    else if (typeof str === 'string') {
        let _do = true;
        if (options.parseRegularExpressionString) {
            let m = parseRegularExpressionString(str);
            if (m) {
                source = m.source;
                flags = m.flags;
                _do = false;
            }
        }
        if (_do) {
            source = str;
        }
    }
    else {
        throw new TypeError(`expected source is string or RegExp, but got '${str}', type: ${typeof str}`);
    }
    if (typeof source !== 'string') {
        throw new TypeError(`expected source is string, but got '${source}', type: ${typeof source}`);
    }
    flags = hasFlags ? opts.flags : flags;
    if (defaultFlags && (flags == null || flags === '')) {
        flags = defaultFlags;
    }
    return {
        source,
        flags,
        hasFlags,
    };
}
exports.getRegExpSourcePattern = getRegExpSourcePattern;
exports.default = getRegExpSourcePattern;
//# sourceMappingURL=getSource.js.map