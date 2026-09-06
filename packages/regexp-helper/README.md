# regexp-helper

> 正規表達式輔助工具 (RegExp helper utilities)

## install

```bash
# 使用 yarn / Using yarn
yarn add regexp-helper

# 使用 yarn-tool / Using yarn-tool
yarn-tool add regexp-helper
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add regexp-helper

# 使用 pnpm / Using pnpm
pnpm add regexp-helper

# 使用 npm / Using npm
npm install regexp-helper
```

## API

[index.d.ts](index.d.ts)

```ts
export * from 'regexp-helper-core';
import { getNativeFlags, stripNonNativeFlags, isNativeFlags, prototypeToFlags, prototypeToFlagsArray } from './lib';
import { parseRegularExpressionString } from './lib/parse';
export declare const nativeFlags: string;
export { getNativeFlags, stripNonNativeFlags, isNativeFlags };
export { prototypeToFlags, prototypeToFlagsArray };
export { parseRegularExpressionString };
declare const _default: typeof import(".");
export default _default;
```
