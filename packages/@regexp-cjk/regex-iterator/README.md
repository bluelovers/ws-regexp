# README.md

    regexp iterator util helpers

## install

```bash
yarn add @regexp-cjk/regex-iterator
yarn-tool add @regexp-cjk/regex-iterator
yt add @regexp-cjk/regex-iterator
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
