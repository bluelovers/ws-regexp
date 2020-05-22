"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.astNotChanged = exports.astOldRaw = void 0;
function astOldRaw(ast) {
    if (ast.old_raw == null) {
        ast.old_raw = ast.raw;
    }
    return ast.old_raw;
}
exports.astOldRaw = astOldRaw;
function astNotChanged(ast, notStrict) {
    astOldRaw(ast);
    if (notStrict) {
        return ast.old_raw === ast.raw;
    }
    return !ast.changed && ast.old_raw === ast.raw;
}
exports.astNotChanged = astNotChanged;
//# sourceMappingURL=plugin.js.map