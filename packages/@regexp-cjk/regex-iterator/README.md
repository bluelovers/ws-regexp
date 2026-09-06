# @regexp-cjk/regex-iterator

> 正規表達式迭代器 (RegExp iterator)

## install

```bash
# 使用 yarn / Using yarn
yarn add @regexp-cjk/regex-iterator

# 使用 yarn-tool / Using yarn-tool
yarn-tool add @regexp-cjk/regex-iterator
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add @regexp-cjk/regex-iterator

# 使用 pnpm / Using pnpm
pnpm add @regexp-cjk/regex-iterator

# 使用 npm / Using npm
npm install @regexp-cjk/regex-iterator
```

```
let html = '<a href="http://xregexp.com/api/">XRegExp</a>\
        <a href="http://www.google.com/">Google</a>';

	let actual = reduce(html, [
		{ regexp: /<a href="([^"]+)">/ig, backref: 1 },
		{ regexp: new RegExp('^https?://(?<domain>[^/?#]+)'), backref: 'domain' },
	])

	expect(actual).toStrictEqual(['xregexp.com', 'www.google.com']);
```
