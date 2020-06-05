"use strict";
/**
 * Created by user on 2019/5/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EnumTypeNode;
(function (EnumTypeNode) {
    /**
     * The root node.
     */
    EnumTypeNode["RegExpLiteral"] = "RegExpLiteral";
    /**
     * The pattern.
     */
    EnumTypeNode["Pattern"] = "Pattern";
    /**
     * The disjunction.
     * E.g. `a|b`
     */
    EnumTypeNode["Disjunction"] = "Disjunction";
    /**
     * The uncapturing group.
     * E.g. `(?:ab)`
     */
    EnumTypeNode["Group"] = "Group";
    /**
     * The capturing group.
     * E.g. `(ab)`, `(?<name>ab)`
     */
    EnumTypeNode["CapturingGroup"] = "CapturingGroup";
    /**
     * The lookaround assertion.
     */
    EnumTypeNode["LookaroundAssertion"] = "Assertion";
    /**
     * The lookahead assertion.
     * E.g. `(?=ab)`, `(?!ab)`
     */
    EnumTypeNode["LookaheadAssertion"] = "Assertion";
    /**
     * The lookbehind assertion.
     * E.g. `(?<=ab)`, `(?<!ab)`
     */
    EnumTypeNode["LookbehindAssertion"] = "Assertion";
    /**
     * The quantifier.
     * E.g. `a?`, `a*`, `a+`, `a{1,2}`, `a??`, `a*?`, `a+?`, `a{1,2}?`
     */
    EnumTypeNode["Quantifier"] = "Quantifier";
    /**
     * The character class.
     * E.g. `[ab]`, `[^ab]`
     */
    EnumTypeNode["CharacterClass"] = "CharacterClass";
    /**
     * The character class.
     * E.g. `[a-b]`
     */
    EnumTypeNode["CharacterClassRange"] = "CharacterClassRange";
    /**
     * The assertion.
     */
    EnumTypeNode["Assertion"] = "Assertion";
    /**
     * The boundary assertion.
     */
    EnumTypeNode["BoundaryAssertion"] = "Assertion";
    /**
     * The edge boundary assertion.
     * E.g. `^`, `$`
     */
    EnumTypeNode["EdgeAssertion"] = "Assertion";
    /**
     * The word bondary assertion.
     * E.g. `\b`, `\B`
     */
    EnumTypeNode["WordBoundaryAssertion"] = "Assertion";
    /**
     * The character set.
     */
    EnumTypeNode["CharacterSet"] = "CharacterSet";
    /**
     * The dot.
     * E.g. `.`
     */
    EnumTypeNode["AnyCharacterSet"] = "CharacterSet";
    /**
     * The character class escape.
     * E.g. `\d`, `\s`, `\w`, `\D`, `\S`, `\W`
     */
    EnumTypeNode["EscapeCharacterSet"] = "CharacterSet";
    /**
     * The unicode property escape.
     * E.g. `\p{ASCII}`, `\P{ASCII}`, `\p{Script=Hiragana}`
     */
    EnumTypeNode["UnicodePropertyCharacterSet"] = "CharacterSet";
    /**
     * The character.
     * This includes escape sequences which mean a character.
     * E.g. `a`, `あ`, `✿`, `\x65`, `\u0065`, `\u{65}`, `\/`
     */
    EnumTypeNode["Character"] = "Character";
    /**
     * The backreference.
     * E.g. `\1`, `\k<name>`
     */
    EnumTypeNode["Backreference"] = "Backreference";
    /**
     * The flags.
     */
    EnumTypeNode["Flags"] = "Flags";
})(EnumTypeNode = exports.EnumTypeNode || (exports.EnumTypeNode = {}));
var EnumKindAssertion;
(function (EnumKindAssertion) {
    EnumKindAssertion["LookaheadAssertion"] = "lookahead";
    EnumKindAssertion["LookbehindAssertion"] = "lookbehind";
    EnumKindAssertion["EdgeAssertion_Start"] = "start";
    EnumKindAssertion["EdgeAssertion_End"] = "end";
    EnumKindAssertion["WordBoundaryAssertion"] = "word";
})(EnumKindAssertion = exports.EnumKindAssertion || (exports.EnumKindAssertion = {}));
var EnumKindCharacterSet;
(function (EnumKindCharacterSet) {
    EnumKindCharacterSet["AnyCharacterSet"] = "any";
    EnumKindCharacterSet["EscapeCharacterSet_Digit"] = "digit";
    EnumKindCharacterSet["EscapeCharacterSet_Space"] = "space";
    EnumKindCharacterSet["EscapeCharacterSet_Word"] = "word";
    EnumKindCharacterSet["UnicodePropertyCharacterSet"] = "property";
})(EnumKindCharacterSet = exports.EnumKindCharacterSet || (exports.EnumKindCharacterSet = {}));
var EnumEcmaVersion;
(function (EnumEcmaVersion) {
    EnumEcmaVersion[EnumEcmaVersion["v5"] = 5] = "v5";
    EnumEcmaVersion[EnumEcmaVersion["v2015"] = 2015] = "v2015";
    EnumEcmaVersion[EnumEcmaVersion["v2016"] = 2016] = "v2016";
    EnumEcmaVersion[EnumEcmaVersion["v2017"] = 2017] = "v2017";
    EnumEcmaVersion[EnumEcmaVersion["v2018"] = 2018] = "v2018";
})(EnumEcmaVersion = exports.EnumEcmaVersion || (exports.EnumEcmaVersion = {}));
var EnumError;
(function (EnumError) {
    EnumError["UnknownError"] = "UnknownError";
    EnumError["AssertionError"] = "AssertionError";
})(EnumError = exports.EnumError || (exports.EnumError = {}));
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsSUFBa0IsWUEySGpCO0FBM0hELFdBQWtCLFlBQVk7SUFHN0I7O09BRUc7SUFDSCwrQ0FBK0IsQ0FBQTtJQUUvQjs7T0FFRztJQUNILG1DQUFtQixDQUFBO0lBRW5COzs7T0FHRztJQUNILDJDQUEyQixDQUFBO0lBQzNCOzs7T0FHRztJQUVILCtCQUFlLENBQUE7SUFFZjs7O09BR0c7SUFDSCxpREFBaUMsQ0FBQTtJQUVqQzs7T0FFRztJQUNILGlEQUFpQyxDQUFBO0lBRWpDOzs7T0FHRztJQUNILGdEQUFnQyxDQUFBO0lBQ2hDOzs7T0FHRztJQUNILGlEQUFpQyxDQUFBO0lBRWpDOzs7T0FHRztJQUNILHlDQUF5QixDQUFBO0lBQ3pCOzs7T0FHRztJQUNILGlEQUFpQyxDQUFBO0lBQ2pDOzs7T0FHRztJQUNILDJEQUEyQyxDQUFBO0lBRTNDOztPQUVHO0lBQ0gsdUNBQXVCLENBQUE7SUFFdkI7O09BRUc7SUFDSCwrQ0FBK0IsQ0FBQTtJQUUvQjs7O09BR0c7SUFDSCwyQ0FBMkIsQ0FBQTtJQUMzQjs7O09BR0c7SUFDSCxtREFBbUMsQ0FBQTtJQUVuQzs7T0FFRztJQUNILDZDQUE2QixDQUFBO0lBRTdCOzs7T0FHRztJQUNILGdEQUFnQyxDQUFBO0lBQ2hDOzs7T0FHRztJQUNILG1EQUFtQyxDQUFBO0lBQ25DOzs7T0FHRztJQUNILDREQUE0QyxDQUFBO0lBRTVDOzs7O09BSUc7SUFDSCx1Q0FBdUIsQ0FBQTtJQUV2Qjs7O09BR0c7SUFDSCwrQ0FBK0IsQ0FBQTtJQUUvQjs7T0FFRztJQUNILCtCQUFlLENBQUE7QUFFaEIsQ0FBQyxFQTNIaUIsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUEySDdCO0FBS0QsSUFBa0IsaUJBU2pCO0FBVEQsV0FBa0IsaUJBQWlCO0lBRWxDLHFEQUFnQyxDQUFBO0lBQ2hDLHVEQUFrQyxDQUFBO0lBRWxDLGtEQUE2QixDQUFBO0lBQzdCLDhDQUF5QixDQUFBO0lBRXpCLG1EQUE4QixDQUFBO0FBQy9CLENBQUMsRUFUaUIsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFTbEM7QUFJRCxJQUFrQixvQkFTakI7QUFURCxXQUFrQixvQkFBb0I7SUFFckMsK0NBQXVCLENBQUE7SUFFdkIsMERBQWtDLENBQUE7SUFDbEMsMERBQWtDLENBQUE7SUFDbEMsd0RBQWdDLENBQUE7SUFFaEMsZ0VBQXdDLENBQUE7QUFDekMsQ0FBQyxFQVRpQixvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQVNyQztBQUVELElBQWtCLGVBT2pCO0FBUEQsV0FBa0IsZUFBZTtJQUVoQyxpREFBTSxDQUFBO0lBQ04sMERBQVksQ0FBQTtJQUNaLDBEQUFZLENBQUE7SUFDWiwwREFBWSxDQUFBO0lBQ1osMERBQVksQ0FBQTtBQUNiLENBQUMsRUFQaUIsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFPaEM7QUFFRCxJQUFrQixTQUlqQjtBQUpELFdBQWtCLFNBQVM7SUFFMUIsMENBQTZCLENBQUE7SUFDN0IsOENBQWlDLENBQUE7QUFDbEMsQ0FBQyxFQUppQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUkxQjtBQUVELGtCQUFlLE9BQW1DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzUvOS5cbiAqL1xuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtVHlwZU5vZGVcbntcblxuXHQvKipcblx0ICogVGhlIHJvb3Qgbm9kZS5cblx0ICovXG5cdFJlZ0V4cExpdGVyYWwgPSBcIlJlZ0V4cExpdGVyYWxcIixcblxuXHQvKipcblx0ICogVGhlIHBhdHRlcm4uXG5cdCAqL1xuXHRQYXR0ZXJuID0gXCJQYXR0ZXJuXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBkaXNqdW5jdGlvbi5cblx0ICogRS5nLiBgYXxiYFxuXHQgKi9cblx0RGlzanVuY3Rpb24gPSBcIkRpc2p1bmN0aW9uXCIsXG5cdC8qKlxuXHQgKiBUaGUgdW5jYXB0dXJpbmcgZ3JvdXAuXG5cdCAqIEUuZy4gYCg/OmFiKWBcblx0ICovXG5cblx0R3JvdXAgPSBcIkdyb3VwXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBjYXB0dXJpbmcgZ3JvdXAuXG5cdCAqIEUuZy4gYChhYilgLCBgKD88bmFtZT5hYilgXG5cdCAqL1xuXHRDYXB0dXJpbmdHcm91cCA9IFwiQ2FwdHVyaW5nR3JvdXBcIixcblxuXHQvKipcblx0ICogVGhlIGxvb2thcm91bmQgYXNzZXJ0aW9uLlxuXHQgKi9cblx0TG9va2Fyb3VuZEFzc2VydGlvbiA9IFwiQXNzZXJ0aW9uXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBsb29rYWhlYWQgYXNzZXJ0aW9uLlxuXHQgKiBFLmcuIGAoPz1hYilgLCBgKD8hYWIpYFxuXHQgKi9cblx0TG9va2FoZWFkQXNzZXJ0aW9uID0gXCJBc3NlcnRpb25cIixcblx0LyoqXG5cdCAqIFRoZSBsb29rYmVoaW5kIGFzc2VydGlvbi5cblx0ICogRS5nLiBgKD88PWFiKWAsIGAoPzwhYWIpYFxuXHQgKi9cblx0TG9va2JlaGluZEFzc2VydGlvbiA9IFwiQXNzZXJ0aW9uXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBxdWFudGlmaWVyLlxuXHQgKiBFLmcuIGBhP2AsIGBhKmAsIGBhK2AsIGBhezEsMn1gLCBgYT8/YCwgYGEqP2AsIGBhKz9gLCBgYXsxLDJ9P2Bcblx0ICovXG5cdFF1YW50aWZpZXIgPSBcIlF1YW50aWZpZXJcIixcblx0LyoqXG5cdCAqIFRoZSBjaGFyYWN0ZXIgY2xhc3MuXG5cdCAqIEUuZy4gYFthYl1gLCBgW15hYl1gXG5cdCAqL1xuXHRDaGFyYWN0ZXJDbGFzcyA9IFwiQ2hhcmFjdGVyQ2xhc3NcIixcblx0LyoqXG5cdCAqIFRoZSBjaGFyYWN0ZXIgY2xhc3MuXG5cdCAqIEUuZy4gYFthLWJdYFxuXHQgKi9cblx0Q2hhcmFjdGVyQ2xhc3NSYW5nZSA9IFwiQ2hhcmFjdGVyQ2xhc3NSYW5nZVwiLFxuXG5cdC8qKlxuXHQgKiBUaGUgYXNzZXJ0aW9uLlxuXHQgKi9cblx0QXNzZXJ0aW9uID0gXCJBc3NlcnRpb25cIixcblxuXHQvKipcblx0ICogVGhlIGJvdW5kYXJ5IGFzc2VydGlvbi5cblx0ICovXG5cdEJvdW5kYXJ5QXNzZXJ0aW9uID0gXCJBc3NlcnRpb25cIixcblxuXHQvKipcblx0ICogVGhlIGVkZ2UgYm91bmRhcnkgYXNzZXJ0aW9uLlxuXHQgKiBFLmcuIGBeYCwgYCRgXG5cdCAqL1xuXHRFZGdlQXNzZXJ0aW9uID0gXCJBc3NlcnRpb25cIixcblx0LyoqXG5cdCAqIFRoZSB3b3JkIGJvbmRhcnkgYXNzZXJ0aW9uLlxuXHQgKiBFLmcuIGBcXGJgLCBgXFxCYFxuXHQgKi9cblx0V29yZEJvdW5kYXJ5QXNzZXJ0aW9uID0gXCJBc3NlcnRpb25cIixcblxuXHQvKipcblx0ICogVGhlIGNoYXJhY3RlciBzZXQuXG5cdCAqL1xuXHRDaGFyYWN0ZXJTZXQgPSBcIkNoYXJhY3RlclNldFwiLFxuXG5cdC8qKlxuXHQgKiBUaGUgZG90LlxuXHQgKiBFLmcuIGAuYFxuXHQgKi9cblx0QW55Q2hhcmFjdGVyU2V0ID0gXCJDaGFyYWN0ZXJTZXRcIixcblx0LyoqXG5cdCAqIFRoZSBjaGFyYWN0ZXIgY2xhc3MgZXNjYXBlLlxuXHQgKiBFLmcuIGBcXGRgLCBgXFxzYCwgYFxcd2AsIGBcXERgLCBgXFxTYCwgYFxcV2Bcblx0ICovXG5cdEVzY2FwZUNoYXJhY3RlclNldCA9IFwiQ2hhcmFjdGVyU2V0XCIsXG5cdC8qKlxuXHQgKiBUaGUgdW5pY29kZSBwcm9wZXJ0eSBlc2NhcGUuXG5cdCAqIEUuZy4gYFxccHtBU0NJSX1gLCBgXFxQe0FTQ0lJfWAsIGBcXHB7U2NyaXB0PUhpcmFnYW5hfWBcblx0ICovXG5cdFVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldCA9IFwiQ2hhcmFjdGVyU2V0XCIsXG5cblx0LyoqXG5cdCAqIFRoZSBjaGFyYWN0ZXIuXG5cdCAqIFRoaXMgaW5jbHVkZXMgZXNjYXBlIHNlcXVlbmNlcyB3aGljaCBtZWFuIGEgY2hhcmFjdGVyLlxuXHQgKiBFLmcuIGBhYCwgYOOBgmAsIGDinL9gLCBgXFx4NjVgLCBgXFx1MDA2NWAsIGBcXHV7NjV9YCwgYFxcL2Bcblx0ICovXG5cdENoYXJhY3RlciA9IFwiQ2hhcmFjdGVyXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBiYWNrcmVmZXJlbmNlLlxuXHQgKiBFLmcuIGBcXDFgLCBgXFxrPG5hbWU+YFxuXHQgKi9cblx0QmFja3JlZmVyZW5jZSA9IFwiQmFja3JlZmVyZW5jZVwiLFxuXG5cdC8qKlxuXHQgKiBUaGUgZmxhZ3MuXG5cdCAqL1xuXHRGbGFncyA9IFwiRmxhZ3NcIixcblxufVxuXG5leHBvcnQgdHlwZSBFbnVtS2luZExvb2tBc3NlcnRpb24gPSBFbnVtS2luZEFzc2VydGlvbi5Mb29rYWhlYWRBc3NlcnRpb24gfCBFbnVtS2luZEFzc2VydGlvbi5Mb29rYmVoaW5kQXNzZXJ0aW9uO1xuZXhwb3J0IHR5cGUgRW51bUtpbmRFZGdlQXNzZXJ0aW9uID0gRW51bUtpbmRBc3NlcnRpb24uRWRnZUFzc2VydGlvbl9TdGFydCB8IEVudW1LaW5kQXNzZXJ0aW9uLkVkZ2VBc3NlcnRpb25fRW5kO1xuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtS2luZEFzc2VydGlvblxue1xuXHRMb29rYWhlYWRBc3NlcnRpb24gPSBcImxvb2thaGVhZFwiLFxuXHRMb29rYmVoaW5kQXNzZXJ0aW9uID0gXCJsb29rYmVoaW5kXCIsXG5cblx0RWRnZUFzc2VydGlvbl9TdGFydCA9IFwic3RhcnRcIixcblx0RWRnZUFzc2VydGlvbl9FbmQgPSBcImVuZFwiLFxuXG5cdFdvcmRCb3VuZGFyeUFzc2VydGlvbiA9IFwid29yZFwiXG59XG5cbmV4cG9ydCB0eXBlIEVudW1LaW5kRXNjYXBlQ2hhcmFjdGVyU2V0ID0gRW51bUtpbmRDaGFyYWN0ZXJTZXQuRXNjYXBlQ2hhcmFjdGVyU2V0X0RpZ2l0IHwgRW51bUtpbmRDaGFyYWN0ZXJTZXQuRXNjYXBlQ2hhcmFjdGVyU2V0X1NwYWNlIHwgRW51bUtpbmRDaGFyYWN0ZXJTZXQuRXNjYXBlQ2hhcmFjdGVyU2V0X1dvcmQ7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEVudW1LaW5kQ2hhcmFjdGVyU2V0XG57XG5cdEFueUNoYXJhY3RlclNldCA9IFwiYW55XCIsXG5cblx0RXNjYXBlQ2hhcmFjdGVyU2V0X0RpZ2l0ID0gXCJkaWdpdFwiLFxuXHRFc2NhcGVDaGFyYWN0ZXJTZXRfU3BhY2UgPSBcInNwYWNlXCIsXG5cdEVzY2FwZUNoYXJhY3RlclNldF9Xb3JkID0gXCJ3b3JkXCIsXG5cblx0VW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0ID0gXCJwcm9wZXJ0eVwiLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtRWNtYVZlcnNpb25cbntcblx0djUgPSA1LFxuXHR2MjAxNSA9IDIwMTUsXG5cdHYyMDE2ID0gMjAxNixcblx0djIwMTcgPSAyMDE3LFxuXHR2MjAxOCA9IDIwMTgsXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEVudW1FcnJvclxue1xuXHRVbmtub3duRXJyb3IgPSBcIlVua25vd25FcnJvclwiLFxuXHRBc3NlcnRpb25FcnJvciA9IFwiQXNzZXJ0aW9uRXJyb3JcIixcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2NvbnN0Jyk7XG4iXX0=