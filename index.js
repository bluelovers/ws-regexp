"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/3/2.
 */
const min_1 = require("cjk-conv/lib/zh/convert/min");
const convert_1 = require("cjk-conv/lib/zh/convert");
const FastGlob = require("fast-glob");
const fs = require("fs-extra");
const Bluebird = require("bluebird");
const JsDiff = require("diff");
const debug_color2_1 = require("debug-color2");
const crlf_normalize_1 = require("crlf-normalize");
exports.FnList = {
    cn2tw_min: min_1.cn2tw_min, tw2cn_min: min_1.tw2cn_min,
    cn2tw: convert_1.cn2tw, tw2cn: convert_1.tw2cn,
};
function handldTarget(search, options) {
    return Bluebird.resolve().then(() => {
        if (typeof search === 'string') {
            search = [search];
        }
        let _is_arr = Array.isArray(search);
        if (_is_arr) {
            search = search.filter(v => typeof v === 'string' && v.length);
        }
        if (!_is_arr || !search.length) {
            throw new Error(`search is empty or not allow`);
        }
        options = handleOptions(options);
        let idx = 0;
        return Bluebird.resolve(FastGlob.async(search, {
            cwd: options.cwd,
            absolute: true,
        }))
            .tap(function (ls) {
            debug_color2_1.console.debug(`[info] found ${ls.length} files`);
        })
            .map(async function (file, index, arrayLength) {
            let label = `${idx + 1}/${index + 1}/${arrayLength}`;
            debug_color2_1.console.debug(`[start] (${label}) ${file}`);
            let txt_old = String(await fs.readFile(file));
            let txt_new = handleContext(txt_old, options);
            if (options.createPatch) {
                let data = JsDiff.createPatch(crlf_normalize_1.crlf(txt_old), crlf_normalize_1.crlf(txt_new), {
                    newlineIsToken: true,
                });
                await fs.outputFile(file + '.patch', data);
            }
            if (txt_old != txt_new) {
                if (options.createBackup) {
                    await fs.move(file, file + '.old', {
                        // @ts-ignore
                        preserveTimestamps: true,
                        overwrite: false,
                    });
                }
                await fs.writeFile(file, txt_new);
            }
            debug_color2_1.console.debug(`[done] (${label}) ${file}`);
            return file;
        })
            .tap(function (ls) {
            if (ls.length) {
                debug_color2_1.console.success(`[end] done ${ls.length} files`);
            }
            else {
                debug_color2_1.console.fail(`[end] done ${ls.length} files`);
            }
        });
    });
}
exports.handldTarget = handldTarget;
function handleOptions(options) {
    options = options || {};
    options.tw2cn = !!options.tw2cn;
    options.notMin = !!options.notMin;
    options.unSafe = !!options.unSafe;
    options.createBackup = !!options.createBackup;
    options.createPatch = !!options.createPatch;
    options.cwd = options.cwd || process.cwd();
    return options;
}
exports.handleOptions = handleOptions;
function handleContext(text, options) {
    let fn = (options.tw2cn ? 'tw2cn' : 'cn2tw')
        + (options.notMin ? '' : '_min');
    let opts = {};
    if (options.unSafe) {
        opts.safe = false;
    }
    return exports.FnList[fn](text, opts);
}
exports.handleContext = handleContext;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gscURBQW1FO0FBQ25FLHFEQUFpRjtBQUVqRixzQ0FBdUM7QUFDdkMsK0JBQWdDO0FBQ2hDLHFDQUFzQztBQUN0QywrQkFBZ0M7QUFDaEMsK0NBQXVDO0FBQ3ZDLG1EQUFzQztBQUV6QixRQUFBLE1BQU0sR0FBRztJQUNyQixTQUFTLEVBQVQsZUFBUyxFQUFFLFNBQVMsRUFBVCxlQUFTO0lBQ3BCLEtBQUssRUFBTCxlQUFLLEVBQUUsS0FBSyxFQUFMLGVBQUs7Q0FDWixDQUFDO0FBaUJGLFNBQWdCLFlBQVksQ0FBQyxNQUF5QixFQUFFLE9BQWtCO0lBRXpFLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQzlCO1lBQ0MsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBDLElBQUksT0FBTyxFQUNYO1lBQ0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQzlEO1FBRUQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQzlCO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FB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QUFDO0FBQ2hCLENBQUM7QUFiRCxzQ0FhQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsT0FBcUI7SUFFaEUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztVQUMxQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQy9CO0lBRUQsSUFBSSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztJQUU1QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQ2xCO1FBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDbEI7SUFFRCxPQUFPLGNBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQWRELHNDQWNDO0FBRUQsa0JBQWUsT0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMy8yLlxuICovXG5pbXBvcnQgeyBjbjJ0d19taW4sIHR3MmNuX21pbiB9IGZyb20gJ2Nqay1jb252L2xpYi96aC9jb252ZXJ0L21pbic7XG5pbXBvcnQgeyBjbjJ0dywgdHcyY24sIElPcHRpb25zIGFzIElPcHRpb25zQ29yZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC9jb252ZXJ0JztcblxuaW1wb3J0IEZhc3RHbG9iID0gcmVxdWlyZSgnZmFzdC1nbG9iJyk7XG5pbXBvcnQgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuaW1wb3J0IEJsdWViaXJkID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmltcG9ydCBKc0RpZmYgPSByZXF1aXJlKCdkaWZmJyk7XG5pbXBvcnQgeyBjb25zb2xlIH0gZnJvbSAnZGVidWctY29sb3IyJztcbmltcG9ydCB7IGNybGYgfSBmcm9tICdjcmxmLW5vcm1hbGl6ZSc7XG5cbmV4cG9ydCBjb25zdCBGbkxpc3QgPSB7XG5cdGNuMnR3X21pbiwgdHcyY25fbWluLFxuXHRjbjJ0dywgdHcyY24sXG59O1xuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0NvbnYgPSB7XG5cdGN3ZD86IHN0cmluZyxcblxuXHR0dzJjbj86IGJvb2xlYW4sXG5cdG5vdE1pbj86IGJvb2xlYW4sXG5cdHVuU2FmZT86IGJvb2xlYW4sXG5cblx0Y3JlYXRlQmFja3VwPzogYm9vbGVhbixcblx0Y3JlYXRlUGF0Y2g/OiBib29sZWFuLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9ucyA9IEZhc3RHbG9iLk9wdGlvbnM8c3RyaW5nPiAmIElPcHRpb25zQ29udiAmIHtcblx0ZGVlcD86IGJvb2xlYW4gfCBudW1iZXIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGRUYXJnZXQoc2VhcmNoOiBzdHJpbmcgfCBzdHJpbmdbXSwgb3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdGlmICh0eXBlb2Ygc2VhcmNoID09PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRzZWFyY2ggPSBbc2VhcmNoXTtcblx0XHR9XG5cblx0XHRsZXQgX2lzX2FyciA9IEFycmF5LmlzQXJyYXkoc2VhcmNoKTtcblxuXHRcdGlmIChfaXNfYXJyKVxuXHRcdHtcblx0XHRcdHNlYXJjaCA9IHNlYXJjaC5maWx0ZXIodiA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi5sZW5ndGgpXG5cdFx0fVxuXG5cdFx0aWYgKCFfaXNfYXJyIHx8ICFzZWFyY2gubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgc2VhcmNoIGlzIGVtcHR5IG9yIG5vdCBhbGxvd2ApO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMgPSBoYW5kbGVPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShGYXN0R2xvYi5hc3luYzxzdHJpbmc+KHNlYXJjaCwge1xuXHRcdFx0XHRjd2Q6IG9wdGlvbnMuY3dkLFxuXHRcdFx0XHRhYnNvbHV0ZTogdHJ1ZSxcblx0XHRcdH0pKVxuXHRcdFx0LnRhcChmdW5jdGlvbiAobHMpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoYFtpbmZvXSBmb3VuZCAke2xzLmxlbmd0aH0gZmlsZXNgKTtcblx0XHRcdH0pXG5cdFx0XHQubWFwKGFzeW5jIGZ1bmN0aW9uIChmaWxlLCBpbmRleCwgYXJyYXlMZW5ndGgpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgbGFiZWwgPSBgJHtpZHgrMX0vJHtpbmRleCsxfS8ke2FycmF5TGVuZ3RofWA7XG5cblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKGBbc3RhcnRdICgke2xhYmVsfSkgJHtmaWxlfWApO1xuXHRcdFx0XHRcdGxldCB0eHRfb2xkID0gU3RyaW5nKGF3YWl0IGZzLnJlYWRGaWxlKGZpbGUpKTtcblxuXHRcdFx0XHRcdGxldCB0eHRfbmV3ID0gaGFuZGxlQ29udGV4dCh0eHRfb2xkLCBvcHRpb25zKTtcblxuXHRcdFx0XHRcdGlmIChvcHRpb25zLmNyZWF0ZVBhdGNoKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxldCBkYXRhID0gSnNEaWZmLmNyZWF0ZVBhdGNoKGNybGYodHh0X29sZCksIGNybGYodHh0X25ldyksIHtcblx0XHRcdFx0XHRcdFx0bmV3bGluZUlzVG9rZW46IHRydWUsXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0YXdhaXQgZnMub3V0cHV0RmlsZShmaWxlICsgJy5wYXRjaCcsIGRhdGEpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHR4dF9vbGQgIT0gdHh0X25ldylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5jcmVhdGVCYWNrdXApXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IGZzLm1vdmUoZmlsZSwgZmlsZSArICcub2xkJywge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdFx0XHRwcmVzZXJ2ZVRpbWVzdGFtcHM6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0b3ZlcndyaXRlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0YXdhaXQgZnMud3JpdGVGaWxlKGZpbGUsIHR4dF9uZXcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnNvbGUuZGVidWcoYFtkb25lXSAoJHtsYWJlbH0pICR7ZmlsZX1gKTtcblxuXHRcdFx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0XHR9XG5cdFx0XHQpXG5cdFx0XHQudGFwKGZ1bmN0aW9uIChscylcblx0XHRcdHtcblx0XHRcdFx0aWYgKGxzLmxlbmd0aClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnNvbGUuc3VjY2VzcyhgW2VuZF0gZG9uZSAke2xzLmxlbmd0aH0gZmlsZXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zb2xlLmZhaWwoYFtlbmRdIGRvbmUgJHtscy5sZW5ndGh9IGZpbGVzYCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQ7XG5cdH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVPcHRpb25zKG9wdGlvbnM6IElPcHRpb25zKVxue1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLnR3MmNuID0gISFvcHRpb25zLnR3MmNuO1xuXHRvcHRpb25zLm5vdE1pbiA9ICEhb3B0aW9ucy5ub3RNaW47XG5cdG9wdGlvbnMudW5TYWZlID0gISFvcHRpb25zLnVuU2FmZTtcblx0b3B0aW9ucy5jcmVhdGVCYWNrdXAgPSAhIW9wdGlvbnMuY3JlYXRlQmFja3VwO1xuXHRvcHRpb25zLmNyZWF0ZVBhdGNoID0gISFvcHRpb25zLmNyZWF0ZVBhdGNoO1xuXG5cdG9wdGlvbnMuY3dkID0gb3B0aW9ucy5jd2QgfHwgcHJvY2Vzcy5jd2QoKTtcblxuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUNvbnRleHQodGV4dDogc3RyaW5nLCBvcHRpb25zOiBJT3B0aW9uc0NvbnYpXG57XG5cdGxldCBmbiA9IChvcHRpb25zLnR3MmNuID8gJ3R3MmNuJyA6ICdjbjJ0dycpXG5cdCsgKG9wdGlvbnMubm90TWluID8gJycgOiAnX21pbicpXG5cdDtcblxuXHRsZXQgb3B0czogSU9wdGlvbnNDb3JlID0ge307XG5cblx0aWYgKG9wdGlvbnMudW5TYWZlKVxuXHR7XG5cdFx0b3B0cy5zYWZlID0gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gRm5MaXN0W2ZuXSh0ZXh0LCBvcHRzKVxufVxuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzIGFzIHR5cGVvZiBpbXBvcnQoJy4vaW5kZXgnKTtcbiJdfQ==