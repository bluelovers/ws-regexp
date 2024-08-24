"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.astOldRaw = astOldRaw;
exports.astNotChanged = astNotChanged;
function astOldRaw(ast) {
    if (ast.old_raw == null) {
        ast.old_raw = ast.raw;
    }
    return ast.old_raw;
}
function astNotChanged(ast, notStrict) {
    astOldRaw(ast);
    if (notStrict) {
        return ast.old_raw === ast.raw;
    }
    return !ast.changed && ast.old_raw === ast.raw;
}
//# sourceMappingURL=plugin.js.map