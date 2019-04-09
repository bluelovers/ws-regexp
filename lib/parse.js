"use strict";
/**
 * Created by user on 2018/5/3/003.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_support_1 = require("regexp-support");
function parseRegularExpressionString(str, options = {}) {
    let m = rRegularExpressionString(options).exec(str);
    if (m) {
        let [s, d, r, f] = m;
        return {
            source: typeof r !== 'undefined' ? r : '',
            flags: typeof f !== 'undefined' ? f : '',
            slash: d,
            input: str,
        };
    }
    else if (options.throwError) {
        throw new TypeError(`${str} not a regex like string`);
    }
    return null;
}
exports.parseRegularExpressionString = parseRegularExpressionString;
function rRegularExpressionString(options = {}) {
    return new RegExp(`^(${options.allowNonNativeSlash ? '[\\/#$%]' : '\\/'})(..*)\\1([${options.allowNonNativeFlags ? 'a-zA-Z' : regexp_support_1.default.nativeFlags}]*)$`);
}
exports.rRegularExpressionString = rRegularExpressionString;
exports.default = parseRegularExpressionString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsbURBQW9FO0FBUXBFLFNBQWdCLDRCQUE0QixDQUFDLEdBQVcsRUFBRSxVQUl0RCxFQUFFO0lBRUwsSUFBSSxDQUFDLEdBQUcsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxFQUNMO1FBQ0MsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQixPQUFPO1lBQ04sTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QyxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxHQUFHO1NBQ1YsQ0FBQztLQUNGO1NBQ0ksSUFBSSxPQUFPLENBQUMsVUFBVSxFQUMzQjtRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxHQUFHLDBCQUEwQixDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUF4QkQsb0VBd0JDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsVUFHckMsRUFBRTtJQUVMLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBTyxDQUFDLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDMUosQ0FBQztBQU5ELDREQU1DO0FBRUQsa0JBQWUsNEJBQTRCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvMy8wMDMuXG4gKi9cblxuaW1wb3J0IHN1cHBvcnQsIHsgaGFzU3VwcG9ydEZsYWcsIEZsYWdzTmFtZSB9IGZyb20gJ3JlZ2V4cC1zdXBwb3J0JztcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnMgPSB7XG5cdGFsbG93Tm9uTmF0aXZlU2xhc2g/OiBib29sZWFuLFxuXHRhbGxvd05vbk5hdGl2ZUZsYWdzPzogYm9vbGVhbixcblx0dGhyb3dFcnJvcj86IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cjogc3RyaW5nLCBvcHRpb25zOiB7XG5cdGFsbG93Tm9uTmF0aXZlU2xhc2g/OiBib29sZWFuLFxuXHRhbGxvd05vbk5hdGl2ZUZsYWdzPzogYm9vbGVhbixcblx0dGhyb3dFcnJvcj86IGJvb2xlYW4sXG59ID0ge30pXG57XG5cdGxldCBtID0gclJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKG9wdGlvbnMpLmV4ZWMoc3RyKTtcblx0aWYgKG0pXG5cdHtcblx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzb3VyY2U6IHR5cGVvZiByICE9PSAndW5kZWZpbmVkJyA/IHIgOiAnJyxcblx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRzbGFzaDogZCxcblx0XHRcdGlucHV0OiBzdHIsXG5cdFx0fTtcblx0fVxuXHRlbHNlIGlmIChvcHRpb25zLnRocm93RXJyb3IpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke3N0cn0gbm90IGEgcmVnZXggbGlrZSBzdHJpbmdgKTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gclJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKG9wdGlvbnM6IHtcblx0YWxsb3dOb25OYXRpdmVTbGFzaD86IGJvb2xlYW4sXG5cdGFsbG93Tm9uTmF0aXZlRmxhZ3M/OiBib29sZWFuLFxufSA9IHt9KVxue1xuXHRyZXR1cm4gbmV3IFJlZ0V4cChgXigke29wdGlvbnMuYWxsb3dOb25OYXRpdmVTbGFzaCA/ICdbXFxcXC8jJCVdJyA6ICdcXFxcLyd9KSguLiopXFxcXDEoWyR7b3B0aW9ucy5hbGxvd05vbk5hdGl2ZUZsYWdzID8gJ2EtekEtWicgOiBzdXBwb3J0Lm5hdGl2ZUZsYWdzfV0qKSRgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZztcbiJdfQ==