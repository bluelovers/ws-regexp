"use strict";
/**
 * Created by user on 2019/3/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContext = exports.handleOptions = exports.handldTarget = exports.FnList = void 0;
const tslib_1 = require("tslib");
const zh_convert_1 = require("@lazy-cjk/zh-convert");
const fast_glob_1 = tslib_1.__importDefault(require("@bluelovers/fast-glob"));
const fs_iconv_1 = tslib_1.__importDefault(require("fs-iconv"));
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const diff_1 = tslib_1.__importDefault(require("diff"));
const debug_color2_1 = require("debug-color2");
const crlf_normalize_1 = require("crlf-normalize");
const min_1 = require("@lazy-cjk/zh-convert/min");
exports.FnList = {
    cn2tw_min: min_1.cn2tw_min, tw2cn_min: min_1.tw2cn_min,
    cn2tw: zh_convert_1.cn2tw, tw2cn: zh_convert_1.tw2cn,
};
function handldTarget(search, options) {
    return bluebird_1.default.resolve().then(() => {
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
        return bluebird_1.default.resolve(fast_glob_1.default.async(search, {
            cwd: options.cwd,
            absolute: true,
        }))
            .tap(function (ls) {
            debug_color2_1.console.debug(`[info] found ${ls.length} files`);
        })
            .map(async function (file, index, arrayLength) {
            let label = `${idx + 1}/${index + 1}/${arrayLength}`;
            debug_color2_1.console.debug(`[start] (${label}) ${file}`);
            let txt_old = String(await fs_iconv_1.default.loadFile(file, {
                autoDecode: true,
            }));
            let txt_new = handleContext(txt_old, options);
            if (options.createPatch) {
                let data = diff_1.default.createPatch(file + '.patch', crlf_normalize_1.crlf(txt_old), crlf_normalize_1.crlf(txt_new), void 0, void 0, {
                    newlineIsToken: true,
                });
                await fs_iconv_1.default.outputFile(file + '.patch', data);
            }
            if (txt_old != txt_new) {
                if (options.createBackup) {
                    await fs_iconv_1.default.move(file, file + '.old', {
                        // @ts-ignore
                        preserveTimestamps: true,
                        overwrite: false,
                    });
                }
                await fs_iconv_1.default.writeFile(file, txt_new);
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
//# sourceMappingURL=index.js.map