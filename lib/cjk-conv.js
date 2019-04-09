"use strict";
/**
 * Created by user on 2019/4/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * for cjk-conv and regexp-cjk only
 */
function _re_cjk_conv(flags, addSource) {
    flags = (flags || 'u');
    if (flags.indexOf('u') === -1) {
        flags += 'u';
    }
    return new RegExp(`[\\u2e80-\\u2e99\\u2e9b-\\u2ef3\\u2f00-\\u2fd5\\u3038-\\u303b\\u3400-\\u4db5\\u4E00-\\u9FFF\\u{20000}-\\u{2FA1F}${addSource || ''}]`, flags);
}
exports._re_cjk_conv = _re_cjk_conv;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2prLWNvbnYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjamstY29udi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUg7O0dBRUc7QUFDSCxTQUFnQixZQUFZLENBQUMsS0FBYyxFQUFFLFNBQWtCO0lBRTlELEtBQUssR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztJQUV2QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzdCO1FBQ0MsS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNiO0lBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxtSEFBbUgsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2hLLENBQUM7QUFWRCxvQ0FVQztBQUVELGtCQUFlLE9BQXNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzQvOS5cbiAqL1xuXG4vKipcbiAqIGZvciBjamstY29udiBhbmQgcmVnZXhwLWNqayBvbmx5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVfY2prX2NvbnYoZmxhZ3M/OiBzdHJpbmcsIGFkZFNvdXJjZT86IHN0cmluZylcbntcblx0ZmxhZ3MgPSAoZmxhZ3MgfHwgJ3UnKTtcblxuXHRpZiAoZmxhZ3MuaW5kZXhPZigndScpID09PSAtMSlcblx0e1xuXHRcdGZsYWdzICs9ICd1Jztcblx0fVxuXG5cdHJldHVybiBuZXcgUmVnRXhwKGBbXFxcXHUyZTgwLVxcXFx1MmU5OVxcXFx1MmU5Yi1cXFxcdTJlZjNcXFxcdTJmMDAtXFxcXHUyZmQ1XFxcXHUzMDM4LVxcXFx1MzAzYlxcXFx1MzQwMC1cXFxcdTRkYjVcXFxcdTRFMDAtXFxcXHU5RkZGXFxcXHV7MjAwMDB9LVxcXFx1ezJGQTFGfSR7YWRkU291cmNlIHx8ICcnfV1gLCBmbGFncylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2Nqay1jb252Jyk7XG4iXX0=