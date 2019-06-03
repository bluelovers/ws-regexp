"use strict";
/**
 * Created by user on 2018/4/27/027.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../../pattern");
/**
 * @link https://www.regular-expressions.info/posixbrackets.html
 */
var POXIX;
(function (POXIX) {
    POXIX["alnum"] = "alnum";
    POXIX["alpha"] = "alpha";
    POXIX["ascii"] = "ascii";
    POXIX["blank"] = "blank";
    POXIX["cntrl"] = "cntrl";
    POXIX["digit"] = "digit";
    POXIX["graph"] = "graph";
    POXIX["lower"] = "lower";
    POXIX["print"] = "print";
    POXIX["punct"] = "punct";
    POXIX["space"] = "space";
    POXIX["upper"] = "upper";
    POXIX["word"] = "word";
    POXIX["xdigit"] = "xdigit";
})(POXIX = exports.POXIX || (exports.POXIX = {}));
exports.PatternTest = {
    alnum: [
        ['^[:alnum:]+$', 'g', 'azAZ09', true, 'test'],
    ],
    alpha: [
        ['^[:alpha:]+$', 'g', 'azAZ', true, 'test'],
        ['^[:alpha:]+$', 'g', 'azAZ09', false, 'test'],
    ],
};
// @ts-ignore
function testPOXIX(name, RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    // @ts-ignore
    return pattern_1.testPattern(name, RegExpClass, testPatterns);
}
exports.testPOXIX = testPOXIX;
exports.default = POXIX;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3NpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBR0gsMkNBQTZFO0FBRTdFOztHQUVHO0FBQ0gsSUFBWSxLQWdCWDtBQWhCRCxXQUFZLEtBQUs7SUFFaEIsd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysc0JBQWEsQ0FBQTtJQUNiLDBCQUFpQixDQUFBO0FBQ2xCLENBQUMsRUFoQlcsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBZ0JoQjtBQUVZLFFBQUEsV0FBVyxHQUVwQjtJQUNILEtBQUssRUFBRTtRQUNOLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNOLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztRQUMzQyxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7S0FDOUM7Q0FDRCxDQUFDO0FBSUYsYUFBYTtBQUNiLFNBQWdCLFNBQVMsQ0FBSSxJQUFZLEVBQUUsY0FBb0MsTUFBTSxFQUFFLFlBQVksR0FBRyxtQkFBVztJQUVoSCxhQUFhO0lBQ2IsT0FBTyxxQkFBVyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUpELDhCQUlDO0FBRUQsa0JBQWUsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC80LzI3LzAyNy5cbiAqL1xuXG5pbXBvcnQgeyBJQ3JlYXRlUmVnRXhwLCBJVHlwZUNyZWF0ZVJlZ0V4cCB9IGZyb20gJy4uLy4uL2luZGV4JztcbmltcG9ydCB7IElQYXR0ZXJuVGVzdEZuLCBJUGF0dGVyblRlc3RSb3csIHRlc3RQYXR0ZXJuIH0gZnJvbSAnLi4vLi4vcGF0dGVybic7XG5cbi8qKlxuICogQGxpbmsgaHR0cHM6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL3Bvc2l4YnJhY2tldHMuaHRtbFxuICovXG5leHBvcnQgZW51bSBQT1hJWFxue1xuXHRhbG51bSA9ICdhbG51bScsXG5cdGFscGhhID0gJ2FscGhhJyxcblx0YXNjaWkgPSAnYXNjaWknLFxuXHRibGFuayA9ICdibGFuaycsXG5cdGNudHJsID0gJ2NudHJsJyxcblx0ZGlnaXQgPSAnZGlnaXQnLFxuXHRncmFwaCA9ICdncmFwaCcsXG5cdGxvd2VyID0gJ2xvd2VyJyxcblx0cHJpbnQgPSAncHJpbnQnLFxuXHRwdW5jdCA9ICdwdW5jdCcsXG5cdHNwYWNlID0gJ3NwYWNlJyxcblx0dXBwZXIgPSAndXBwZXInLFxuXHR3b3JkID0gJ3dvcmQnLFxuXHR4ZGlnaXQgPSAneGRpZ2l0Jyxcbn1cblxuZXhwb3J0IGNvbnN0IFBhdHRlcm5UZXN0OiB7XG5cdFtrIGluIGtleW9mIHR5cGVvZiBQT1hJWF0/OiBJUGF0dGVyblRlc3RSb3dbXVxufSA9IHtcblx0YWxudW06IFtcblx0XHRbJ15bOmFsbnVtOl0rJCcsICdnJywgJ2F6QVowOScsIHRydWUsICd0ZXN0J10sXG5cdF0sXG5cdGFscGhhOiBbXG5cdFx0WydeWzphbHBoYTpdKyQnLCAnZycsICdhekFaJywgdHJ1ZSwgJ3Rlc3QnXSxcblx0XHRbJ15bOmFscGhhOl0rJCcsICdnJywgJ2F6QVowOScsIGZhbHNlLCAndGVzdCddLFxuXHRdLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RQT1hJWChuYW1lOiBzdHJpbmcsIFJlZ0V4cENsYXNzPzogdHlwZW9mIFJlZ0V4cCwgdGVzdFBhdHRlcm4/OiB0eXBlb2YgUGF0dGVyblRlc3QpOiBib29sZWFuXG5leHBvcnQgZnVuY3Rpb24gdGVzdFBPWElYKG5hbWU6IHN0cmluZywgUmVnRXhwQ2xhc3M/OiBJQ3JlYXRlUmVnRXhwLCB0ZXN0UGF0dGVybj86IHR5cGVvZiBQYXR0ZXJuVGVzdCk6IGJvb2xlYW5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UE9YSVg8VD4obmFtZTogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4gPSBSZWdFeHAsIHRlc3RQYXR0ZXJucyA9IFBhdHRlcm5UZXN0KTogYm9vbGVhblxue1xuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiB0ZXN0UGF0dGVybihuYW1lLCBSZWdFeHBDbGFzcywgdGVzdFBhdHRlcm5zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUE9YSVg7XG4iXX0=