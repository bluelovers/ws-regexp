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
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3NpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBR0gsMkNBQTZFO0FBRTdFOztHQUVHO0FBQ0gsSUFBWSxLQWdCWDtBQWhCRCxXQUFZLEtBQUs7SUFFaEIsd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7SUFDZix3QkFBZSxDQUFBO0lBQ2Ysc0JBQWEsQ0FBQTtJQUNiLDBCQUFpQixDQUFBO0FBQ2xCLENBQUMsRUFoQlcsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBZ0JoQjtBQUVZLFFBQUEsV0FBVyxHQUVwQjtJQUNILEtBQUssRUFBRTtRQUNOLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNOLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztRQUMzQyxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7S0FDOUM7Q0FDRCxDQUFDO0FBSUYsYUFBYTtBQUNiLFNBQWdCLFNBQVMsQ0FBSSxJQUFZLEVBQUUsY0FBb0MsTUFBTSxFQUFFLFlBQVksR0FBRyxtQkFBVztJQUVoSCxhQUFhO0lBQ2IsT0FBTyxxQkFBVyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUpELDhCQUlDO0FBRUQsa0JBQWUsT0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNC8yNy8wMjcuXG4gKi9cblxuaW1wb3J0IHsgSUNyZWF0ZVJlZ0V4cCwgSVR5cGVDcmVhdGVSZWdFeHAgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQgeyBJUGF0dGVyblRlc3RGbiwgSVBhdHRlcm5UZXN0Um93LCB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3BhdHRlcm4nO1xuXG4vKipcbiAqIEBsaW5rIGh0dHBzOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9wb3NpeGJyYWNrZXRzLmh0bWxcbiAqL1xuZXhwb3J0IGVudW0gUE9YSVhcbntcblx0YWxudW0gPSAnYWxudW0nLFxuXHRhbHBoYSA9ICdhbHBoYScsXG5cdGFzY2lpID0gJ2FzY2lpJyxcblx0YmxhbmsgPSAnYmxhbmsnLFxuXHRjbnRybCA9ICdjbnRybCcsXG5cdGRpZ2l0ID0gJ2RpZ2l0Jyxcblx0Z3JhcGggPSAnZ3JhcGgnLFxuXHRsb3dlciA9ICdsb3dlcicsXG5cdHByaW50ID0gJ3ByaW50Jyxcblx0cHVuY3QgPSAncHVuY3QnLFxuXHRzcGFjZSA9ICdzcGFjZScsXG5cdHVwcGVyID0gJ3VwcGVyJyxcblx0d29yZCA9ICd3b3JkJyxcblx0eGRpZ2l0ID0gJ3hkaWdpdCcsXG59XG5cbmV4cG9ydCBjb25zdCBQYXR0ZXJuVGVzdDoge1xuXHRbayBpbiBrZXlvZiB0eXBlb2YgUE9YSVhdPzogSVBhdHRlcm5UZXN0Um93W11cbn0gPSB7XG5cdGFsbnVtOiBbXG5cdFx0WydeWzphbG51bTpdKyQnLCAnZycsICdhekFaMDknLCB0cnVlLCAndGVzdCddLFxuXHRdLFxuXHRhbHBoYTogW1xuXHRcdFsnXls6YWxwaGE6XSskJywgJ2cnLCAnYXpBWicsIHRydWUsICd0ZXN0J10sXG5cdFx0WydeWzphbHBoYTpdKyQnLCAnZycsICdhekFaMDknLCBmYWxzZSwgJ3Rlc3QnXSxcblx0XSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UE9YSVgobmFtZTogc3RyaW5nLCBSZWdFeHBDbGFzcz86IHR5cGVvZiBSZWdFeHAsIHRlc3RQYXR0ZXJuPzogdHlwZW9mIFBhdHRlcm5UZXN0KTogYm9vbGVhblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RQT1hJWChuYW1lOiBzdHJpbmcsIFJlZ0V4cENsYXNzPzogSUNyZWF0ZVJlZ0V4cCwgdGVzdFBhdHRlcm4/OiB0eXBlb2YgUGF0dGVyblRlc3QpOiBib29sZWFuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gdGVzdFBPWElYPFQ+KG5hbWU6IHN0cmluZywgUmVnRXhwQ2xhc3M6IElUeXBlQ3JlYXRlUmVnRXhwPFQ+ID0gUmVnRXhwLCB0ZXN0UGF0dGVybnMgPSBQYXR0ZXJuVGVzdCk6IGJvb2xlYW5cbntcblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gdGVzdFBhdHRlcm4obmFtZSwgUmVnRXhwQ2xhc3MsIHRlc3RQYXR0ZXJucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9wb3NpeCcpO1xuIl19