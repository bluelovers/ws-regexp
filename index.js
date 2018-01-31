"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_cjk_1 = require("regexp-cjk");
exports.SP_KEY = '#_@_#';
exports.SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·])';
exports.SP_ESCAPE = '（河蟹）';
exports.table = [
    '噁心',
    '触手',
    '白痴',
    '打倒',
    '固守',
    '貴族',
    '自由',
    '討伐',
    '竊聽',
    '色情',
    '禁止',
    '淫穢',
    '下流',
    '含著',
    '調教',
    '情欲',
    '尸体',
    '凌辱',
    '幹掉',
    '非法',
    '激烈',
    '互毆',
    '求愛',
    '間諜',
    '賭局',
    '下賤',
    '爆炸',
    '呻吟',
    '屁股',
    '笨蛋',
    '蠢货',
    '洗脑',
    '魅惑',
    '狂化',
    '混乱',
    '是非',
    '弱智',
    '死掉',
    '日本',
    '法克',
    '畜生',
    '麻痹',
    '废物',
];
exports.table2 = [
    ['裸体', '果体',],
];
function escape(text, options = {}) {
    let t = exports.table2
        .reduce(function (a, b) {
        if (Array.isArray(b)) {
            a = a.concat(b);
        }
        else {
            a.push(b);
        }
        return a;
    }, [])
        .concat(exports.table);
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    do {
        t.forEach(function (value, index, array) {
            let a = new Array(value.split('').length).fill(0).map(function (value, index, array) {
                return '$' + (index + 1);
            });
            let r = a.join(exports.SP_ESCAPE);
            let s = fn('(' + value.split('').join(')(') + ')', 'ig');
            text = text.replace(s, r);
        });
    } while (--count > 0);
    return text;
}
exports.escape = escape;
function unescape(text, options = {}) {
    let t = exports.table2
        .reduce(function (a, b) {
        if (Array.isArray(b)) {
            a = a.concat(b);
        }
        else {
            a.push(b);
        }
        return a;
    }, [])
        .concat(exports.table);
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    t.forEach(function (value, index, array) {
        let rs = fn('(' + value.split('').join(')' + exports.SP_KEY + '(') + ')', 'ig');
        let s = new RegExp(rs.source.split(exports.SP_KEY).join(exports.SP_REGEXP), 'ig');
        let a = new Array(value.split('').length).fill(0).map(function (value, index, array) {
            return '$' + (index + 1);
        });
        let r = a.join('');
        text = text.replace(s, r);
    });
    return text;
}
exports.unescape = unescape;
function getTable(options = {}) {
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    return exports.table2
        .concat(exports.table)
        .reduce(function (a, b) {
        let c;
        c = Array.isArray(b) ? b : [b];
        c.forEach(function (value, index, array) {
            let rs;
            rs = [value.split('').join(exports.SP_KEY), c[0], 'ig'];
            a.push(rs);
        });
        return a;
    }, []);
}
exports.getTable = getTable;
const self = require("./index");
exports.default = self;
