"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @link https://www.regular-expressions.info/posixbrackets.html
 */
var JAVA;
(function (JAVA) {
    JAVA["alnum"] = "Alnum";
    JAVA["alpha"] = "Alpha";
    JAVA["ascii"] = "ASCII";
    JAVA["blank"] = "Blank";
    JAVA["cntrl"] = "Cntrl";
    JAVA["digit"] = "Digit";
    JAVA["graph"] = "Graph";
    JAVA["lower"] = "Lower";
    JAVA["print"] = "Print";
    JAVA["punct"] = "Punct";
    JAVA["space"] = "Space";
    JAVA["upper"] = "Upper";
    //word = 'word',
    JAVA["xdigit"] = "XDigit";
})(JAVA = exports.JAVA || (exports.JAVA = {}));
exports.default = JAVA;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImphdmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUtIOztHQUVHO0FBQ0gsSUFBWSxJQWdCWDtBQWhCRCxXQUFZLElBQUk7SUFFZix1QkFBZSxDQUFBO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7SUFDZix1QkFBZSxDQUFBO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7SUFDZix1QkFBZSxDQUFBO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7SUFDZix1QkFBZSxDQUFBO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7SUFDZixnQkFBZ0I7SUFDaEIseUJBQWlCLENBQUE7QUFDbEIsQ0FBQyxFQWhCVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFnQmY7QUFFRCxrQkFBZSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvNi8wMDYuXG4gKi9cblxuaW1wb3J0IHsgSUNyZWF0ZVJlZ0V4cCwgSVR5cGVDcmVhdGVSZWdFeHAgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQgeyBJUGF0dGVyblRlc3RGbiwgSVBhdHRlcm5UZXN0Um93LCB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3BhdHRlcm4nO1xuXG4vKipcbiAqIEBsaW5rIGh0dHBzOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9wb3NpeGJyYWNrZXRzLmh0bWxcbiAqL1xuZXhwb3J0IGVudW0gSkFWQVxue1xuXHRhbG51bSA9ICdBbG51bScsXG5cdGFscGhhID0gJ0FscGhhJyxcblx0YXNjaWkgPSAnQVNDSUknLFxuXHRibGFuayA9ICdCbGFuaycsXG5cdGNudHJsID0gJ0NudHJsJyxcblx0ZGlnaXQgPSAnRGlnaXQnLFxuXHRncmFwaCA9ICdHcmFwaCcsXG5cdGxvd2VyID0gJ0xvd2VyJyxcblx0cHJpbnQgPSAnUHJpbnQnLFxuXHRwdW5jdCA9ICdQdW5jdCcsXG5cdHNwYWNlID0gJ1NwYWNlJyxcblx0dXBwZXIgPSAnVXBwZXInLFxuXHQvL3dvcmQgPSAnd29yZCcsXG5cdHhkaWdpdCA9ICdYRGlnaXQnLFxufVxuXG5leHBvcnQgZGVmYXVsdCBKQVZBO1xuIl19