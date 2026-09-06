# cjk-conv-cli

    cli version for cjk-conv ( cn2tw_min, tw2cn_min, cn2tw, tw2cn )

https://www.npmjs.com/package/cjk-conv

## install

```bash
# 使用 yarn / Using yarn
yarn global add cjk-conv-cli

# 使用 yarn-tool / Using yarn-tool
yarn-tool global add cjk-conv-cli
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt global add cjk-conv-cli

# 使用 pnpm / Using pnpm
pnpm add -g cjk-conv-cli

# 使用 npm / Using npm
npm install -g cjk-conv-cli
```

## cli

allow use glob pattern

```
npx cjk-conv-cli xxxx.txt *.txt
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt --deep
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt --deep 2
```

```
npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt

Options:
  --help              Show help                                        [boolean]
  --version           Show version number                              [boolean]
  --tw2cn             use tw2cn mode                                   [boolean]
  --cwd               The current working directory in which to search. [string]
  --deep              The deep option can be set to true to traverse the entire
                      directory structure, or it can be set to a number to only
                      traverse that many levels deep.
  --file, -f                                               [array] [default: []]
  --createBackup, -b  create a .old backup                             [boolean]
  --createPatch, -p   create a diff .patch file                        [boolean]
  --notMin, -m                                                         [boolean]
  --unSafe, -s                                                         [boolean]
```
