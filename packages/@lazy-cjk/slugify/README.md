# README.md

    Unicode to Latin transliteration + slugify module

## install

```bash
yarn add @lazy-cjk/slugify
yarn-tool add @lazy-cjk/slugify
yt add @lazy-cjk/slugify
```

```typescript
import slugify, { transliterate } from '../index';

let word = `不支援 𠮷𠬠𡬶𫗭𣛙𢎐 ...這類字🍔\t🍕\t🍖\t🍗\t🍘\t🍙\t🍚\t🍛`;

console.log(transliterate(word))
console.log(slugify(word))

console.log(transliterate(word, {
	emoji: true,
}))
console.log(slugify(word, {
	emoji: true,
}))
```
