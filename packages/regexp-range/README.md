# regexp-range

> create regex class range string `[一-十]` `[⓪-㊿]` ...

# install

```bash
# 使用 yarn / Using yarn
yarn add regexp-range

# 使用 yarn-tool / Using yarn-tool
yarn-tool add regexp-range
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add regexp-range

# 使用 pnpm / Using pnpm
pnpm add regexp-range

# 使用 npm / Using npm
npm install regexp-range
```

## demo

* [index.d.ts](index.d.ts)
* [core.d.ts](src/core.d.ts)

```ts
import matchRange, { TABLE_RANGE } from 'regexp-range';

//console.log(TABLE_RANGE);

console.dir(matchRange('⓪', '㊿')); // => ['⓪' ... '㊿']
console.dir(matchRange('一', '十')); // => [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十' ]
console.dir(matchRange('零', '拾')); // => [ '零', '壱', '弐', '参', '肆', '伍', '陸', '柒', '捌', '玖', '拾' ]

console.dir(matchRange('二', '七', {
	createRegExpString: true,
})); // => '二三四五六七'
console.dir(matchRange('二', '七', {
	createRegExpString: true,
	createRegExpClass: true,
})); // => '[二三四五六七]'
```
