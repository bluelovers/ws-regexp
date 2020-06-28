"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var FlagsName;
(function (FlagsName) {
    FlagsName["multiline"] = "m";
    FlagsName["m"] = "m";
    FlagsName["global"] = "g";
    FlagsName["g"] = "g";
    FlagsName["ignoreCase"] = "i";
    FlagsName["i"] = "i";
    // ---------------
    FlagsName["sticky"] = "y";
    FlagsName["y"] = "y";
    FlagsName["unicode"] = "u";
    FlagsName["u"] = "u";
    // ---------------
    /**
     * dot match all mode
     * node.js 10
     *
     * @link http://2ality.com/2017/07/regexp-dotall-flag.html
     * @code
     * /^.$/.test('\n') // => false
     * /^.$/s.test('\n') // => true
     * /^[^]$/.test('\n') // => true
     *
     * @type {string}
     */
    FlagsName["dotAll"] = "s";
    FlagsName["s"] = "s";
    // ---------------
    FlagsName["freeSpacing"] = "x";
    FlagsName["x"] = "x";
    FlagsName["n"] = "n";
})(FlagsName = exports.FlagsName || (exports.FlagsName = {}));
Object
    .keys(FlagsName)
    .forEach(function (v) {
    // @ts-ignore
    FlagsName[FlagsName[v]] = FlagsName[v];
});
exports.FlagsPattern = {
    s: [
        ['^.$', '\n', true],
    ],
};
exports.default = FlagsName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBSUgsSUFBWSxTQTJDWDtBQTNDRCxXQUFZLFNBQVM7SUFFcEIsNEJBQWUsQ0FBQTtJQUNmLG9CQUFPLENBQUE7SUFFUCx5QkFBWSxDQUFBO0lBQ1osb0JBQU8sQ0FBQTtJQUVQLDZCQUFnQixDQUFBO0lBQ2hCLG9CQUFPLENBQUE7SUFFUCxrQkFBa0I7SUFFbEIseUJBQVksQ0FBQTtJQUNaLG9CQUFPLENBQUE7SUFFUCwwQkFBYSxDQUFBO0lBQ2Isb0JBQU8sQ0FBQTtJQUVQLGtCQUFrQjtJQUVsQjs7Ozs7Ozs7Ozs7T0FXRztJQUNILHlCQUFZLENBQUE7SUFDWixvQkFBTyxDQUFBO0lBRVAsa0JBQWtCO0lBRWxCLDhCQUFpQixDQUFBO0lBQ2pCLG9CQUFPLENBQUE7SUFFUCxvQkFBTyxDQUFBO0FBRVIsQ0FBQyxFQTNDVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQTJDcEI7QUFFRCxNQUFNO0tBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNmLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFFbkIsYUFBYTtJQUNiLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQ0Y7QUFFWSxRQUFBLFlBQVksR0FPckI7SUFDSCxDQUFDLEVBQUU7UUFDRixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQ25CO0NBQ0QsQ0FBQztBQU9GLGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNC8yNi8wMjYuXG4gKi9cblxuaW1wb3J0IHsgSUNyZWF0ZVJlZ0V4cCwgSVR5cGVDcmVhdGVSZWdFeHAgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGVudW0gRmxhZ3NOYW1lXG57XG5cdG11bHRpbGluZSA9ICdtJyxcblx0bSA9ICdtJyxcblxuXHRnbG9iYWwgPSAnZycsXG5cdGcgPSAnZycsXG5cblx0aWdub3JlQ2FzZSA9ICdpJyxcblx0aSA9ICdpJyxcblxuXHQvLyAtLS0tLS0tLS0tLS0tLS1cblxuXHRzdGlja3kgPSAneScsXG5cdHkgPSAneScsXG5cblx0dW5pY29kZSA9ICd1Jyxcblx0dSA9ICd1JyxcblxuXHQvLyAtLS0tLS0tLS0tLS0tLS1cblxuXHQvKipcblx0ICogZG90IG1hdGNoIGFsbCBtb2RlXG5cdCAqIG5vZGUuanMgMTBcblx0ICpcblx0ICogQGxpbmsgaHR0cDovLzJhbGl0eS5jb20vMjAxNy8wNy9yZWdleHAtZG90YWxsLWZsYWcuaHRtbFxuXHQgKiBAY29kZVxuXHQgKiAvXi4kLy50ZXN0KCdcXG4nKSAvLyA9PiBmYWxzZVxuXHQgKiAvXi4kL3MudGVzdCgnXFxuJykgLy8gPT4gdHJ1ZVxuXHQgKiAvXlteXSQvLnRlc3QoJ1xcbicpIC8vID0+IHRydWVcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRvdEFsbCA9ICdzJyxcblx0cyA9ICdzJyxcblxuXHQvLyAtLS0tLS0tLS0tLS0tLS1cblxuXHRmcmVlU3BhY2luZyA9ICd4Jyxcblx0eCA9ICd4JyxcblxuXHRuID0gJ24nLFxuXG59XG5cbk9iamVjdFxuXHQua2V5cyhGbGFnc05hbWUpXG5cdC5mb3JFYWNoKGZ1bmN0aW9uICh2KVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdEZsYWdzTmFtZVtGbGFnc05hbWVbdl1dID0gRmxhZ3NOYW1lW3ZdO1xuXHR9KVxuO1xuXG5leHBvcnQgY29uc3QgRmxhZ3NQYXR0ZXJuOiB7XG5cdFtrIGluIGtleW9mIHR5cGVvZiBGbGFnc05hbWVdPzoge1xuXHRcdDA6IHN0cmluZyxcblx0XHQxOiBzdHJpbmcsXG5cdFx0MjogYm9vbGVhbiB8IGFueSxcblx0XHQzPzogc3RyaW5nIHwgSUZsYWdzUGF0dGVyblRlc3RGbixcblx0fVtdXG59ID0ge1xuXHRzOiBbXG5cdFx0WydeLiQnLCAnXFxuJywgdHJ1ZV0sXG5cdF0sXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElGbGFnc1BhdHRlcm5UZXN0Rm5cbntcblx0PFQ+KHI6IFJlZ0V4cCwgdmFsdWU6IGFueSwgaW5wdXQ6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBSZWdFeHBDbGFzczogSVR5cGVDcmVhdGVSZWdFeHA8VD4sIGZsYWc6IHN0cmluZyk6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsYWdzTmFtZTtcbiJdfQ==