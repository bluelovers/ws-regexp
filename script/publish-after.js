"use strict";
/**
 * Created by user on 2018/7/24/024.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const PackageJson = require("../package.json");
const cross_spawn_extra_1 = require("cross-spawn-extra");
(async () => {
    const project_root = path.join(__dirname, '..');
    let gitroot;
    // @ts-ignore
    gitroot = await Promise.resolve().then(() => require('git-root2'));
    // @ts-ignore
    gitroot = gitroot(__dirname);
    if (!gitroot || path.relative(gitroot, project_root)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC1hZnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1Ymxpc2gtYWZ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILDZCQUE4QjtBQUM5QiwrQ0FBZ0Q7QUFDaEQseURBQXdEO0FBRXhELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFFWCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVoRCxJQUFJLE9BQWUsQ0FBQztJQUVwQixhQUFhO0lBQ2IsT0FBTyxHQUFHLDJDQUFhLFdBQVcsRUFBQyxDQUFDO0lBQ3BDLGFBQWE7SUFDYixPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTdCLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQ3BEO1FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QixPQUFPO0tBQ1A7SUFFRCxJQUFJLE9BQU8sR0FBRztRQUNiLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLEtBQUssRUFBRSxTQUFTO0tBQ2hCLENBQUM7SUFFRixJQUFJLEdBQUcsR0FBRyxlQUFlLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUUvQyxNQUFNLHlCQUFVLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLFFBQVE7UUFDUixJQUFJO1FBQ0osSUFBSTtRQUNKLEdBQUc7S0FDSCxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosTUFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUk7UUFFL0IsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0seUJBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSztRQUNMLElBQUk7UUFDSixXQUFXLENBQUMsT0FBTztRQUNuQixJQUFJO1FBQ0osR0FBRztLQUNILEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFYixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNy8yNC8wMjQuXG4gKi9cblxuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgUGFja2FnZUpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbmltcG9ydCB7IGFzeW5jIGFzIGNyb3NzU3Bhd24gfSBmcm9tICdjcm9zcy1zcGF3bi1leHRyYSc7XG5cbihhc3luYyAoKSA9Plxue1xuXHRjb25zdCBwcm9qZWN0X3Jvb3QgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nKTtcblxuXHRsZXQgZ2l0cm9vdDogc3RyaW5nO1xuXG5cdC8vIEB0cy1pZ25vcmVcblx0Z2l0cm9vdCA9IGF3YWl0IGltcG9ydCgnZ2l0LXJvb3QyJyk7XG5cdC8vIEB0cy1pZ25vcmVcblx0Z2l0cm9vdCA9IGdpdHJvb3QoX19kaXJuYW1lKTtcblxuXHRpZiAoIWdpdHJvb3QgfHwgcGF0aC5yZWxhdGl2ZShnaXRyb290LCBwcm9qZWN0X3Jvb3QpKVxuXHR7XG5cdFx0Y29uc29sZS53YXJuKGBubyBnaXQgZXhpc3RzYCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0Y3dkOiBwcm9qZWN0X3Jvb3QsXG5cdFx0c3RkaW86ICdpbmhlcml0Jyxcblx0fTtcblxuXHRsZXQgbXNnID0gYG5wbSBwdWJsaXNoICR7UGFja2FnZUpzb24udmVyc2lvbn1gO1xuXG5cdGF3YWl0IGNyb3NzU3Bhd24oJ2dpdCcsIFtcblx0XHQnY29tbWl0Jyxcblx0XHQnLWEnLFxuXHRcdCctbScsXG5cdFx0bXNnLFxuXHRdLCBvcHRpb25zKTtcblxuXHRhd2FpdCBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZG9uZSlcblx0e1xuXHRcdHNldFRpbWVvdXQoZG9uZSwgNTAwKTtcblx0fSk7XG5cblx0YXdhaXQgY3Jvc3NTcGF3bignZ2l0JywgW1xuXHRcdCd0YWcnLFxuXHRcdCctYScsXG5cdFx0UGFja2FnZUpzb24udmVyc2lvbixcblx0XHQnLW0nLFxuXHRcdG1zZyxcblx0XSwgb3B0aW9ucyk7XG5cbn0pKCkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiJdfQ==