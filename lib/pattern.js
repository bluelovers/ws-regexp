"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.PatternSupport = {
    namedCapturingGroups: false,
    namedCapturingGroupsUnicode: false,
    namedCapturingGroupsEmoji: false,
    namedCapturingGroupsBackreference: false,
    namedCapturingGroupsDuplicate: false,
    lookAheadPositive: false,
    lookAheadNegative: false,
    lookBehindPositive: false,
    lookBehindNegative: false,
    dotUnicodeEmoji: false,
    classSub: false,
    unicodeWrap: false,
};
exports.PatternTest = {
    /**
     * A-Z, a-z, 0-9, $, and _
     */
    namedCapturingGroups: [
        testNamedCapturingGroups('Az'),
        testNamedCapturingGroups('_09'),
        testNamedCapturingGroups('$'),
    ],
    namedCapturingGroupsUnicode: [
        testNamedCapturingGroups('naïve嬢の日常'),
        testNamedCapturingGroups('Русский'),
        testNamedCapturingGroups('naïve'),
        testNamedCapturingGroups('嬢の日常'),
        testNamedCapturingGroups('𠬠', 'u'),
    ],
    namedCapturingGroupsEmoji: [
        testNamedCapturingGroups('👩', 'u'),
    ],
    namedCapturingGroupsBackreference: [
        ['^(?<half>.*).\\k<half>$', 'u', 'a*a', true, 'test'],
        ['^(?<half>.*).\\k<half>$', 'u', 'a*b', false, 'test'],
    ],
    namedCapturingGroupsDuplicate: [
        ['^(?:(?<half>b)|(?<half>a)).\\k<half>$', 'u', 'a*a', true, 'test'],
    ],
    lookAheadPositive: [
        ['aa(?=bb)', '', 'aabb', true, 'test'],
    ],
    lookAheadNegative: [
        ['aa(?!bb)', '', 'aabb', false, 'test'],
    ],
    lookBehindPositive: [
        ['(?<=\\$)foo', 'g', '$foo %foo foo', '$ %foo foo', 'replace'],
        ['(?<=\\$)foo', 'g', '$foo %foo foo', '$bar %foo foo', function (r, value, input, pattern, RegExpClass, flag) {
                return input.replace(r, 'bar') === value;
            }],
    ],
    lookBehindNegative: [
        ['(?<!\\$)foo', 'g', '$foo %foo foo', '$foo % ', 'replace'],
        ['(?<!\\$)foo', 'g', '$foo %foo foo', '$foo %bar bar', function (r, value, input, pattern, RegExpClass, flag) {
                return input.replace(r, 'bar') === value;
            }],
    ],
    dotUnicodeEmoji: [
        ['^.$', 'u', '😀', true, 'test'],
    ],
    /**
     * @link http://www.wellho.net/regex/javare.html
     */
    classSub: [
        ['[a-z&&[^m-p]]', '', 'm', false, 'test'],
        ['[a-z&&[^m-p]]', '', 'a', true, 'test'],
    ],
    unicodeWrap: [
        ['^\\u{20bb7}$', 'u', '𠮷', true, 'test'],
    ],
};
// @ts-ignore
function testPattern(name, RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    if (testPatterns[name] && testPatterns[name].length) {
        let bool = false;
        try {
            bool = testPatterns[name].every(function (v) {
                let [pattern, flag, input, value, fn] = v;
                let bool;
                let r = index_1.createRegExp(pattern, flag, RegExpClass);
                if (fn) {
                    if (typeof fn == 'function') {
                        bool = fn(r, value, input, pattern, RegExpClass, flag);
                    }
                    else {
                        let ret;
                        switch (fn) {
                            case 'replace':
                                ret = input.replace(r, '');
                                bool = ret === value;
                                break;
                            default:
                                bool = r[fn](input) === value;
                                break;
                        }
                    }
                }
                else {
                    bool = r.exec(input) === value;
                }
                //console.log(bool);
                return bool;
            }) === true;
            //console.log(bool);
        }
        catch (e) {
            bool = false;
        }
        return bool;
    }
    return null;
}
exports.testPattern = testPattern;
function testNamedCapturingGroups(key, flags) {
    return [`U\\+(?<${key}>[0-9A-F]{4})`, flags || '', 'U+2620', {
            groups: { [key]: '2620' },
        }, function (r, value, input) {
            let ret = r.exec(input);
            return ret.groups && Object
                .entries(ret.groups)
                .every(function (v) {
                let [key, v1] = v;
                let v2 = value.groups[key];
                //console.log(key, v1, v2, v1 === v2);
                return v1 === v2;
            });
        }];
}
exports.testNamedCapturingGroups = testNamedCapturingGroups;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILG1DQUF5RTtBQUU1RCxRQUFBLGNBQWMsR0FBRztJQUM3QixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLDJCQUEyQixFQUFFLEtBQUs7SUFDbEMseUJBQXlCLEVBQUUsS0FBSztJQUVoQyxpQ0FBaUMsRUFBRSxLQUFLO0lBQ3hDLDZCQUE2QixFQUFFLEtBQUs7SUFFcEMsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixpQkFBaUIsRUFBRSxLQUFLO0lBRXhCLGtCQUFrQixFQUFFLEtBQUs7SUFDekIsa0JBQWtCLEVBQUUsS0FBSztJQUV6QixlQUFlLEVBQUUsS0FBSztJQUV0QixRQUFRLEVBQUUsS0FBSztJQUVmLFdBQVcsRUFBRSxLQUFLO0NBQ2xCLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FFcEI7SUFDSDs7T0FFRztJQUNILG9CQUFvQixFQUFFO1FBQ3JCLHdCQUF3QixDQUFDLElBQUksQ0FBQztRQUM5Qix3QkFBd0IsQ0FBQyxLQUFLLENBQUM7UUFDL0Isd0JBQXdCLENBQUMsR0FBRyxDQUFDO0tBQzdCO0lBQ0QsMkJBQTJCLEVBQUU7UUFDNUIsd0JBQXdCLENBQUMsV0FBVyxDQUFDO1FBQ3JDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztRQUNuQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUM7UUFDakMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1FBQ2hDLHdCQUF3QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7S0FDbkM7SUFDRCx5QkFBeUIsRUFBRTtRQUMxQix3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0tBQ25DO0lBRUQsaUNBQWlDLEVBQUU7UUFDbEMsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7UUFDckQsQ0FBQyx5QkFBeUIsRUFBRSxH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RyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTNCLHNDQUFzQztnQkFFdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUNEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBekJELDREQXlCQztBQVdELGtCQUFlLE9BQXFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzQvMjYvMDI2LlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVJlZ0V4cCwgSUNyZWF0ZVJlZ0V4cCwgSVR5cGVDcmVhdGVSZWdFeHAgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IFBhdHRlcm5TdXBwb3J0ID0ge1xuXHRuYW1lZENhcHR1cmluZ0dyb3VwczogZmFsc2UsXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzVW5pY29kZTogZmFsc2UsXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzRW1vamk6IGZhbHNlLFxuXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzQmFja3JlZmVyZW5jZTogZmFsc2UsXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzRHVwbGljYXRlOiBmYWxzZSxcblxuXHRsb29rQWhlYWRQb3NpdGl2ZTogZmFsc2UsXG5cdGxvb2tBaGVhZE5lZ2F0aXZlOiBmYWxzZSxcblxuXHRsb29rQmVoaW5kUG9zaXRpdmU6IGZhbHNlLFxuXHRsb29rQmVoaW5kTmVnYXRpdmU6IGZhbHNlLFxuXG5cdGRvdFVuaWNvZGVFbW9qaTogZmFsc2UsXG5cblx0Y2xhc3NTdWI6IGZhbHNlLFxuXG5cdHVuaWNvZGVXcmFwOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBQYXR0ZXJuVGVzdDoge1xuXHRbayBpbiBrZXlvZiB0eXBlb2YgUGF0dGVyblN1cHBvcnRdPzogSVBhdHRlcm5UZXN0Um93W11cbn0gPSB7XG5cdC8qKlxuXHQgKiBBLVosIGEteiwgMC05LCAkLCBhbmQgX1xuXHQgKi9cblx0bmFtZWRDYXB0dXJpbmdHcm91cHM6IFtcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ0F6JyksXG5cdFx0dGVzdE5hbWVkQ2FwdHVyaW5nR3JvdXBzKCdfMDknKSxcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJyQnKSxcblx0XSxcblx0bmFtZWRDYXB0dXJpbmdHcm91cHNVbmljb2RlOiBbXG5cdFx0dGVzdE5hbWVkQ2FwdHVyaW5nR3JvdXBzKCduYcOvdmXlrKLjga7ml6XluLgnKSxcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ9Cg0YPRgdGB0LrQuNC5JyksXG5cdFx0dGVzdE5hbWVkQ2FwdHVyaW5nR3JvdXBzKCduYcOvdmUnKSxcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ+WsouOBruaXpeW4uCcpLFxuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3Vwcygn8KCsoCcsICd1JyksXG5cdF0sXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzRW1vamk6IFtcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ/CfkaknLCAndScpLFxuXHRdLFxuXG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzQmFja3JlZmVyZW5jZTogW1xuXHRcdFsnXig/PGhhbGY+LiopLlxcXFxrPGhhbGY+JCcsICd1JywgJ2EqYScsIHRydWUsICd0ZXN0J10sXG5cdFx0WydeKD88aGFsZj4uKikuXFxcXGs8aGFsZj4kJywgJ3UnLCAnYSpiJywgZmFsc2UsICd0ZXN0J10sXG5cdF0sXG5cblx0bmFtZWRDYXB0dXJpbmdHcm91cHNEdXBsaWNhdGU6IFtcblx0XHRbJ14oPzooPzxoYWxmPmIpfCg/PGhhbGY+YSkpLlxcXFxrPGhhbGY+JCcsICd1JywgJ2EqYScsIHRydWUsICd0ZXN0J10sXG5cdF0sXG5cblx0bG9va0FoZWFkUG9zaXRpdmU6IFtcblx0XHRbJ2FhKD89YmIpJywgJycsICdhYWJiJywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XSxcblxuXHRsb29rQWhlYWROZWdhdGl2ZTogW1xuXHRcdFsnYWEoPyFiYiknLCAnJywgJ2FhYmInLCBmYWxzZSwgJ3Rlc3QnXSxcblx0XSxcblxuXHRsb29rQmVoaW5kUG9zaXRpdmU6IFtcblx0XHRbJyg/PD1cXFxcJClmb28nLCAnZycsICckZm9vICVmb28gZm9vJywgJyQgJWZvbyBmb28nLCAncmVwbGFjZSddLFxuXHRcdFsnKD88PVxcXFwkKWZvbycsICdnJywgJyRmb28gJWZvbyBmb28nLCAnJGJhciAlZm9vIGZvbycsIGZ1bmN0aW9uIDxUPihyOiBSZWdFeHAsIHZhbHVlOiBhbnksIGlucHV0OiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZywgUmVnRXhwQ2xhc3M6IElUeXBlQ3JlYXRlUmVnRXhwPFQ+LCBmbGFnOiBzdHJpbmcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UociwgJ2JhcicpID09PSB2YWx1ZTtcblx0XHR9XSxcblx0XSxcblxuXHRsb29rQmVoaW5kTmVnYXRpdmU6IFtcblx0XHRbJyg/PCFcXFxcJClmb28nLCAnZycsICckZm9vICVmb28gZm9vJywgJyRmb28gJSAnLCAncmVwbGFjZSddLFxuXHRcdFsnKD88IVxcXFwkKWZvbycsICdnJywgJyRmb28gJWZvbyBmb28nLCAnJGZvbyAlYmFyIGJhcicsIGZ1bmN0aW9uIDxUPihyOiBSZWdFeHAsIHZhbHVlOiBhbnksIGlucHV0OiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZywgUmVnRXhwQ2xhc3M6IElUeXBlQ3JlYXRlUmVnRXhwPFQ+LCBmbGFnOiBzdHJpbmcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UociwgJ2JhcicpID09PSB2YWx1ZTtcblx0XHR9XSxcblx0XSxcblxuXHRkb3RVbmljb2RlRW1vamk6IFtcblxuXHRcdFsnXi4kJywgJ3UnLCAn8J+YgCcsIHRydWUsICd0ZXN0J10sXG5cblx0XSxcblxuXHQvKipcblx0ICogQGxpbmsgaHR0cDovL3d3dy53ZWxsaG8ubmV0L3JlZ2V4L2phdmFyZS5odG1sXG5cdCAqL1xuXHRjbGFzc1N1YjogW1xuXHRcdFsnW2EteiYmW15tLXBdXScsICcnLCAnbScsIGZhbHNlLCAndGVzdCddLFxuXHRcdFsnW2EteiYmW15tLXBdXScsICcnLCAnYScsIHRydWUsICd0ZXN0J10sXG5cdF0sXG5cblx0dW5pY29kZVdyYXA6IFtcblx0XHRbJ15cXFxcdXsyMGJiN30kJywgJ3UnLCAn8KCutycsIHRydWUsICd0ZXN0J10sXG5cdF0sXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYXR0ZXJuVGVzdEZuXG57XG5cdDxUPihyOiBSZWdFeHAsIHZhbHVlOiBhbnksIGlucHV0OiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZywgUmVnRXhwQ2xhc3M6IElUeXBlQ3JlYXRlUmVnRXhwPFQ+LCBmbGFnOiBzdHJpbmcpOiBib29sZWFuLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdFBhdHRlcm4obmFtZTogc3RyaW5nLCBSZWdFeHBDbGFzcz86IHR5cGVvZiBSZWdFeHAsIHRlc3RQYXR0ZXJucz86IHR5cGVvZiBQYXR0ZXJuVGVzdCk6IGJvb2xlYW5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UGF0dGVybihuYW1lOiBzdHJpbmcsIFJlZ0V4cENsYXNzPzogSUNyZWF0ZVJlZ0V4cCwgdGVzdFBhdHRlcm5zPzogdHlwZW9mIFBhdHRlcm5UZXN0KTogYm9vbGVhblxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RQYXR0ZXJuPFQ+KG5hbWU6IHN0cmluZywgUmVnRXhwQ2xhc3M6IElUeXBlQ3JlYXRlUmVnRXhwPFQ+ID0gUmVnRXhwLCB0ZXN0UGF0dGVybnMgPSBQYXR0ZXJuVGVzdCk6IGJvb2xlYW5cbntcblx0aWYgKHRlc3RQYXR0ZXJuc1tuYW1lXSAmJiB0ZXN0UGF0dGVybnNbbmFtZV0ubGVuZ3RoKVxuXHR7XG5cdFx0bGV0IGJvb2w6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGJvb2wgPSB0ZXN0UGF0dGVybnNbbmFtZV0uZXZlcnkoZnVuY3Rpb24gKHYpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBbcGF0dGVybiwgZmxhZywgaW5wdXQsIHZhbHVlLCBmbl0gPSB2O1xuXHRcdFx0XHRsZXQgYm9vbDogYm9vbGVhbjtcblxuXHRcdFx0XHRsZXQgciA9IGNyZWF0ZVJlZ0V4cChwYXR0ZXJuLCBmbGFnLCBSZWdFeHBDbGFzcyk7XG5cblx0XHRcdFx0aWYgKGZuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGJvb2wgPSAoZm4gYXMgSVBhdHRlcm5UZXN0Rm4pKHIsIHZhbHVlLCBpbnB1dCwgcGF0dGVybiwgUmVnRXhwQ2xhc3MsIGZsYWcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGV0IHJldDtcblxuXHRcdFx0XHRcdFx0c3dpdGNoIChmbilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncmVwbGFjZSc6XG5cdFx0XHRcdFx0XHRcdFx0cmV0ID0gaW5wdXQucmVwbGFjZShyLCAnJyk7XG5cblx0XHRcdFx0XHRcdFx0XHRib29sID0gcmV0ID09PSB2YWx1ZTtcblxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdGJvb2wgPSByW2ZuXShpbnB1dCkgPT09IHZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRib29sID0gci5leGVjKGlucHV0KSA9PT0gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGJvb2wpO1xuXG5cdFx0XHRcdHJldHVybiBib29sO1xuXHRcdFx0fSkgPT09IHRydWU7XG5cblx0XHRcdC8vY29uc29sZS5sb2coYm9vbCk7XG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHtcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYm9vbDtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdE5hbWVkQ2FwdHVyaW5nR3JvdXBzKGtleTogc3RyaW5nLCBmbGFncz86IHN0cmluZyk6IElQYXR0ZXJuVGVzdFJvd1xue1xuXHRyZXR1cm4gW2BVXFxcXCsoPzwke2tleX0+WzAtOUEtRl17NH0pYCwgZmxhZ3MgfHwgJycsICdVKzI2MjAnLCB7XG5cdFx0Z3JvdXBzOiB7IFtrZXldOiAnMjYyMCcgfSxcblx0fSwgZnVuY3Rpb24gKHIsIHZhbHVlLCBpbnB1dClcblx0e1xuXHRcdGxldCByZXQgPSByLmV4ZWMoaW5wdXQpIGFzIFJlZ0V4cEV4ZWNBcnJheSAmIHtcblx0XHRcdGdyb3Vwczoge1xuXHRcdFx0XHRba2V5OiBzdHJpbmddOiBzdHJpbmcsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiByZXQuZ3JvdXBzICYmIE9iamVjdFxuXHRcdFx0LmVudHJpZXMocmV0Lmdyb3Vwcylcblx0XHRcdC5ldmVyeShmdW5jdGlvbiAodilcblx0XHRcdHtcblx0XHRcdFx0bGV0IFtrZXksIHYxXSA9IHY7XG5cdFx0XHRcdGxldCB2MiA9IHZhbHVlLmdyb3Vwc1trZXldO1xuXG5cdFx0XHRcdC8vY29uc29sZS5sb2coa2V5LCB2MSwgdjIsIHYxID09PSB2Mik7XG5cblx0XHRcdFx0cmV0dXJuIHYxID09PSB2Mjtcblx0XHRcdH0pXG5cdFx0XHQ7XG5cdH1dO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYXR0ZXJuVGVzdFJvd1xue1xuXHQwOiBzdHJpbmcsXG5cdDE6IHN0cmluZyxcblx0Mjogc3RyaW5nLFxuXHQzOiBib29sZWFuIHwgYW55LFxuXHQ0Pzogc3RyaW5nIHwgSVBhdHRlcm5UZXN0Rm4sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9wYXR0ZXJuJyk7XG4iXX0=