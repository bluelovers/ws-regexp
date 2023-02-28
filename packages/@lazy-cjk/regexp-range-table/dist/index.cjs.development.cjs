'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const list_range$2 = [["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], ["〇", "壱", "弐", "参", "四", "五", "六", "七", "八", "九", "十"], ["零", "壱", "弐", "参", "肆", "伍", "陸", "柒", "捌", "玖", "拾"], ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖", "拾"], ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"], ["零", "壱", "弐", "参", "肆", "伍", "陸", "柒", "捌", "玖", "什"], ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖", "什"], ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "什"]];
const list_range2 = [["洞", "幺", "两", "三", "刀", "五", "六", "拐", "八", "勾"]];

const list_range$1 = [["⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳", "㉑", "㉒", "㉓", "㉔", "㉕", "㉖", "㉗", "㉘", "㉙", "㉚", "㉛", "㉜", "㉝", "㉞", "㉟", "㊱", "㊲", "㊳", "㊴", "㊵", "㊶", "㊷", "㊸", "㊹", "㊺", "㊻", "㊼", "㊽", "㊾", "㊿"], ["⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"], ["❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"], ["➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒", "➓", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"], ["⓵", "⓶", "⓷", "⓸", "⓹", "⓺", "⓻", "⓼", "⓽", "⓾"], ["➀", "➁", "➂", "➃", "➄", "➅", "➆", "➇", "➈", "➉"]];

const list_range = [["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"], ["ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ", "ⅹ", "ⅺ", "ⅻ"]];

const TABLE_RANGE = {
  chinese: list_range$2,
  chinese2: list_range2,
  circle: list_range$1
};
const TABLE_RANGE_ALL = {
  chinese: list_range$2,
  chinese2: list_range2,
  circle: list_range$1,
  roman: list_range
};

function listRawToRange(list_range_raw) {
  return list_range_raw.reduce(function (a, data) {
    let c = data.reduce(function (a2, v) {
      let s;
      if (typeof v == 'number') {
        s = String.fromCharCode(v);
      } else if (typeof v == 'string') {
        s = v;
      } else if (Array.isArray(v)) {
        if (v.length == 2) {
          s = new Array(v[1] - v[0]).fill(0).map(function (value, index) {
            return String.fromCharCode(v[0] + index);
          });
        } else {
          throw new TypeError();
        }
      } else {
        throw new TypeError();
      }
      if (Array.isArray(s)) {
        a2 = a2.concat(s);
      } else {
        a2.push(s);
      }
      return a2;
    }, []);
    a.push(c);
    return a;
  }, []);
}

exports.TABLE_RANGE = TABLE_RANGE;
exports.TABLE_RANGE_ALL = TABLE_RANGE_ALL;
exports.default = TABLE_RANGE;
exports.listRawToRange = listRawToRange;
exports.roman = list_range;
//# sourceMappingURL=index.cjs.development.cjs.map
