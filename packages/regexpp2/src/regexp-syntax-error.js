"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegExpSyntaxError extends SyntaxError {
    constructor(source, uFlag, index, message) {
        /*eslint-disable no-param-reassign */
        if (source) {
            if (source[0] !== "/") {
                source = `/${source}/${uFlag ? "u" : ""}`;
            }
            source = `: ${source}`;
        }
        /*eslint-enable no-param-reassign */
        super(`Invalid regular expression${source}: ${message}`);
        this.index = index;
    }
}
exports.RegExpSyntaxError = RegExpSyntaxError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhwLXN5bnRheC1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2V4cC1zeW50YXgtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLGlCQUFrQixTQUFRLFdBQVc7SUFFOUMsWUFDSSxNQUFjLEVBQ2QsS0FBYyxFQUNkLEtBQWEsRUFDYixPQUFlO1FBRWYscUNBQXFDO1FBQ3JDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNuQixNQUFNLEdBQUcsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFBO2FBQzVDO1lBQ0QsTUFBTSxHQUFHLEtBQUssTUFBTSxFQUFFLENBQUE7U0FDekI7UUFDRCxvQ0FBb0M7UUFFcEMsS0FBSyxDQUFDLDZCQUE2QixNQUFNLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUN0QixDQUFDO0NBQ0o7QUFwQkQsOENBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJlZ0V4cFN5bnRheEVycm9yIGV4dGVuZHMgU3ludGF4RXJyb3Ige1xuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBzb3VyY2U6IHN0cmluZyxcbiAgICAgICAgdUZsYWc6IGJvb2xlYW4sXG4gICAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlWzBdICE9PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGAvJHtzb3VyY2V9LyR7dUZsYWcgPyBcInVcIiA6IFwiXCJ9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gYDogJHtzb3VyY2V9YFxuICAgICAgICB9XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG4gICAgICAgIHN1cGVyKGBJbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbiR7c291cmNlfTogJHttZXNzYWdlfWApXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleFxuICAgIH1cbn1cbiJdfQ==