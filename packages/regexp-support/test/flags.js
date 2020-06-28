"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMEJBQXlCO0FBQ3pCLDZDQUE0QztBQUM1Qyx1Q0FBa0U7QUFFbEUsK0JBQTRCO0FBQzVCLHlEQUFtRDtBQUVuRCxlQUFPLENBQUMsV0FBTyxDQUFDLENBQUM7QUFFakIsSUFBSSxRQUFRLEdBQUcsa0NBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0lBQy9DLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztDQUNkLENBQUMsQ0FBQztBQUVILGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVsQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUU5RSxJQUFJLElBQUksR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBRSxDQUFDO0FBRTVELHFCQUFVLENBQUMsSUFBSSxFQUFFO0lBQ2hCLFFBQVE7SUFDUixPQUFPLEVBQVAsV0FBTztDQUNQLEVBQUU7SUFDRixNQUFNLEVBQUUsQ0FBQztDQUNULENBQUM7S0FDQSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFFaEIsSUFBSSxLQUFLLEdBQUcsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFFLENBQUM7SUFFMUUsT0FBTyxlQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUN4QixTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC80LzI2LzAyNi5cbiAqL1xuXG5pbXBvcnQgc3VwcG9ydCBmcm9tICcuLic7XG5pbXBvcnQgeyBsb2dfZGlyIH0gZnJvbSAnLi4vbGliL3V0aWwvaW5kZXgnO1xuaW1wb3J0IHsgb3V0cHV0RmlsZSwgb3V0cHV0SlNPTiwgY29weUZpbGUsIGNvcHkgfSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzb3J0T2JqZWN0S2V5cyB9IGZyb20gJ3NvcnQtb2JqZWN0LWtleXMyJztcblxubG9nX2RpcihzdXBwb3J0KTtcblxubGV0IHZlcnNpb25zID0gc29ydE9iamVjdEtleXMocHJvY2Vzcy52ZXJzaW9ucywge1xuXHRrZXlzOiBbJ25vZGUnXSxcbn0pO1xuXG5sb2dfZGlyKHZlcnNpb25zKTtcblxubGV0IHZlcnNpb24gPSB2ZXJzaW9ucy5ub2RlLnNwbGl0KCcuJykubWFwKHYgPT4gdi5wYWRTdGFydCgyLCAnMCcpKS5qb2luKCcuJyk7XG5cbmxldCBmaWxlID0gam9pbihfX2Rpcm5hbWUsICdsb2cnLCAndicgKyB2ZXJzaW9uICsgJy5qc29uJyApO1xuXG5vdXRwdXRKU09OKGZpbGUsIHtcblx0dmVyc2lvbnMsXG5cdHN1cHBvcnQsXG59LCB7XG5cdHNwYWNlczogMlxufSlcblx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXG5cdFx0bGV0IGZpbGUyID0gam9pbihfX2Rpcm5hbWUsICcuLicsICd2JyArIHZlcnNpb24uc3BsaXQoJy4nKVswXSArICcuanNvbicgKTtcblxuXHRcdHJldHVybiBjb3B5KGZpbGUsIGZpbGUyLCB7XG5cdFx0XHRvdmVyd3JpdGU6IHRydWUsXG5cdFx0fSlcblx0fSlcbjtcblxuIl19