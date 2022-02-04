"use strict";
/**
 * Created by user on 2018/7/24/024.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const PackageJson = tslib_1.__importStar(require("../package.json"));
// @ts-ignore
const cross_spawn_extra_1 = require("cross-spawn-extra");
// @ts-ignore
const core_1 = tslib_1.__importDefault(require("git-root2/core"));
(async () => {
    const project_root = path_1.default.join(__dirname, '..');
    let gitroot;
    // @ts-ignore
    gitroot = (0, core_1.default)(__dirname);
    if (!gitroot || path_1.default.relative(gitroot, project_root)) {
        console.warn(`no git exists`);
        return;
    }
    let options = {
        cwd: project_root,
        stdio: 'inherit',
    };
    let msg = `npm publish ${PackageJson.version}`;
    await (0, cross_spawn_extra_1.async)('git', [
        'commit',
        '-a',
        '-m',
        msg,
    ], options);
    await new Promise(function (done) {
        setTimeout(done, 500);
    });
    await (0, cross_spawn_extra_1.async)('git', [
        'tag',
        '-a',
        PackageJson.version,
        '-m',
        msg,
    ], options);
})().catch(e => console.error(e));
//# sourceMappingURL=publish-after.js.map