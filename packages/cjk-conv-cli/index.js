"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/3/2.
 */
const min_1 = require("cjk-conv/lib/zh/convert/min");
const convert_1 = require("cjk-conv/lib/zh/convert");
const FastGlob = require("fast-glob");
const fs = require("fs-iconv");
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
            let txt_old = String(await fs.loadFile(file, {
                autoDecode: true,
            }));
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
                debug_color2_1.console.success(`[done] (${label}) ${file}`);
            }
            else {
                debug_color2_1.console.gray.debug(`[done] (${label}) ${file}`);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gscURBQW1FO0FBQ25FLHFEQUFpRjtBQUVqRixzQ0FBdUM7QUFDdkMsK0JBQWdDO0FBQ2hDLHFDQUFzQztBQUN0QywrQkFBZ0M7QUFDaEMsK0NBQXVDO0FBQ3ZDLG1EQUFzQztBQUV6QixRQUFBLE1BQU0sR0FBRztJQUNyQixTQUFTLEVBQVQsZUFBUyxFQUFFLFNBQVMsRUFBVCxlQUFTO0lBQ3BCLEtBQUssRUFBTCxlQUFLLEVBQUUsS0FBSyxFQUFMLGVBQUs7Q0FDWixDQUFDO0FBaUJGLFNBQWdCLFlBQVksQ0FBQyxNQUF5QixFQUFFLE9BQWtCO0lBRXpFLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQzlCO1lBQ0MsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBDLElBQUksT0FBTyxFQUNYO1lBQ0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQzlEO1FBRUQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQzlCO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBUyxNQUFNLEVBQUU7WUFDckQsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO2FBQ0YsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUVoQixzQkFBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLEtBQUssV0FBVyxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVc7WUFFM0MsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUMsQ0FBQyxJQUFJLEtBQUssR0FBQyxDQUFDLElBQUksV0FBVyxFQUFFLENBQUM7WUFFakQsc0JBQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDNUMsVUFBVSxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTlDLElBQUksT0FBTyxDQUFDLFdBQVcsRUFDdkI7Z0JBQ0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxxQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHFCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzNELGNBQWMsRUFBRSxJQUFJO2lCQUNwQixDQUFDLENBQUM7Z0JBRUgsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDMUM7WUFFRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQ3RCO2dCQUNDLElBQUksT0FBTyxDQUFDLFlBQVksRUFDeEI7b0JBQ0MsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFO3dCQUNsQyxhQUFhO3dCQUNiLGtCQUFrQixFQUFFLElBQUk7d0JBQ3hCLFNBQVMsRUFBRSxLQUFLO3FCQUNoQixDQUFDLENBQUE7aUJBQ0Y7Z0JBRUQsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFbEMsc0JBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzthQUM3QztpQkFFRDtnQkFDQyxzQkFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNoRDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUNEO2FBQ0EsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUVoQixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQ2I7Z0JBQ0Msc0JBQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQzthQUNqRDtpQkFFRDtnQkFDQyxzQkFBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDO2FBQzlDO1FBQ0YsQ0FBQyxDQUFDLENBQ0Q7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNILENBQUM7QUF4RkQsb0NBd0ZDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE9BQWlCO0lBRTlDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBRXhCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDaEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDOUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUU1QyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTNDLE9BQU8sT0FBTyxDQUFDO0FBQ2hCLENBQUM7QUFiRCxzQ0FhQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsT0FBcUI7SUFFaEUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztVQUMxQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQy9CO0lBRUQsSUFBSSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztJQUU1QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQ2xCO1FBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDbEI7SUFFRCxPQUFPLGNBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQWRELHNDQWNDO0FBRUQsa0JBQWUsT0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMy8yLlxuICovXG5pbXBvcnQgeyBjbjJ0d19taW4sIHR3MmNuX21pbiB9IGZyb20gJ2Nqay1jb252L2xpYi96aC9jb252ZXJ0L21pbic7XG5pbXBvcnQgeyBjbjJ0dywgdHcyY24sIElPcHRpb25zIGFzIElPcHRpb25zQ29yZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC9jb252ZXJ0JztcblxuaW1wb3J0IEZhc3RHbG9iID0gcmVxdWlyZSgnZmFzdC1nbG9iJyk7XG5pbXBvcnQgZnMgPSByZXF1aXJlKCdmcy1pY29udicpO1xuaW1wb3J0IEJsdWViaXJkID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmltcG9ydCBKc0RpZmYgPSByZXF1aXJlKCdkaWZmJyk7XG5pbXBvcnQgeyBjb25zb2xlIH0gZnJvbSAnZGVidWctY29sb3IyJztcbmltcG9ydCB7IGNybGYgfSBmcm9tICdjcmxmLW5vcm1hbGl6ZSc7XG5cbmV4cG9ydCBjb25zdCBGbkxpc3QgPSB7XG5cdGNuMnR3X21pbiwgdHcyY25fbWluLFxuXHRjbjJ0dywgdHcyY24sXG59O1xuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0NvbnYgPSB7XG5cdGN3ZD86IHN0cmluZyxcblxuXHR0dzJjbj86IGJvb2xlYW4sXG5cdG5vdE1pbj86IGJvb2xlYW4sXG5cdHVuU2FmZT86IGJvb2xlYW4sXG5cblx0Y3JlYXRlQmFja3VwPzogYm9vbGVhbixcblx0Y3JlYXRlUGF0Y2g/OiBib29sZWFuLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9ucyA9IEZhc3RHbG9iLk9wdGlvbnM8c3RyaW5nPiAmIElPcHRpb25zQ29udiAmIHtcblx0ZGVlcD86IGJvb2xlYW4gfCBudW1iZXIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGRUYXJnZXQoc2VhcmNoOiBzdHJpbmcgfCBzdHJpbmdbXSwgb3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdGlmICh0eXBlb2Ygc2VhcmNoID09PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRzZWFyY2ggPSBbc2VhcmNoXTtcblx0XHR9XG5cblx0XHRsZXQgX2lzX2FyciA9IEFycmF5LmlzQXJyYXkoc2VhcmNoKTtcblxuXHRcdGlmIChfaXNfYXJyKVxuXHRcdHtcblx0XHRcdHNlYXJjaCA9IHNlYXJjaC5maWx0ZXIodiA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi5sZW5ndGgpXG5cdFx0fVxuXG5cdFx0aWYgKCFfaXNfYXJyIHx8ICFzZWFyY2gubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgc2VhcmNoIGlzIGVtcHR5IG9yIG5vdCBhbGxvd2ApO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMgPSBoYW5kbGVPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShGYXN0R2xvYi5hc3luYzxzdHJpbmc+KHNlYXJjaCwge1xuXHRcdFx0XHRjd2Q6IG9wdGlvbnMuY3dkLFxuXHRcdFx0XHRhYnNvbHV0ZTogdHJ1ZSxcblx0XHRcdH0pKVxuXHRcdFx0LnRhcChmdW5jdGlvbiAobHMpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoYFtpbmZvXSBmb3VuZCAke2xzLmxlbmd0aH0gZmlsZXNgKTtcblx0XHRcdH0pXG5cdFx0XHQubWFwKGFzeW5jIGZ1bmN0aW9uIChmaWxlLCBpbmRleCwgYXJyYXlMZW5ndGgpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgbGFiZWwgPSBgJHtpZHgrMX0vJHtpbmRleCsxfS8ke2FycmF5TGVuZ3RofWA7XG5cblx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKGBbc3RhcnRdICgke2xhYmVsfSkgJHtmaWxlfWApO1xuXHRcdFx0XHRcdGxldCB0eHRfb2xkID0gU3RyaW5nKGF3YWl0IGZzLmxvYWRGaWxlKGZpbGUsIHtcblx0XHRcdFx0XHRcdGF1dG9EZWNvZGU6IHRydWUsXG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdFx0bGV0IHR4dF9uZXcgPSBoYW5kbGVDb250ZXh0KHR4dF9vbGQsIG9wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuY3JlYXRlUGF0Y2gpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGV0IGRhdGEgPSBKc0RpZmYuY3JlYXRlUGF0Y2goY3JsZih0eHRfb2xkKSwgY3JsZih0eHRfbmV3KSwge1xuXHRcdFx0XHRcdFx0XHRuZXdsaW5lSXNUb2tlbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRhd2FpdCBmcy5vdXRwdXRGaWxlKGZpbGUgKyAnLnBhdGNoJywgZGF0YSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHh0X29sZCAhPSB0eHRfbmV3KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmNyZWF0ZUJhY2t1cClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgZnMubW92ZShmaWxlLCBmaWxlICsgJy5vbGQnLCB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0XHRcdHByZXNlcnZlVGltZXN0YW1wczogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRvdmVyd3JpdGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRhd2FpdCBmcy53cml0ZUZpbGUoZmlsZSwgdHh0X25ldyk7XG5cblx0XHRcdFx0XHRcdGNvbnNvbGUuc3VjY2VzcyhgW2RvbmVdICgke2xhYmVsfSkgJHtmaWxlfWApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc29sZS5ncmF5LmRlYnVnKGBbZG9uZV0gKCR7bGFiZWx9KSAke2ZpbGV9YCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHRcdH1cblx0XHRcdClcblx0XHRcdC50YXAoZnVuY3Rpb24gKGxzKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAobHMubGVuZ3RoKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc29sZS5zdWNjZXNzKGBbZW5kXSBkb25lICR7bHMubGVuZ3RofSBmaWxlc2ApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnNvbGUuZmFpbChgW2VuZF0gZG9uZSAke2xzLmxlbmd0aH0gZmlsZXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdDtcblx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU9wdGlvbnMob3B0aW9uczogSU9wdGlvbnMpXG57XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMudHcyY24gPSAhIW9wdGlvbnMudHcyY247XG5cdG9wdGlvbnMubm90TWluID0gISFvcHRpb25zLm5vdE1pbjtcblx0b3B0aW9ucy51blNhZmUgPSAhIW9wdGlvbnMudW5TYWZlO1xuXHRvcHRpb25zLmNyZWF0ZUJhY2t1cCA9ICEhb3B0aW9ucy5jcmVhdGVCYWNrdXA7XG5cdG9wdGlvbnMuY3JlYXRlUGF0Y2ggPSAhIW9wdGlvbnMuY3JlYXRlUGF0Y2g7XG5cblx0b3B0aW9ucy5jd2QgPSBvcHRpb25zLmN3ZCB8fCBwcm9jZXNzLmN3ZCgpO1xuXG5cdHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ29udGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM6IElPcHRpb25zQ29udilcbntcblx0bGV0IGZuID0gKG9wdGlvbnMudHcyY24gPyAndHcyY24nIDogJ2NuMnR3Jylcblx0KyAob3B0aW9ucy5ub3RNaW4gPyAnJyA6ICdfbWluJylcblx0O1xuXG5cdGxldCBvcHRzOiBJT3B0aW9uc0NvcmUgPSB7fTtcblxuXHRpZiAob3B0aW9ucy51blNhZmUpXG5cdHtcblx0XHRvcHRzLnNhZmUgPSBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBGbkxpc3RbZm5dKHRleHQsIG9wdHMpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9pbmRleCcpO1xuIl19