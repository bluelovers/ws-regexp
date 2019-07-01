"use strict";
/**
 * Created by user on 2018/7/24/024.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const PackageJson = __importStar(require("../package.json"));
const cross_spawn_extra_1 = require("cross-spawn-extra");
const git_root2_1 = __importDefault(require("git-root2"));
(async () => {
    const project_root = path_1.default.join(__dirname, '..');
    let gitroot;
    // @ts-ignore
    gitroot = git_root2_1.default(__dirname);
    if (!gitroot || path_1.default.relative(gitroot, project_root)) {
        console.warn(`no git exists`);
        return;
    }
    let options = {
        cwd: project_root,
        stdio: 'inherit',
    };
    let msg = `npm publish ${PackageJson.version}`;
    await cross_spawn_extra_1.async('git', [
        'commit',
        '-a',
        '-m',
        msg,
    ], options);
    await new Promise(function (done) {
        setTimeout(done, 500);
    });
    await cross_spawn_extra_1.async('git', [
        'tag',
        '-a',
        PackageJson.version,
        '-m',
        msg,
    ], options);
})().catch(e => console.error(e));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC1hZnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1Ymxpc2gtYWZ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFFSCxnREFBd0I7QUFDeEIsNkRBQStDO0FBQy9DLHlEQUF3RDtBQUN4RCwwREFBZ0M7QUFFaEMsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUVYLE1BQU0sWUFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWhELElBQUksT0FBZSxDQUFDO0lBRXBCLGFBQWE7SUFDYixPQUFPLEdBQUcsbUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU3QixJQUFJLENBQUMsT0FBTyxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxFQUNwRDtRQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUIsT0FBTztLQUNQO0lBRUQsSUFBSSxPQUFPLEdBQUc7UUFDYixHQUFHLEVBQUUsWUFBWTtRQUNqQixLQUFLLEVBQUUsU0FBUztLQUNoQixDQUFDO0lBRUYsSUFBSSxHQUFHLEdBQUcsZUFBZSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFL0MsTUFBTSx5QkFBVSxDQUFDLEtBQUssRUFBRTtRQUN2QixRQUFRO1FBQ1IsSUFBSTtRQUNKLElBQUk7UUFDSixHQUFHO0tBQ0gsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVaLE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJO1FBRS9CLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLHlCQUFVLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUs7UUFDTCxJQUFJO1FBQ0osV0FBVyxDQUFDLE9BQU87UUFDbkIsSUFBSTtRQUNKLEdBQUc7S0FDSCxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRWIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzcvMjQvMDI0LlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgUGFja2FnZUpzb24gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IGFzeW5jIGFzIGNyb3NzU3Bhd24gfSBmcm9tICdjcm9zcy1zcGF3bi1leHRyYSc7XG5pbXBvcnQgZ2l0Um9vdCBmcm9tICdnaXQtcm9vdDInO1xuXG4oYXN5bmMgKCkgPT5cbntcblx0Y29uc3QgcHJvamVjdF9yb290ID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJyk7XG5cblx0bGV0IGdpdHJvb3Q6IHN0cmluZztcblxuXHQvLyBAdHMtaWdub3JlXG5cdGdpdHJvb3QgPSBnaXRSb290KF9fZGlybmFtZSk7XG5cblx0aWYgKCFnaXRyb290IHx8IHBhdGgucmVsYXRpdmUoZ2l0cm9vdCwgcHJvamVjdF9yb290KSlcblx0e1xuXHRcdGNvbnNvbGUud2Fybihgbm8gZ2l0IGV4aXN0c2ApO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGxldCBvcHRpb25zID0ge1xuXHRcdGN3ZDogcHJvamVjdF9yb290LFxuXHRcdHN0ZGlvOiAnaW5oZXJpdCcsXG5cdH07XG5cblx0bGV0IG1zZyA9IGBucG0gcHVibGlzaCAke1BhY2thZ2VKc29uLnZlcnNpb259YDtcblxuXHRhd2FpdCBjcm9zc1NwYXduKCdnaXQnLCBbXG5cdFx0J2NvbW1pdCcsXG5cdFx0Jy1hJyxcblx0XHQnLW0nLFxuXHRcdG1zZyxcblx0XSwgb3B0aW9ucyk7XG5cblx0YXdhaXQgbmV3IFByb21pc2UoZnVuY3Rpb24gKGRvbmUpXG5cdHtcblx0XHRzZXRUaW1lb3V0KGRvbmUsIDUwMCk7XG5cdH0pO1xuXG5cdGF3YWl0IGNyb3NzU3Bhd24oJ2dpdCcsIFtcblx0XHQndGFnJyxcblx0XHQnLWEnLFxuXHRcdFBhY2thZ2VKc29uLnZlcnNpb24sXG5cdFx0Jy1tJyxcblx0XHRtc2csXG5cdF0sIG9wdGlvbnMpO1xuXG59KSgpLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4iXX0=