"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubtreePush = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/5/13.
 */
const cross_spawn_extra_1 = (0, tslib_1.__importDefault)(require("cross-spawn-extra"));
const logger_1 = (0, tslib_1.__importDefault)(require("debug-color2/logger"));
const __root_ws_1 = (0, tslib_1.__importDefault)(require("../../__root_ws"));
const fs_extra_1 = require("fs-extra");
const create_cache_name_1 = (0, tslib_1.__importDefault)(require("./create-cache-name"));
async function gitSubtreePush(module_name) {
    let remote;
    let prefix;
    switch (module_name) {
        /*
        case 'regexp-cjk':
            remote = 'regexp-cjk';
            prefix = `packages/${module_name}`
            break;
         */
        case 'cjk-conv':
            remote = module_name;
            prefix = `packages/${module_name}`;
            break;
        case 'regexpp2':
            remote = `https://github.com/bluelovers/regexpp.git`;
            prefix = `packages/${module_name}`;
            break;
        case 'regexp-support':
            remote = `https://github.com/bluelovers/regexp-support`;
            prefix = `packages/${module_name}`;
            break;
    }
    if (remote && prefix) {
        await cross_spawn_extra_1.default.async('git', [
            'subtree',
            'push',
            remote,
            'master',
            '--prefix',
            prefix,
        ], {
            cwd: __root_ws_1.default,
            stdio: 'inherit',
        });
    }
    let file = (0, create_cache_name_1.default)('subtree', module_name);
    if ((0, fs_extra_1.pathExistsSync)(file)) {
        logger_1.default.debug(`[subtree:script]`, `del`, module_name);
        (0, fs_extra_1.unlinkSync)(file);
    }
}
exports.gitSubtreePush = gitSubtreePush;
//# sourceMappingURL=git-subtree-push.js.map