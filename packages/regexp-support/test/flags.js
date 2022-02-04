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
(0, index_1.log_dir)(__1.default);
let versions = (0, sort_object_keys2_1.sortObjectKeys)(process.versions, {
    keys: ['node'],
});
(0, index_1.log_dir)(versions);
let version = versions.node.split('.').map(v => v.padStart(2, '0')).join('.');
let file = (0, path_1.join)(__dirname, 'log', 'v' + version + '.json');
(0, fs_extra_1.outputJSON)(file, {
    versions,
    support: __1.default,
}, {
    spaces: 2
})
    .then(async () => {
    let file2 = (0, path_1.join)(__dirname, '..', 'v' + version.split('.')[0] + '.json');
    return (0, fs_extra_1.copy)(file, file2, {
        overwrite: true,
    });
});
//# sourceMappingURL=flags.js.map