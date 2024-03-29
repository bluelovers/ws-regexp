const r = [ [ "〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ], [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ], [ "〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ], [ "〇", "壱", "弐", "参", "四", "五", "六", "七", "八", "九", "十" ], [ "零", "壱", "弐", "参", "肆", "伍", "陸", "柒", "捌", "玖", "拾" ], [ "零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖", "拾" ], [ "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾" ], [ "零", "壱", "弐", "参", "肆", "伍", "陸", "柒", "捌", "玖", "什" ], [ "零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖", "什" ], [ "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "什" ] ], e = [ [ "洞", "幺", "两", "三", "刀", "五", "六", "拐", "八", "勾" ] ], n = [ [ "⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳", "㉑", "㉒", "㉓", "㉔", "㉕", "㉖", "㉗", "㉘", "㉙", "㉚", "㉛", "㉜", "㉝", "㉞", "㉟", "㊱", "㊲", "㊳", "㊴", "㊵", "㊶", "㊷", "㊸", "㊹", "㊺", "㊻", "㊼", "㊽", "㊾", "㊿" ], [ "⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴" ], [ "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴" ], [ "➊", "➋", "➌", "➍", "➎", "➏", "➐", "➑", "➒", "➓", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴" ], [ "⓵", "⓶", "⓷", "⓸", "⓹", "⓺", "⓻", "⓼", "⓽", "⓾" ], [ "➀", "➁", "➂", "➃", "➄", "➅", "➆", "➇", "➈", "➉" ] ], t = [ [ "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ" ], [ "ⅰ", "ⅱ", "ⅲ", "ⅳ", "ⅴ", "ⅵ", "ⅶ", "ⅷ", "ⅸ", "ⅹ", "ⅺ", "ⅻ" ] ], i = {
  chinese: r,
  chinese2: e,
  circle: n
}, o = {
  chinese: r,
  chinese2: e,
  circle: n,
  roman: t
};

function listRawToRange(r) {
  return r.reduce((function(r, e) {
    let n = e.reduce((function(r, e) {
      let n;
      if ("number" == typeof e) n = String.fromCharCode(e); else if ("string" == typeof e) n = e; else {
        if (!Array.isArray(e)) throw new TypeError;
        if (2 != e.length) throw new TypeError;
        n = new Array(e[1] - e[0]).fill(0).map((function(r, n) {
          return String.fromCharCode(e[0] + n);
        }));
      }
      return Array.isArray(n) ? r = r.concat(n) : r.push(n), r;
    }), []);
    return r.push(n), r;
  }), []);
}

export { i as TABLE_RANGE, o as TABLE_RANGE_ALL, i as default, listRawToRange, t as roman };
//# sourceMappingURL=index.esm.mjs.map
