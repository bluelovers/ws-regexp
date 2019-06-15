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
    return {
        source,
        flags,
        hasFlags,
    };
}
exports.getRegExpSourcePattern = getRegExpSourcePattern;
exports.default = getRegExpSourcePattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0U291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBZ0IsNEJBQTRCLENBQUMsR0FBVztJQUV2RCxJQUFJLENBQUMsR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLEVBQ0w7UUFDQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE9BQU87WUFDTixNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEdBQUc7U0FDVixDQUFDO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFoQkQsb0VBZ0JDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsSUFBd0I7SUFFOUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDOUIsTUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztJQUUvQyxJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLEtBQWEsQ0FBQztJQUVsQixJQUFJLEdBQUcsWUFBWSxNQUFNLEVBQ3pCO1FBQ0MsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztLQUMxQjtTQUNJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUNoQztRQUNDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUVmLElBQUksT0FBTyxDQUFDLDRCQUE0QixFQUN4QztZQUNDLElBQUksQ0FBQyxHQUFHLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxFQUNMO2dCQUNDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsQixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFFaEIsR0FBRyxHQUFHLEtBQUssQ0FBQzthQUNaO1NBQ0Q7UUFFRCxJQUFJLEdBQUcsRUFDUDtZQUNDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDYjtLQUNEO1NBRUQ7UUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLGlEQUFpRCxHQUFHLFlBQVksT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQ2pHO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQzlCO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyx1Q0FBdUMsTUFBTSxZQUFZLE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQTtLQUM3RjtJQUVELEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUV0QyxPQUFPO1FBQ04sTUFBTTtRQUNOLEtBQUs7UUFDTCxRQUFRO0tBQ1IsQ0FBQTtBQUNGLENBQUM7QUFuREQsd0RBbURDO0FBRUQsa0JBQWUsc0JBQXNCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJR2V0U2V0dGluZ09wdGlvbnMgfSBmcm9tICcuL21lcmdlT3B0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cjogc3RyaW5nKVxue1xuXHRsZXQgbSA9IC9eKFtcXC8jJCVdKSguKz8pXFwxKFthLXpdKikkLy5leGVjKHN0cik7XG5cdGlmIChtKVxuXHR7XG5cdFx0bGV0IFtzLCBkLCByLCBmXSA9IG07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0c291cmNlOiB0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcgPyByIDogJycsXG5cdFx0XHRmbGFnczogdHlwZW9mIGYgIT09ICd1bmRlZmluZWQnID8gZiA6ICcnLFxuXHRcdFx0c2xhc2g6IHMsXG5cdFx0XHRpbnB1dDogc3RyLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZ0V4cFNvdXJjZVBhdHRlcm4ob3B0czogSUdldFNldHRpbmdPcHRpb25zKVxue1xuXHRjb25zdCB7IHN0ciwgb3B0aW9ucyB9ID0gb3B0cztcblx0Y29uc3QgaGFzRmxhZ3MgPSB0eXBlb2Ygb3B0cy5mbGFncyA9PSAnc3RyaW5nJztcblxuXHRsZXQgc291cmNlOiBzdHJpbmc7XG5cdGxldCBmbGFnczogc3RyaW5nO1xuXG5cdGlmIChzdHIgaW5zdGFuY2VvZiBSZWdFeHApXG5cdHtcblx0XHQoeyBzb3VyY2UsIGZsYWdzIH0gPSBzdHIpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0bGV0IF9kbyA9IHRydWU7XG5cblx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKVxuXHRcdHtcblx0XHRcdGxldCBtID0gcGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHIpO1xuXG5cdFx0XHRpZiAobSlcblx0XHRcdHtcblx0XHRcdFx0c291cmNlID0gbS5zb3VyY2U7XG5cdFx0XHRcdGZsYWdzID0gbS5mbGFncztcblxuXHRcdFx0XHRfZG8gPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoX2RvKVxuXHRcdHtcblx0XHRcdHNvdXJjZSA9IHN0cjtcblx0XHR9XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgZXhwZWN0ZWQgc291cmNlIGlzIHN0cmluZyBvciBSZWdFeHAsIGJ1dCBnb3QgJyR7c3RyfScsIHR5cGU6ICR7dHlwZW9mIHN0cn1gKVxuXHR9XG5cblx0aWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgZXhwZWN0ZWQgc291cmNlIGlzIHN0cmluZywgYnV0IGdvdCAnJHtzb3VyY2V9JywgdHlwZTogJHt0eXBlb2Ygc291cmNlfWApXG5cdH1cblxuXHRmbGFncyA9IGhhc0ZsYWdzID8gb3B0cy5mbGFncyA6IGZsYWdzO1xuXG5cdHJldHVybiB7XG5cdFx0c291cmNlLFxuXHRcdGZsYWdzLFxuXHRcdGhhc0ZsYWdzLFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJlZ0V4cFNvdXJjZVBhdHRlcm5cbiJdfQ==