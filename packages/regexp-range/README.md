# regexp-range

> create regex class range string `[一-十]` `[⓪-㊿]` ...

# install

```nodemon
npm i regexp-range
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
