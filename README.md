# README

    a regexp-cjk plugin demo for regexp-cjk ( 自動配對 五十音的清/濁音  ,  半形/全形 ,  deburr )

各參數效果請看這裡 [demo.test.ts](test/demo.test.ts)

## install

```
yarn add regexp-cjk-plugin-extra cjk-conv
```

## usage

```ts
import zhRegExp, { IOptions } from 'regexp-cjk';
import createZhRegExpPlugin, { IZhRegExpPluginOptions } from 'regexp-cjk-plugin-extra';

let options: IZhRegExpPluginOptions = {
    autoDeburr: true,
}

let re = new zhRegExp(/déjà vu/ui, {
    on: [
        createZhRegExpPlugin(options)
    ],
});

let word = `deja vu`;

console.log(re, word, re.test(word))
```
