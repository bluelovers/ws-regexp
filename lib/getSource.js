"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseRegularExpressionString(str) {
    let m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
    if (m) {
        let [s, d, r, f] = m;
        return {
            source: typeof r !== 'undefined' ? r : '',
            flags: typeof f !== 'undefined' ? f : '',
            slash: s,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0U291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBZ0IsNEJBQTRCLENBQUMsR0FBVztJQUV2RCxJQUFJLENBQUMsR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLEVBQ0w7UUFDQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE9BQU87WUFDTixNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEdBQUc7U0FDVixDQUFDO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFoQkQsb0VBZ0JDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsSUFBd0I7SUFFOUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDOUIsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUVqQyxNQUFNLFFBQVEsR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO0lBRS9DLElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksS0FBYSxDQUFDO0lBRWxCLElBQUksR0FBRyxZQUFZLE1BQU0sRUFDekI7UUFDQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO1NBQ0ksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQ2hDO1FBQ0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRWYsSUFBSSxPQUFPLENBQUMsNEJBQTRCLEVBQ3hDO1lBQ0MsSUFBSSxDQUFDLEdBQUcsNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLEVBQ0w7Z0JBQ0MsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUVoQixHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ1o7U0FDRDtRQUVELElBQUksR0FBRyxFQUNQO1lBQ0MsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNiO0tBQ0Q7U0FFRDtRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsaURBQWlELEdBQUcsWUFBWSxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUE7S0FDakc7SUFFRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFDOUI7UUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLHVDQUF1QyxNQUFNLFlBQVksT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0tBQzdGO0lBRUQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRXRDLElBQUksWUFBWSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLEVBQ25EO1FBQ0MsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUNyQjtJQUVELE9BQU87UUFDTixNQUFNO1FBQ04sS0FBSztRQUNMLFFBQVE7S0FDUixDQUFBO0FBQ0YsQ0FBQztBQTFERCx3REEwREM7QUFFRCxrQkFBZSxzQkFBc0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElHZXRTZXR0aW5nT3B0aW9ucyB9IGZyb20gJy4vbWVyZ2VPcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyOiBzdHJpbmcpXG57XG5cdGxldCBtID0gL14oW1xcLyMkJV0pKC4rPylcXDEoW2Etel0qKSQvLmV4ZWMoc3RyKTtcblx0aWYgKG0pXG5cdHtcblx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzb3VyY2U6IHR5cGVvZiByICE9PSAndW5kZWZpbmVkJyA/IHIgOiAnJyxcblx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRzbGFzaDogcyxcblx0XHRcdGlucHV0OiBzdHIsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVnRXhwU291cmNlUGF0dGVybihvcHRzOiBJR2V0U2V0dGluZ09wdGlvbnMpXG57XG5cdGNvbnN0IHsgc3RyLCBvcHRpb25zIH0gPSBvcHRzO1xuXHRjb25zdCB7IGRlZmF1bHRGbGFncyB9ID0gb3B0aW9ucztcblxuXHRjb25zdCBoYXNGbGFncyA9IHR5cGVvZiBvcHRzLmZsYWdzID09ICdzdHJpbmcnO1xuXG5cdGxldCBzb3VyY2U6IHN0cmluZztcblx0bGV0IGZsYWdzOiBzdHJpbmc7XG5cblx0aWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cClcblx0e1xuXHRcdCh7IHNvdXJjZSwgZmxhZ3MgfSA9IHN0cik7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHRsZXQgX2RvID0gdHJ1ZTtcblxuXHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcpXG5cdFx0e1xuXHRcdFx0bGV0IG0gPSBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cblx0XHRcdGlmIChtKVxuXHRcdFx0e1xuXHRcdFx0XHRzb3VyY2UgPSBtLnNvdXJjZTtcblx0XHRcdFx0ZmxhZ3MgPSBtLmZsYWdzO1xuXG5cdFx0XHRcdF9kbyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfZG8pXG5cdFx0e1xuXHRcdFx0c291cmNlID0gc3RyO1xuXHRcdH1cblx0fVxuXHRlbHNlXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBleHBlY3RlZCBzb3VyY2UgaXMgc3RyaW5nIG9yIFJlZ0V4cCwgYnV0IGdvdCAnJHtzdHJ9JywgdHlwZTogJHt0eXBlb2Ygc3RyfWApXG5cdH1cblxuXHRpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ3N0cmluZycpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBleHBlY3RlZCBzb3VyY2UgaXMgc3RyaW5nLCBidXQgZ290ICcke3NvdXJjZX0nLCB0eXBlOiAke3R5cGVvZiBzb3VyY2V9YClcblx0fVxuXG5cdGZsYWdzID0gaGFzRmxhZ3MgPyBvcHRzLmZsYWdzIDogZmxhZ3M7XG5cblx0aWYgKGRlZmF1bHRGbGFncyAmJiAoZmxhZ3MgPT0gbnVsbCB8fCBmbGFncyA9PT0gJycpKVxuXHR7XG5cdFx0ZmxhZ3MgPSBkZWZhdWx0RmxhZ3M7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHNvdXJjZSxcblx0XHRmbGFncyxcblx0XHRoYXNGbGFncyxcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSZWdFeHBTb3VyY2VQYXR0ZXJuXG4iXX0=