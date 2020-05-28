# README

## 繁簡轉換對應表

* BASE 代表 可以簡單透過 javascript split 進行字串分割
* UNICODE 代表需要透過支援 Unicode 進行字串分割(例如 [uni-string](https://www.npmjs.com/package/uni-string) )
* SAFE 代表於 簡轉繁 時，盡量不去取代已經存在於繁體中的字(至於繁轉簡則... 沒必要)

可透過以下代碼取得相同資料

```ts
import { table_tw2cn, table_cn2tw } from 'cjk-conv/lib/zh/convert';
import { tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';
```

### 繁轉簡 table_tw2cn

- JSON: [table_tw2cn.json](./table_tw2cn.json)
- BASE: [base.from](data/unsafe/table_tw2cn.base.from.txt) / [base.to](data/unsafe/table_tw2cn.base.to.txt)
- UNICODE: [unicode.from](data/unsafe/table_tw2cn.unicode.from.txt) / [unicode.to](data/unsafe/table_tw2cn.unicode.to.txt)
- SAFE: [safe.from](data/safe/table_tw2cn.base.from.txt) / [safe.to](data/safe/table_tw2cn.base.to.txt)
- 

### 簡轉繁 table_cn2tw

- JSON: [table_cn2tw.json](./table_cn2tw.json)
- BASE: [base.from](data/unsafe/table_cn2tw.base.from.txt) / [base.to](data/unsafe/table_cn2tw.base.to.txt)
- UNICODE: [unicode.from](data/unsafe/table_cn2tw.unicode.from.txt) / [unicode.to](data/unsafe/table_cn2tw.unicode.to.txt)
- SAFE: [safe.from](data/safe/table_cn2tw.base.from.txt) / [safe.to](data/safe/table_cn2tw.base.to.txt)
- 
