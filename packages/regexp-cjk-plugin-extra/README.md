# README

    a regexp-cjk plugin demo for regexp-cjk ( 自動配對 五十音的清/濁音  ,  半形/全形 ,  deburr )

各參數效果請看這裡 [demo.test.ts](test/demo.test.ts)

## install

```bash
# 使用 yarn / Using yarn
yarn add regexp-cjk-plugin-extra cjk-conv

# 使用 yarn-tool / Using yarn-tool
yarn-tool add regexp-cjk-plugin-extra cjk-conv
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add regexp-cjk-plugin-extra cjk-conv

# 使用 pnpm / Using pnpm
pnpm add regexp-cjk-plugin-extra cjk-conv

# 使用 npm / Using npm
npm install regexp-cjk-plugin-extra cjk-conv
```

## usage

[index.d.ts](index.d.ts)

```ts
export interface IZhRegExpPluginOptionsCore {
    /**
     * 平假名片假名的 清濁音
     */
    autoVoice?: boolean;
    /**
     * 自動配對 半形 全形
     */
    autoFullHaif?: boolean;
    /**
     * 配對本地化字元
     */
    autoLocale?: boolean;
    /**
     * deburr('déjà vu') // => 'deja vu'
     *
     * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
     */
    autoDeburr?: boolean;
    /**
     * if return null | undefined then will skip current node
     */
    callback?(raw: string): string | string[];
}
export declare type IZhRegExpPluginOptions = IZhRegExpPluginOptionsCore & {
    /**
     * 緩存
     */
    cacheMap?: boolean | ICacheMap;
};
```

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
