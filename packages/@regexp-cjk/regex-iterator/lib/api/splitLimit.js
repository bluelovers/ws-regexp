"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLimit = void 0;
const _each_1 = __importDefault(require("./_each"));
function greedySplit(str, separator, limit) {
    const result = str.split(separator, limit);
    if (result.length === limit) {
        let length = 0;
        if (typeof separator === 'string') {
            length = result.join(separator).length;
        }
        else {
            length = result.reduce((l, x, i) => {
                let separatorLength = 0;
                if (i + 1 < limit) {
                    separatorLength = str.slice(l).match(separator).shift().length;
                }
                return l + x.length + separatorLength;
            }, 0);
        }
        result[limit - 1] += str.slice(length);
    }
    return result;
}
function _pushNonEmpty(arr, s, allowEmpty) {
    if (s !== '' || allowEmpty === true) {
        arr.push(s);
    }
}
function splitLimit(input, separator, limit, options) {
    if (typeof limit === 'object' && limit !== null) {
        options = limit;
        limit = options.limit;
    }
    if (limit === 0 || limit < 0 || isNaN(limit)) {
        limit = void 0;
    }
    if (typeof separator === 'string') {
        return greedySplit(input, separator, limit);
    }
    options = options !== null && options !== void 0 ? options : {};
    let ret = [];
    let lastIndex = 0;
    let lastString = '';
    options.global = true;
    let { useFullMatched, allowEmpty, excludeSubMatched } = options;
    useFullMatched = !!useFullMatched;
    allowEmpty = !!allowEmpty;
    excludeSubMatched = !!excludeSubMatched;
    for (let row of _each_1.default(input, separator, options)) {
        let { match, re } = row;
        let s;
        s = input.slice(lastIndex, match.index);
        _pushNonEmpty(ret, lastString = s, allowEmpty);
        //console.log(lastIndex, re.lastIndex, match.index)
        if (ret.length === limit) {
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
                    if (ret.length === limit) {
                        break;
                    }
                }
            }
        }
        if (ret.length === limit) {
            break;
        }
    }
    if (limit > 0) {
        if (!options.excludeRest) {
            let s = input.slice(lastIndex);
            if (ret.length < limit) {
                _pushNonEmpty(ret, s, allowEmpty);
            }
            else {
                ret[ret.length - 1] += input.slice(lastIndex);
            }
        }
    }
    else {
        _pushNonEmpty(ret, input.slice(lastIndex), allowEmpty);
    }
    return ret;
}
exports.splitLimit = splitLimit;
exports.default = splitLimit;
//# sourceMappingURL=splitLimit.js.map