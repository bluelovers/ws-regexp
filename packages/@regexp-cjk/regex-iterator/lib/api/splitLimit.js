"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLimit = void 0;
const _each_1 = require("./_each");
const greedySplit_1 = require("../util/split/greedySplit");
function _pushNonEmpty(arr, s, allowEmpty) {
    if (s !== '' || allowEmpty === true) {
        arr.push(s);
    }
}
function splitLimit(input, separator, limit, options) {
    if (typeof limit === 'object' && limit !== null) {
        options = limit;
        limit = options === null || options === void 0 ? void 0 : options.limit;
    }
    if (limit === 0 || limit < 0 || isNaN(limit)) {
        limit = void 0;
    }
    if (typeof separator === 'string') {
        return (0, greedySplit_1.greedySplit)(input, separator, limit);
    }
    options = options !== null && options !== void 0 ? options : {};
    let ret = [];
    let lastIndex = 0;
    let lastString = '';
    options.global = true;
    let { useFullMatched, allowEmpty, excludeSubMatched, limitMode } = options;
    useFullMatched = !!useFullMatched;
    allowEmpty = !!allowEmpty;
    excludeSubMatched = !!excludeSubMatched;
    let size = 0;
    let row;
    for (row of (0, _each_1._each)(input, separator, options)) {
        let { match, re } = row;
        let s;
        s = input.slice(lastIndex, match.index);
        _pushNonEmpty(ret, lastString = s, allowEmpty);
        //console.log(lastIndex, re.lastIndex, match.index)
        if (checkLimit()) {
            lastIndex = match.index;
            break;
        }
        lastIndex = re.lastIndex;
        if (excludeSubMatched !== true && match.length > 1) {
            if (useFullMatched === true) {
                s = match[0];
                _pushNonEmpty(ret, lastString = s, allowEmpty);
            }
            else {
                for (s of match.slice(1)) {
                    _pushNonEmpty(ret, lastString = s, allowEmpty);
                    if (checkLimit()) {
                        break;
                    }
                }
            }
        }
        size++;
        if (checkLimit()) {
            break;
        }
    }
    if (limit > 0) {
        if (!options.excludeRest) {
            let s = input.slice(lastIndex);
            /*
            console.dir(row)
            console.dir(ret)

            console.dir({
                size,
                length: ret.length,
                limit,
            })
             */
            if (!checkLimit()) {
                _pushNonEmpty(ret, s, allowEmpty);
            }
            else {
                ret[ret.length - 1] += s;
            }
        }
    }
    else {
        _pushNonEmpty(ret, input.slice(lastIndex), allowEmpty);
    }
    function checkLimit() {
        let bool;
        if (limitMode === 1) {
            //console.log(limitMode, size === limit)
            bool = (size === limit);
        }
        else {
            //console.log(limitMode, ret.length === limit)
            bool = ret.length === limit;
        }
        return bool;
    }
    return ret;
}
exports.splitLimit = splitLimit;
exports.default = splitLimit;
//# sourceMappingURL=splitLimit.js.map