"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
const core_1 = require("./src/core");
function matchRange(...argv) {
    // @ts-ignore
    return core_1.matchRange(...argv);
}
matchRange.matchRange = matchRange;
matchRange.getOptions = core_1.getOptions;
matchRange.toRegExpString = core_1.toRegExpString;
matchRange.TABLE_RANGE = core_1.TABLE_RANGE;
matchRange.fillRange = core_1.fillRange;
matchRange.default = matchRange;
Object.defineProperty(matchRange, "__esModule", { value: true });
module.exports = matchRange;
//# sourceMappingURL=index.js.map