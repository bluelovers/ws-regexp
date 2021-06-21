"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randJapaneseName = exports.randJapaneseFirstName = exports.randJapaneseLastName = exports.randJapaneseFemale = exports.randJapaneseMale = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/6/1.
 */
const util_1 = require("./util");
const last_name_1 = tslib_1.__importDefault(require("../table/last_name"));
const first_name_1 = require("../table/first_name");
function randJapaneseMale() {
    return first_name_1.first_name_male[util_1.randIndex(first_name_1.first_name_male.length)];
}
exports.randJapaneseMale = randJapaneseMale;
function randJapaneseFemale() {
    return first_name_1.first_name_female[util_1.randIndex(first_name_1.first_name_female.length)];
}
exports.randJapaneseFemale = randJapaneseFemale;
function randJapaneseLastName() {
    return last_name_1.default[util_1.randIndex(last_name_1.default.length)];
}
exports.randJapaneseLastName = randJapaneseLastName;
function randJapaneseFirstName() {
    let first_name = [];
    first_name.push(randJapaneseMale());
    first_name.push(randJapaneseFemale());
    return first_name[util_1.randIndex(first_name.length)];
}
exports.randJapaneseFirstName = randJapaneseFirstName;
function randJapaneseName(options) {
    options = options || {};
    if (options.female == null && options.male == null) {
        options.male = options.female = true;
    }
    let first_name = [];
    options.male && first_name.push(randJapaneseMale());
    options.female && first_name.push(randJapaneseFemale());
    return [
        randJapaneseLastName(),
        first_name[util_1.randIndex(first_name.length)],
    ];
}
exports.randJapaneseName = randJapaneseName;
//# sourceMappingURL=rand.js.map