"use strict";
/**
 * Created by user on 2018/9/1/001.
 */
const regexp_cjk_1 = require("regexp-cjk");
const regexp_parser_literal_1 = require("regexp-parser-literal");
const array_hyper_unique_1 = require("array-hyper-unique");
function novelPatternSplit(input, options = {}) {
    let r = new regexp_cjk_1.zhRegExp(input, {
        // 禁用自動生成漢字數列 [一-十] 之類
        allowLocalRangeAutoZh: false,
        // 禁用自動配對異體字
        disableZh: true,
        on: {
        // 雖然是空設定 但可以用來觸發優化 regexp
        },
    });
    options = options || {};
    let p = regexp_parser_literal_1.parseRegExp(r.toString());
    let d;
    if (p.pattern.elements.length == 1) {
        let p2 = p.pattern.elements[0];
        if (p2.type === 'Disjunction') {
            d = p2;
        }
        else if (p2.type == 'Group'
            && p2.elements.length == 1
            && p2.elements[0].type === 'Disjunction') {
            d = p2.elements[0];
        }
        else if (options.allowCapturingGroup
            && p2.type == 'CapturingGroup'
            && p2.elements.length == 1
            && p2.elements[0].type === 'Disjunction') {
            d = p2.elements[0];
        }
        else if (0) {
            console.log({
                p2,
                d,
            });
        }
    }
    let patterns = [];
    if (d
        && d.type === 'Disjunction') {
        if (d.alternatives) {
            let c = d.alternatives.reduce(function (a, b) {
                let c = b.reduce(function (a, b) {
                    a.push(regexp_parser_literal_1.astToString(b));
                    return a;
                }, []);
                a.push(c.join(''));
                return a;
            }, []);
            if (c.length) {
                patterns = array_hyper_unique_1.array_unique(c);
            }
        }
    }
    if (!patterns.length) {
        if (options.useRawString) {
            let raw = getRawString(input);
            patterns.push(typeof raw !== 'undefined' ? raw : r.source);
        }
        else {
            patterns.push(r.source);
        }
    }
    return patterns;
}
function getRawString(raw) {
    try {
        return String.raw(raw);
    }
    catch (e) {
    }
}
exports.default = novelPatternSplit;
// @ts-ignore
Object.assign(novelPatternSplit, exports, {
    getRawString,
    novelPatternSplit,
});
module.exports = novelPatternSplit;
