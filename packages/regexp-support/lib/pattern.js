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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILG1DQUF5RTtBQUU1RCxRQUFBLGNBQWMsR0FBRztJQUM3QixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLDJCQUEyQixFQUFFLEtBQUs7SUFDbEMseUJBQXlCLEVBQUUsS0FBSztJQUVoQyxpQ0FBaUMsRUFBRSxLQUFLO0lBQ3hDLDZCQUE2QixFQUFFLEtBQUs7SUFFcEMsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixpQkFBaUIsRUFBRSxLQUFLO0lBRXhCLGtCQUFrQixFQUFFLEtBQUs7SUFDekIsa0JBQWtCLEVBQUUsS0FBSztJQUV6QixlQUFlLEVBQUUsS0FBSztJQUV0QixRQUFRLEVBQUUsS0FBSztJQUVmLFdBQVcsRUFBRSxLQUFLO0NBQ2xCLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FFcEI7SUFDSDs7T0FFRztJQUNILG9CQUFvQixFQUFFO1FBQ3JCLHdCQUF3QixDQUFDLElBQUksQ0FBQztRQUM5Qix3QkFBd0IsQ0FBQyxLQUFLLENBQUM7UUFDL0Isd0JBQXdCLENBQUMsR0FBRyxDQUFDO0tBQzdCO0lBQ0QsMkJBQTJCLEVBQUU7UUFDNUIsd0JBQXdCLENBQUMsV0FBVyxDQUFDO1FBQ3JDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztRQUNuQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUM7UUFDakMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1FBQ2hDLHdCQUF3QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7S0FDbkM7SUFDRCx5QkFBeUIsRUFBRTtRQUMxQix3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0tBQ25DO0lBRUQsaUNBQWlDLEVBQUU7UUFDbEMsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7UUFDckQsQ0FBQyx5QkFBeUIsRUFBRSxH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RyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTNCLHNDQUFzQztnQkFFdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUNEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBekJELDREQXlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNC8yNi8wMjYuXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlUmVnRXhwLCBJQ3JlYXRlUmVnRXhwLCBJVHlwZUNyZWF0ZVJlZ0V4cCB9IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgUGF0dGVyblN1cHBvcnQgPSB7XG5cdG5hbWVkQ2FwdHVyaW5nR3JvdXBzOiBmYWxzZSxcblx0bmFtZWRDYXB0dXJpbmdHcm91cHNVbmljb2RlOiBmYWxzZSxcblx0bmFtZWRDYXB0dXJpbmdHcm91cHNFbW9qaTogZmFsc2UsXG5cblx0bmFtZWRDYXB0dXJpbmdHcm91cHNCYWNrcmVmZXJlbmNlOiBmYWxzZSxcblx0bmFtZWRDYXB0dXJpbmdHcm91cHNEdXBsaWNhdGU6IGZhbHNlLFxuXG5cdGxvb2tBaGVhZFBvc2l0aXZlOiBmYWxzZSxcblx0bG9va0FoZWFkTmVnYXRpdmU6IGZhbHNlLFxuXG5cdGxvb2tCZWhpbmRQb3NpdGl2ZTogZmFsc2UsXG5cdGxvb2tCZWhpbmROZWdhdGl2ZTogZmFsc2UsXG5cblx0ZG90VW5pY29kZUVtb2ppOiBmYWxzZSxcblxuXHRjbGFzc1N1YjogZmFsc2UsXG5cblx0dW5pY29kZVdyYXA6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IFBhdHRlcm5UZXN0OiB7XG5cdFtrIGluIGtleW9mIHR5cGVvZiBQYXR0ZXJuU3VwcG9ydF0/OiBJUGF0dGVyblRlc3RSb3dbXVxufSA9IHtcblx0LyoqXG5cdCAqIEEtWiwgYS16LCAwLTksICQsIGFuZCBfXG5cdCAqL1xuXHRuYW1lZENhcHR1cmluZ0dyb3VwczogW1xuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3VwcygnQXonKSxcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ18wOScpLFxuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3VwcygnJCcpLFxuXHRdLFxuXHRuYW1lZENhcHR1cmluZ0dyb3Vwc1VuaWNvZGU6IFtcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ25hw692ZeWsouOBruaXpeW4uCcpLFxuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3Vwcygn0KDRg9GB0YHQutC40LknKSxcblx0XHR0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoJ25hw692ZScpLFxuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3Vwcygn5ayi44Gu5pel5bi4JyksXG5cdFx0dGVzdE5hbWVkQ2FwdHVyaW5nR3JvdXBzKCfwoKygJywgJ3UnKSxcblx0XSxcblx0bmFtZWRDYXB0dXJpbmdHcm91cHNFbW9qaTogW1xuXHRcdHRlc3ROYW1lZENhcHR1cmluZ0dyb3Vwcygn8J+RqScsICd1JyksXG5cdF0sXG5cblx0bmFtZWRDYXB0dXJpbmdHcm91cHNCYWNrcmVmZXJlbmNlOiBbXG5cdFx0WydeKD88aGFsZj4uKikuXFxcXGs8aGFsZj4kJywgJ3UnLCAnYSphJywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XHRbJ14oPzxoYWxmPi4qKS5cXFxcazxoYWxmPiQnLCAndScsICdhKmInLCBmYWxzZSwgJ3Rlc3QnXSxcblx0XSxcblxuXHRuYW1lZENhcHR1cmluZ0dyb3Vwc0R1cGxpY2F0ZTogW1xuXHRcdFsnXig/Oig/PGhhbGY+Yil8KD88aGFsZj5hKSkuXFxcXGs8aGFsZj4kJywgJ3UnLCAnYSphJywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XSxcblxuXHRsb29rQWhlYWRQb3NpdGl2ZTogW1xuXHRcdFsnYWEoPz1iYiknLCAnJywgJ2FhYmInLCB0cnVlLCAndGVzdCddLFxuXHRdLFxuXG5cdGxvb2tBaGVhZE5lZ2F0aXZlOiBbXG5cdFx0WydhYSg/IWJiKScsICcnLCAnYWFiYicsIGZhbHNlLCAndGVzdCddLFxuXHRdLFxuXG5cdGxvb2tCZWhpbmRQb3NpdGl2ZTogW1xuXHRcdFsnKD88PVxcXFwkKWZvbycsICdnJywgJyRmb28gJWZvbyBmb28nLCAnJCAlZm9vIGZvbycsICdyZXBsYWNlJ10sXG5cdFx0WycoPzw9XFxcXCQpZm9vJywgJ2cnLCAnJGZvbyAlZm9vIGZvbycsICckYmFyICVmb28gZm9vJywgZnVuY3Rpb24gPFQ+KHI6IFJlZ0V4cCwgdmFsdWU6IGFueSwgaW5wdXQ6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4sIGZsYWc6IHN0cmluZylcblx0XHR7XG5cdFx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZShyLCAnYmFyJykgPT09IHZhbHVlO1xuXHRcdH1dLFxuXHRdLFxuXG5cdGxvb2tCZWhpbmROZWdhdGl2ZTogW1xuXHRcdFsnKD88IVxcXFwkKWZvbycsICdnJywgJyRmb28gJWZvbyBmb28nLCAnJGZvbyAlICcsICdyZXBsYWNlJ10sXG5cdFx0WycoPzwhXFxcXCQpZm9vJywgJ2cnLCAnJGZvbyAlZm9vIGZvbycsICckZm9vICViYXIgYmFyJywgZnVuY3Rpb24gPFQ+KHI6IFJlZ0V4cCwgdmFsdWU6IGFueSwgaW5wdXQ6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4sIGZsYWc6IHN0cmluZylcblx0XHR7XG5cdFx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZShyLCAnYmFyJykgPT09IHZhbHVlO1xuXHRcdH1dLFxuXHRdLFxuXG5cdGRvdFVuaWNvZGVFbW9qaTogW1xuXG5cdFx0WydeLiQnLCAndScsICfwn5iAJywgdHJ1ZSwgJ3Rlc3QnXSxcblxuXHRdLFxuXG5cdC8qKlxuXHQgKiBAbGluayBodHRwOi8vd3d3LndlbGxoby5uZXQvcmVnZXgvamF2YXJlLmh0bWxcblx0ICovXG5cdGNsYXNzU3ViOiBbXG5cdFx0WydbYS16JiZbXm0tcF1dJywgJycsICdtJywgZmFsc2UsICd0ZXN0J10sXG5cdFx0WydbYS16JiZbXm0tcF1dJywgJycsICdhJywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XSxcblxuXHR1bmljb2RlV3JhcDogW1xuXHRcdFsnXlxcXFx1ezIwYmI3fSQnLCAndScsICfwoK63JywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhdHRlcm5UZXN0Rm5cbntcblx0PFQ+KHI6IFJlZ0V4cCwgdmFsdWU6IGFueSwgaW5wdXQ6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4sIGZsYWc6IHN0cmluZyk6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UGF0dGVybihuYW1lOiBzdHJpbmcsIFJlZ0V4cENsYXNzPzogdHlwZW9mIFJlZ0V4cCwgdGVzdFBhdHRlcm5zPzogdHlwZW9mIFBhdHRlcm5UZXN0KTogYm9vbGVhblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RQYXR0ZXJuKG5hbWU6IHN0cmluZywgUmVnRXhwQ2xhc3M/OiBJQ3JlYXRlUmVnRXhwLCB0ZXN0UGF0dGVybnM/OiB0eXBlb2YgUGF0dGVyblRlc3QpOiBib29sZWFuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gdGVzdFBhdHRlcm48VD4obmFtZTogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4gPSBSZWdFeHAsIHRlc3RQYXR0ZXJucyA9IFBhdHRlcm5UZXN0KTogYm9vbGVhblxue1xuXHRpZiAodGVzdFBhdHRlcm5zW25hbWVdICYmIHRlc3RQYXR0ZXJuc1tuYW1lXS5sZW5ndGgpXG5cdHtcblx0XHRsZXQgYm9vbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0Ym9vbCA9IHRlc3RQYXR0ZXJuc1tuYW1lXS5ldmVyeShmdW5jdGlvbiAodilcblx0XHRcdHtcblx0XHRcdFx0bGV0IFtwYXR0ZXJuLCBmbGFnLCBpbnB1dCwgdmFsdWUsIGZuXSA9IHY7XG5cdFx0XHRcdGxldCBib29sOiBib29sZWFuO1xuXG5cdFx0XHRcdGxldCByID0gY3JlYXRlUmVnRXhwKHBhdHRlcm4sIGZsYWcsIFJlZ0V4cENsYXNzKTtcblxuXHRcdFx0XHRpZiAoZm4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ym9vbCA9IChmbiBhcyBJUGF0dGVyblRlc3RGbikociwgdmFsdWUsIGlucHV0LCBwYXR0ZXJuLCBSZWdFeHBDbGFzcywgZmxhZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsZXQgcmV0O1xuXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKGZuKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjYXNlICdyZXBsYWNlJzpcblx0XHRcdFx0XHRcdFx0XHRyZXQgPSBpbnB1dC5yZXBsYWNlKHIsICcnKTtcblxuXHRcdFx0XHRcdFx0XHRcdGJvb2wgPSByZXQgPT09IHZhbHVlO1xuXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0Ym9vbCA9IHJbZm5dKGlucHV0KSA9PT0gdmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJvb2wgPSByLmV4ZWMoaW5wdXQpID09PSB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vY29uc29sZS5sb2coYm9vbCk7XG5cblx0XHRcdFx0cmV0dXJuIGJvb2w7XG5cdFx0XHR9KSA9PT0gdHJ1ZTtcblxuXHRcdFx0Ly9jb25zb2xlLmxvZyhib29sKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e1xuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBib29sO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0TmFtZWRDYXB0dXJpbmdHcm91cHMoa2V5OiBzdHJpbmcsIGZsYWdzPzogc3RyaW5nKTogSVBhdHRlcm5UZXN0Um93XG57XG5cdHJldHVybiBbYFVcXFxcKyg/PCR7a2V5fT5bMC05QS1GXXs0fSlgLCBmbGFncyB8fCAnJywgJ1UrMjYyMCcsIHtcblx0XHRncm91cHM6IHsgW2tleV06ICcyNjIwJyB9LFxuXHR9LCBmdW5jdGlvbiAociwgdmFsdWUsIGlucHV0KVxuXHR7XG5cdFx0bGV0IHJldCA9IHIuZXhlYyhpbnB1dCkgYXMgUmVnRXhwRXhlY0FycmF5ICYge1xuXHRcdFx0Z3JvdXBzOiB7XG5cdFx0XHRcdFtrZXk6IHN0cmluZ106IHN0cmluZyxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIHJldC5ncm91cHMgJiYgT2JqZWN0XG5cdFx0XHQuZW50cmllcyhyZXQuZ3JvdXBzKVxuXHRcdFx0LmV2ZXJ5KGZ1bmN0aW9uICh2KVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgW2tleSwgdjFdID0gdjtcblx0XHRcdFx0bGV0IHYyID0gdmFsdWUuZ3JvdXBzW2tleV07XG5cblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhrZXksIHYxLCB2MiwgdjEgPT09IHYyKTtcblxuXHRcdFx0XHRyZXR1cm4gdjEgPT09IHYyO1xuXHRcdFx0fSlcblx0XHRcdDtcblx0fV07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhdHRlcm5UZXN0Um93XG57XG5cdDA6IHN0cmluZyxcblx0MTogc3RyaW5nLFxuXHQyOiBzdHJpbmcsXG5cdDM6IGJvb2xlYW4gfCBhbnksXG5cdDQ/OiBzdHJpbmcgfCBJUGF0dGVyblRlc3RGbixcbn1cbiJdfQ==