"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importDefault(require(".."));
const index_1 = require("../lib/util/index");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const sort_object_keys2_1 = require("sort-object-keys2");
index_1.log_dir(__1.default);
let versions = sort_object_keys2_1.sortObjectKeys(process.versions, {
    keys: ['node'],
});
index_1.log_dir(versions);
let version = versions.node.split('.').map(v => v.padStart(2, '0')).join('.');
let file = path_1.join(__dirname, 'log', 'v' + version + '.json');
fs_extra_1.outputJSON(file, {
    versions,
    support: __1.default,
}, {
    spaces: 2
})
    .then(async () => {
    let file2 = path_1.join(__dirname, '..', 'v' + version.split('.')[0] + '.json');
    return fs_extra_1.copy(file, file2, {
        overwrite: true,
    });
});
//# sourceMappingURL=flags.js.map