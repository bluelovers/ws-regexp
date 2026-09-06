# README.md

    convert Specified type RegExp to hacked regenerate object

## install

```bash
# 使用 yarn / Using yarn
yarn add regexp-class-to-regenerate

# 使用 yarn-tool / Using yarn-tool
yarn-tool add regexp-class-to-regenerate
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add regexp-class-to-regenerate

# 使用 pnpm / Using pnpm
pnpm add regexp-class-to-regenerate

# 使用 npm / Using npm
npm install regexp-class-to-regenerate
```

## demo

```ts
import regexpClassToObject from 'regexp-class-to-regenerate';

let obj = regexpClassToObject(/[\u200b-\u200f\ufeff\u2060]/ug)
	.remove(0x200d)
;

console.dir(obj.toRegExp());
// => /[\u200B\u200C\u200E\u200F\u2060\uFEFF]/gu
```