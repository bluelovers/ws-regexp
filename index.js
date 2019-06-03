"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
exports.hasSupportFlag = lib_1.hasSupportFlag;
exports.testFlag = lib_1.testFlag;
const flags_1 = require("./lib/flags");
exports.FlagsName = flags_1.FlagsName;
const index_1 = require("./lib/index");
const pattern_1 = require("./lib/pattern");
exports.testPattern = pattern_1.testPattern;
const unicode_1 = require("./lib/pattern/charset/unicode");
const unicode_blocks_1 = require("./lib/pattern/charset/unicode-blocks");
const unicode_script_1 = require("./lib/pattern/charset/unicode-script");
const prototype_1 = require("./lib/proto/prototype");
const static_1 = require("./lib/proto/static");
const symbol_1 = require("./lib/symbol");
/**
 * @link https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
 * @link https://www.regular-expressions.info/posixbrackets.html
 * @link http://2ality.com/archive.html?tag=regexp
 */
const _support = {
    nativeFlags: '',
    /**
     * flag support with name and pattern test
     */
    flags: Object
        .keys(flags_1.FlagsName)
        .reduce(function (a, flags) {
        let bool = false;
        if (flags in a) {
            bool = a[flags];
        }
        else if (flags_1.FlagsName[flags] in a) {
            bool = a[flags_1.FlagsName[flags]];
        }
        else {
            bool = lib_1.hasSupportFlag(flags_1.FlagsName[flags]);
        }
        a[flags] = bool;
        return a;
    }, {}),
    /**
     * all flag support without name and pattern test
     */
    flagsAll: index_1.testFlagsAll(RegExp, true),
    /**
     * pattern support
     */
    pattern: Object.keys(pattern_1.PatternSupport).reduce(function (a, key) {
        a[key] = pattern_1.testPattern(key);
        return a;
    }, {}),
    //hasFlagsProp: /x/g.flags === 'g',
    prototype: prototype_1.testPrototype(),
    static: static_1.testStatic(),
    symbol: symbol_1.testSymbol(),
    objectStringTag: Object.prototype.toString.call(/a/),
    unicodeSet: (() => {
        return {
            unicode: false,
            script: false,
            blocks: false,
            //unicodeKeys: Object.keys(UNICODE_ALL),
            //scriptKeys: Object.keys(UNICODE_SCRIPTS_ALL),
            unicodeTest: Object.entries(unicode_1.testUnicodeAll())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
            scriptTest: Object.entries(unicode_script_1.testUnicodeScriptAll())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
            blocksTest: Object.entries(unicode_blocks_1.testUnicodeBlocksAll())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
        };
    })(),
};
_support.unicodeSet.unicode = Object.values(_support.unicodeSet.unicodeTest).includes(true);
_support.unicodeSet.script = Object.values(_support.unicodeSet.scriptTest).includes(true);
_support.unicodeSet.blocks = Object.values(_support.unicodeSet.blocksTest).includes(true);
_support.nativeFlags = Object
    .keys(_support.flagsAll)
    .reduce(function (a, f) {
    if (_support.flagsAll[f]) {
        a.push(f);
    }
    return a;
}, [])
    .join('');
exports.support = Object.freeze(_support);
exports.default = exports.support;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBR0gsK0JBQThGO0FBaUpyRix5QkFqSkEsb0JBQWMsQ0FpSkE7QUFDZCxtQkFsSmdCLGNBQVEsQ0FrSmhCO0FBakpqQix1Q0FBd0M7QUErSS9CLG9CQS9JQSxpQkFBUyxDQStJQTtBQTlJbEIsdUNBQTJDO0FBRTNDLDJDQUE2RjtBQStJcEYsc0JBL0lnQixxQkFBVyxDQStJaEI7QUE5SXBCLDJEQUE0RTtBQUM1RSx5RUFBNEU7QUFDNUUseUVBQWlHO0FBQ2pHLHFEQUF3RTtBQUN4RSwrQ0FBK0Q7QUFDL0QseUNBQTBDO0FBRTFDOzs7O0dBSUc7QUFDSCxNQUFNLFFBQVEsR0FBRztJQUVoQixXQUFXLEVBQUUsRUFBRTtJQUVmOztPQUVHO0lBQ0gsS0FBSyxFQUFFLE1BQU07U0FDWCxJQUFJLENBQUMsaUJBQVMsQ0FBQztTQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLO1FBRXpCLElBQUksSUFBSSxHQUFZLEtBQUssQ0FBQztRQUUxQixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQ2Q7WUFDQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hCO2FBQ0ksSUFBSSxpQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDOUI7WUFDQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLGlCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMzQjthQUVEO1lBQ0MsSUFBSSxHQUFHLG9CQUFjLENBQUMsaUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVoQixPQUFPLENBQUMsQ0FBQztJQUNWLENBQUMsRUFBRSxFQUVGLENBQUM7SUFFSDs7T0FFRztJQUNILFFBQVEsRUFBRSxvQkFBWSxDQUFDLE1B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QUFRLENBQUMsQ0FBQyxDQUFDLEVBQ3hCO1FBQ0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNWO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDVixDQUFDLEVBQUUsRUFBYyxDQUFDO0tBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDVDtBQUVZLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFTL0Msa0JBQWUsZUFBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC80LzI2LzAyNi5cbiAqL1xuXG5pbXBvcnQgKiBhcyBsaWIgZnJvbSAnLi9saWInO1xuaW1wb3J0IHsgaGFzU3VwcG9ydEZsYWcsIHRlc3RGbGFnLCBJQ3JlYXRlUmVnRXhwLCBJRmxhZ3NBbGwsIElUeXBlQ3JlYXRlUmVnRXhwIH0gZnJvbSAnLi9saWInO1xuaW1wb3J0IHsgRmxhZ3NOYW1lIH0gZnJvbSAnLi9saWIvZmxhZ3MnO1xuaW1wb3J0IHsgdGVzdEZsYWdzQWxsIH0gZnJvbSAnLi9saWIvaW5kZXgnO1xuaW1wb3J0ICogYXMgbGliUGF0dGVybiBmcm9tICcuL2xpYi9wYXR0ZXJuJztcbmltcG9ydCB7IFBhdHRlcm5TdXBwb3J0LCB0ZXN0UGF0dGVybiwgSVBhdHRlcm5UZXN0Rm4sIElQYXR0ZXJuVGVzdFJvdyB9IGZyb20gJy4vbGliL3BhdHRlcm4nO1xuaW1wb3J0IHsgdGVzdFVuaWNvZGVBbGwsIFVOSUNPREVfQUxMIH0gZnJvbSAnLi9saWIvcGF0dGVybi9jaGFyc2V0L3VuaWNvZGUnO1xuaW1wb3J0IHsgdGVzdFVuaWNvZGVCbG9ja3NBbGwgfSBmcm9tICcuL2xpYi9wYXR0ZXJuL2NoYXJzZXQvdW5pY29kZS1ibG9ja3MnO1xuaW1wb3J0IHsgdGVzdFVuaWNvZGVTY3JpcHRBbGwsIFVOSUNPREVfU0NSSVBUU19BTEwgfSBmcm9tICcuL2xpYi9wYXR0ZXJuL2NoYXJzZXQvdW5pY29kZS1zY3JpcHQnO1xuaW1wb3J0IHsgdGVzdFByb3RvdHlwZSwgSVJlZ0V4cFByb3RvdHlwZSB9IGZyb20gJy4vbGliL3Byb3RvL3Byb3RvdHlwZSc7XG5pbXBvcnQgeyB0ZXN0U3RhdGljLCBJUmVnRXhwU3RhdGljIH0gZnJvbSAnLi9saWIvcHJvdG8vc3RhdGljJztcbmltcG9ydCB7IHRlc3RTeW1ib2wgfSBmcm9tICcuL2xpYi9zeW1ib2wnO1xuXG4vKipcbiAqIEBsaW5rIGh0dHBzOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNiVBRCVBMyVFNSU4OCU5OSVFOCVBMSVBOCVFOCVCRSVCRSVFNSVCQyU4RlxuICogQGxpbmsgaHR0cHM6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL3Bvc2l4YnJhY2tldHMuaHRtbFxuICogQGxpbmsgaHR0cDovLzJhbGl0eS5jb20vYXJjaGl2ZS5odG1sP3RhZz1yZWdleHBcbiAqL1xuY29uc3QgX3N1cHBvcnQgPSB7XG5cblx0bmF0aXZlRmxhZ3M6ICcnLFxuXG5cdC8qKlxuXHQgKiBmbGFnIHN1cHBvcnQgd2l0aCBuYW1lIGFuZCBwYXR0ZXJuIHRlc3Rcblx0ICovXG5cdGZsYWdzOiBPYmplY3Rcblx0XHQua2V5cyhGbGFnc05hbWUpXG5cdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwgZmxhZ3MpXG5cdFx0e1xuXHRcdFx0bGV0IGJvb2w6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRcdFx0aWYgKGZsYWdzIGluIGEpXG5cdFx0XHR7XG5cdFx0XHRcdGJvb2wgPSBhW2ZsYWdzXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKEZsYWdzTmFtZVtmbGFnc10gaW4gYSlcblx0XHRcdHtcblx0XHRcdFx0Ym9vbCA9IGFbRmxhZ3NOYW1lW2ZsYWdzXV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJvb2wgPSBoYXNTdXBwb3J0RmxhZyhGbGFnc05hbWVbZmxhZ3NdKTtcblx0XHRcdH1cblxuXHRcdFx0YVtmbGFnc10gPSBib29sO1xuXG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCB7fSBhcyB7XG5cdFx0XHRbayBpbiBrZXlvZiB0eXBlb2YgRmxhZ3NOYW1lXTogYm9vbGVhblxuXHRcdH0pLFxuXG5cdC8qKlxuXHQgKiBhbGwgZmxhZyBzdXBwb3J0IHdpdGhvdXQgbmFtZSBhbmQgcGF0dGVybiB0ZXN0XG5cdCAqL1xuXHRmbGFnc0FsbDogdGVzdEZsYWdzQWxsKFJlZ0V4cCwgdHJ1ZSksXG5cblx0LyoqXG5cdCAqIHBhdHRlcm4gc3VwcG9ydFxuXHQgKi9cblx0cGF0dGVybjogT2JqZWN0LmtleXMoUGF0dGVyblN1cHBvcnQpLnJlZHVjZShmdW5jdGlvbiAoYSwga2V5KVxuXHR7XG5cdFx0YVtrZXldID0gdGVzdFBhdHRlcm4oa2V5KTtcblx0XHRyZXR1cm4gYTtcblx0fSwge30gYXMgdHlwZW9mIFBhdHRlcm5TdXBwb3J0KSxcblxuXHQvL2hhc0ZsYWdzUHJvcDogL3gvZy5mbGFncyA9PT0gJ2cnLFxuXG5cdHByb3RvdHlwZTogdGVzdFByb3RvdHlwZSgpLFxuXG5cdHN0YXRpYzogdGVzdFN0YXRpYygpLFxuXG5cdHN5bWJvbDogdGVzdFN5bWJvbCgpLFxuXG5cdG9iamVjdFN0cmluZ1RhZzogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKC9hLykgYXMgc3RyaW5nLFxuXG5cdHVuaWNvZGVTZXQ6ICgoKSA9PiB7XG5cblx0XHRyZXR1cm4ge1xuXG5cdFx0XHR1bmljb2RlOiBmYWxzZSxcblx0XHRcdHNjcmlwdDogZmFsc2UsXG5cdFx0XHRibG9ja3M6IGZhbHNlLFxuXG5cdFx0XHQvL3VuaWNvZGVLZXlzOiBPYmplY3Qua2V5cyhVTklDT0RFX0FMTCksXG5cdFx0XHQvL3NjcmlwdEtleXM6IE9iamVjdC5rZXlzKFVOSUNPREVfU0NSSVBUU19BTEwpLFxuXG5cdFx0XHR1bmljb2RlVGVzdDogT2JqZWN0LmVudHJpZXModGVzdFVuaWNvZGVBbGwoKSlcblx0XHRcdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwgYilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmIChiWzFdICE9PSBudWxsKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFbYlswXV0gPSBiWzFdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0XHR9LCB7fSBhcyBQYXJ0aWFsPFJldHVyblR5cGU8dHlwZW9mIHRlc3RVbmljb2RlQWxsPj4pLFxuXG5cdFx0XHRzY3JpcHRUZXN0OiBPYmplY3QuZW50cmllcyh0ZXN0VW5pY29kZVNjcmlwdEFsbCgpKVxuXHRcdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChhLCBiKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKGJbMV0gIT09IG51bGwpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YVtiWzBdXSA9IGJbMV07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHRcdH0sIHt9IGFzIFBhcnRpYWw8UmV0dXJuVHlwZTx0eXBlb2YgdGVzdFVuaWNvZGVTY3JpcHRBbGw+PiksXG5cblx0XHRcdGJsb2Nrc1Rlc3Q6IE9iamVjdC5lbnRyaWVzKHRlc3RVbmljb2RlQmxvY2tzQWxsKCkpXG5cdFx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoYlsxXSAhPT0gbnVsbClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRhW2JbMF1dID0gYlsxXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdFx0fSwge30gYXMgUGFydGlhbDxSZXR1cm5UeXBlPHR5cGVvZiB0ZXN0VW5pY29kZUJsb2Nrc0FsbD4+KSxcblxuXHRcdH07XG5cblx0fSkoKSxcblxufTtcblxuX3N1cHBvcnQudW5pY29kZVNldC51bmljb2RlID0gT2JqZWN0LnZhbHVlcyhfc3VwcG9ydC51bmljb2RlU2V0LnVuaWNvZGVUZXN0KS5pbmNsdWRlcyh0cnVlKTtcbl9zdXBwb3J0LnVuaWNvZGVTZXQuc2NyaXB0ID0gT2JqZWN0LnZhbHVlcyhfc3VwcG9ydC51bmljb2RlU2V0LnNjcmlwdFRlc3QpLmluY2x1ZGVzKHRydWUpO1xuX3N1cHBvcnQudW5pY29kZVNldC5ibG9ja3MgPSBPYmplY3QudmFsdWVzKF9zdXBwb3J0LnVuaWNvZGVTZXQuYmxvY2tzVGVzdCkuaW5jbHVkZXModHJ1ZSk7XG5cbl9zdXBwb3J0Lm5hdGl2ZUZsYWdzID0gT2JqZWN0XG5cdC5rZXlzKF9zdXBwb3J0LmZsYWdzQWxsKVxuXHQucmVkdWNlKGZ1bmN0aW9uIChhLCBmKVxuXHR7XG5cdFx0aWYgKF9zdXBwb3J0LmZsYWdzQWxsW2ZdKVxuXHRcdHtcblx0XHRcdGEucHVzaChmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYTtcblx0fSwgW10gYXMgc3RyaW5nW10pXG5cdC5qb2luKCcnKVxuO1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydCA9IE9iamVjdC5mcmVlemUoX3N1cHBvcnQpO1xuXG5leHBvcnQgeyBGbGFnc05hbWUgfVxuZXhwb3J0IHsgaGFzU3VwcG9ydEZsYWcgfTtcbmV4cG9ydCB7IHRlc3RGbGFnIH07XG5leHBvcnQgeyB0ZXN0UGF0dGVybiB9O1xuXG5leHBvcnQgeyBJUmVnRXhwUHJvdG90eXBlLCBJUmVnRXhwU3RhdGljIH1cblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydFxuIl19